import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { DollarSign } from "lucide-react";

interface Client {
  id: string;
  name: string;
  credits_used: number;
  estimated_cost: number;
  token_usage: number;
}

const chartConfig: ChartConfig = {
  cost: { label: "Custo (R$)", color: "hsl(var(--accent))" },
};

export default function Costs() {
  const [clients, setClients] = useState<Client[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("clients").select("id, name, credits_used, estimated_cost, token_usage").order("estimated_cost", { ascending: false });
      const list = (data as Client[]) || [];
      setClients(list);
      setTotalCost(list.reduce((sum, c) => sum + Number(c.estimated_cost || 0), 0));
    };
    fetch();
  }, []);

  const chartData = clients.map((c) => ({ name: c.name, cost: Number(c.estimated_cost || 0) }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground">Custos</h2>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Custo Total Estimado do Mês</p>
            <p className="text-3xl font-bold">R$ {totalCost.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Custo por Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="cost" fill="var(--color-cost)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-12">Nenhum dado disponível</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detalhamento</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Créditos</TableHead>
                  <TableHead>Tokens</TableHead>
                  <TableHead>Custo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{c.credits_used}</TableCell>
                    <TableCell>{c.token_usage}</TableCell>
                    <TableCell>R$ {Number(c.estimated_cost || 0).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
