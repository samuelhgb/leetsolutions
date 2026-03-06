import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const { api_key, automation_name, credits_consumed, estimated_cost, token_usage, metadata } = body;

    if (!api_key || !automation_name) {
      return new Response(
        JSON.stringify({ error: "api_key e automation_name são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate API key and get client
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("id, credits_used, monthly_credit_limit, estimated_cost, token_usage")
      .eq("api_key", api_key)
      .eq("is_active", true)
      .single();

    if (clientError || !client) {
      return new Response(
        JSON.stringify({ error: "API Key inválida ou cliente inativo" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const creditsToConsume = credits_consumed || 1;
    const costToAdd = estimated_cost || 0;
    const tokensToAdd = token_usage || 0;

    // Check credit limit
    if (client.credits_used + creditsToConsume > client.monthly_credit_limit) {
      return new Response(
        JSON.stringify({ error: "Limite de créditos excedido" }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert usage log
    const { error: logError } = await supabase.from("usage_logs").insert({
      client_id: client.id,
      automation_name,
      credits_consumed: creditsToConsume,
      estimated_cost: costToAdd,
      token_usage: tokensToAdd,
      status: "success",
      metadata: metadata || null,
    });

    if (logError) throw logError;

    // Update client credits
    const { error: updateError } = await supabase
      .from("clients")
      .update({
        credits_used: client.credits_used + creditsToConsume,
        estimated_cost: Number(client.estimated_cost) + costToAdd,
        token_usage: (client.token_usage || 0) + tokensToAdd,
        updated_at: new Date().toISOString(),
      })
      .eq("id", client.id);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({
        success: true,
        credits_remaining: client.monthly_credit_limit - client.credits_used - creditsToConsume,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
