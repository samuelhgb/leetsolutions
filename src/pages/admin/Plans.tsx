import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar } from "lucide-react";

interface Client {
  id: string;
  name: string;
  company: string | null;
  plan: string;
  monthly_credit_limit: number;
  credits_used: number;
  last_credit_reset: string;
  is_active: boolean;
}

export default function Plans() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("clients").select("*").order("name");
      setClients((data as Client[]) || []);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground">Planos e Créditos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => {
          const remaining = client.monthly_credit_limit - client.credits_used;
          const percent = client.monthly_credit_limit > 0
            ? (client.credits_used / client.monthly_credit_limit) * 100
            : 0;

          return (
            <Card key={client.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{client.name}</CardTitle>
                  <Badge variant={client.is_active ? "default" : "destructive"}>
                    {client.plan}
                  </Badge>
                </div>
                {client.company && (
                  <p className="text-xs text-muted-foreground">{client.company}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Créditos utilizados</span>
                    <span className="font-medium">
                      {client.credits_used} / {client.monthly_credit_limit}
                    </span>
                  </div>
                  <Progress value={percent} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {remaining} créditos restantes ({percent.toFixed(0)}% consumido)
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>
                    Último reset: {new Date(client.last_credit_reset).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {clients.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-12">
            Nenhum cliente cadastrado
          </div>
        )}
      </div>
    </div>
  );
}
