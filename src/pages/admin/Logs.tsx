import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface Log {
  id: string;
  client_id: string;
  automation_name: string;
  credits_consumed: number;
  estimated_cost: number;
  status: string;
  executed_at: string;
  client_name?: string;
}

interface Client {
  id: string;
  name: string;
}

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [filterClient, setFilterClient] = useState("");
  const [filterAutomation, setFilterAutomation] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data: clientsData } = await supabase.from("clients").select("id, name");
      const clientList = (clientsData as Client[]) || [];
      setClients(clientList);

      const { data: logsData } = await supabase
        .from("usage_logs")
        .select("*")
        .order("executed_at", { ascending: false })
        .limit(500);

      const enriched = (logsData || []).map((log) => ({
        ...log,
        estimated_cost: Number(log.estimated_cost),
        client_name: clientList.find((c) => c.id === log.client_id)?.name || "Desconhecido",
      }));

      setLogs(enriched as Log[]);
    };
    fetch();
  }, []);

  const filtered = logs.filter((log) => {
    if (filterClient && !log.client_name?.toLowerCase().includes(filterClient.toLowerCase())) return false;
    if (filterAutomation && !log.automation_name.toLowerCase().includes(filterAutomation.toLowerCase())) return false;
    if (filterDateFrom && new Date(log.executed_at) < new Date(filterDateFrom)) return false;
    if (filterDateTo && new Date(log.executed_at) > new Date(filterDateTo + "T23:59:59")) return false;
    return true;
  });

  const statusColor = (status: string) => {
    switch (status) {
      case "success": return "default";
      case "error": return "destructive";
      default: return "secondary" as const;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground">Logs de Uso</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Cliente</label>
              <Input
                placeholder="Filtrar por cliente..."
                value={filterClient}
                onChange={(e) => setFilterClient(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Automação</label>
              <Input
                placeholder="Filtrar por automação..."
                value={filterAutomation}
                onChange={(e) => setFilterAutomation(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Data inicial</label>
              <Input type="date" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Data final</label>
              <Input type="date" value={filterDateTo} onChange={(e) => setFilterDateTo(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Automação</TableHead>
                <TableHead>Créditos</TableHead>
                <TableHead>Custo Estimado</TableHead>
                <TableHead>Data e Hora</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.client_name}</TableCell>
                  <TableCell>{log.automation_name}</TableCell>
                  <TableCell>{log.credits_consumed}</TableCell>
                  <TableCell>R$ {log.estimated_cost.toFixed(4)}</TableCell>
                  <TableCell>
                    {new Date(log.executed_at).toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColor(log.status) as any}>{log.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Nenhum log encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
