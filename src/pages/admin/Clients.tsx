import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Plus, RefreshCw, Copy, Eye, EyeOff } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Client {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  api_key: string;
  plan: string;
  monthly_credit_limit: number;
  credits_used: number;
  estimated_cost: number;
  last_credit_reset: string;
  is_active: boolean;
  created_at: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({ name: "", email: "", company: "", plan: "basic", monthly_credit_limit: 500 });

  const fetchClients = async () => {
    setLoading(true);
    const { data } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    setClients((data as Client[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchClients(); }, []);

  const handleCreate = async () => {
    const { error } = await supabase.from("clients").insert({
      name: form.name,
      email: form.email || null,
      company: form.company || null,
      plan: form.plan,
      monthly_credit_limit: form.monthly_credit_limit,
      api_key: `sk_leet_${crypto.randomUUID().replace(/-/g, "").slice(0, 14)}`,
    });

    if (error) {
      toast({ title: "Erro ao criar cliente", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Cliente criado com sucesso!" });
    setDialogOpen(false);
    setForm({ name: "", email: "", company: "", plan: "basic", monthly_credit_limit: 500 });
    fetchClients();
  };

  const handleRegenKey = async (clientId: string) => {
    const newKey = `sk_leet_${crypto.randomUUID().replace(/-/g, "").slice(0, 14)}`;
    const { error } = await supabase.from("clients").update({ api_key: newKey }).eq("id", clientId);
    if (error) {
      toast({ title: "Erro ao regenerar API Key", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "API Key regenerada com sucesso!" });
    fetchClients();
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: "API Key copiada!" });
  };

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const maskKey = (key: string) => key.slice(0, 8) + "••••••••••";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-foreground">Clientes</h2>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Novo Cliente
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Empresa</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Créditos</TableHead>
                <TableHead className="hidden lg:table-cell">API Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => {
                const creditPercent = client.monthly_credit_limit > 0
                  ? (client.credits_used / client.monthly_credit_limit) * 100
                  : 0;

                return (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{client.company || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{client.plan}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 min-w-[120px]">
                        <p className="text-xs text-muted-foreground">
                          {client.credits_used} / {client.monthly_credit_limit}
                        </p>
                        <Progress value={creditPercent} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {visibleKeys.has(client.id) ? client.api_key : maskKey(client.api_key)}
                        </code>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleKeyVisibility(client.id)}>
                          {visibleKeys.has(client.id) ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyKey(client.api_key)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={client.is_active ? "default" : "destructive"}>
                        {client.is_active ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleRegenKey(client.id)}>
                        <RefreshCw className="h-3 w-3 mr-1" /> Regenerar Key
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {clients.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    Nenhum cliente cadastrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome *</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome do cliente" />
            </div>
            <div>
              <label className="text-sm font-medium">E-mail</label>
              <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@empresa.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Empresa</label>
              <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Nome da empresa" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Plano</label>
                <Input value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} placeholder="basic" />
              </div>
              <div>
                <label className="text-sm font-medium">Limite de Créditos</label>
                <Input type="number" value={form.monthly_credit_limit} onChange={(e) => setForm({ ...form, monthly_credit_limit: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreate} disabled={!form.name}>Criar Cliente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
