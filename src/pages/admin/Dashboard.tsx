import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, DollarSign, Activity } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";

interface Stats {
  totalClients: number;
  creditsConsumed: number;
  estimatedCost: number;
  automationsExecuted: number;
}

interface ClientCredits {
  name: string;
  credits: number;
  cost: number;
}

interface TimelineData {
  date: string;
  executions: number;
}

const chartConfig: ChartConfig = {
  credits: { label: "Créditos", color: "hsl(var(--primary))" },
  cost: { label: "Custo", color: "hsl(var(--accent))" },
  executions: { label: "Execuções", color: "hsl(var(--primary))" },
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ totalClients: 0, creditsConsumed: 0, estimatedCost: 0, automationsExecuted: 0 });
  const [clientCredits, setClientCredits] = useState<ClientCredits[]>([]);
  const [timeline, setTimeline] = useState<TimelineData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: clients } = await supabase.from("clients").select("*");
      const { data: logs } = await supabase.from("usage_logs").select("*");

      if (clients) {
        const totalCredits = clients.reduce((sum, c) => sum + (c.credits_used || 0), 0);
        const totalCost = clients.reduce((sum, c) => sum + Number(c.estimated_cost || 0), 0);

        setStats({
          totalClients: clients.length,
          creditsConsumed: totalCredits,
          estimatedCost: totalCost,
          automationsExecuted: logs?.length || 0,
        });

        setClientCredits(
          clients.map((c) => ({
            name: c.name,
            credits: c.credits_used || 0,
            cost: Number(c.estimated_cost || 0),
          }))
        );
      }

      if (logs) {
        const grouped: Record<string, number> = {};
        logs.forEach((log) => {
          const date = new Date(log.executed_at).toLocaleDateString("pt-BR");
          grouped[date] = (grouped[date] || 0) + 1;
        });
        setTimeline(
          Object.entries(grouped)
            .map(([date, executions]) => ({ date, executions }))
            .slice(-14)
        );
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { title: "Total de Clientes", value: stats.totalClients, icon: Users, color: "text-primary" },
    { title: "Créditos Consumidos", value: stats.creditsConsumed, icon: Zap, color: "text-accent" },
    { title: "Custo Estimado de IA", value: `R$ ${stats.estimatedCost.toFixed(2)}`, icon: DollarSign, color: "text-green-500" },
    { title: "Automações Executadas", value: stats.automationsExecuted, icon: Activity, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground">Painel</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                </div>
                <card.icon className={`h-8 w-8 ${card.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Consumo de Créditos por Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            {clientCredits.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={clientCredits}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="credits" fill="var(--color-credits)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-12">Nenhum dado disponível</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Automações ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            {timeline.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={timeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="executions" stroke="var(--color-executions)" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-12">Nenhum dado disponível</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
