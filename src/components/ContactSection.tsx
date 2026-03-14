import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Função para aplicar máscara no telefone
  const formatPhone = (value: string) => {
    let v = value.replace(/\D/g, "");

    // formato internacional +55 11 99999-9999
    if (v.startsWith("55") && v.length > 11) {
      return v.replace(/^(\d{2})(\d{2})(\d{5})(\d{4}).*/, "+$1 $2 $3-$4");
    }

    // celular brasileiro
    if (v.length > 10) {
      return v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    }

    // telefone fixo
    if (v.length > 6) {
      return v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    }

    if (v.length > 2) {
      return v.replace(/^(\d{2})(\d*)/, "($1) $2");
    }

    return v;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);

    setForm({
      ...form,
      phone: formatted,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?\d{1,3}\s?)?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

    if (!form.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor informe seu nome.",
        variant: "destructive",
      });
      return;
    }

    if (!emailRegex.test(form.email)) {
      toast({
        title: "Email inválido",
        description: "Digite um email válido. Ex: email@empresa.com",
        variant: "destructive",
      });
      return;
    }

    if (!phoneRegex.test(form.phone)) {
      toast({
        title: "Telefone inválido",
        description:
          "Use um formato válido. Ex: (11) 99999-9999",
        variant: "destructive",
      });
      return;
    }

    if (form.message.trim().length < 5) {
      toast({
        title: "Mensagem muito curta",
        description: "Descreva um pouco mais sobre seu projeto.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

      try {
      await fetch(
        "https://n8n.leetsolutions.com.br/webhook/contato-site",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
            origem: "site-leetsolutions",
            data: new Date().toISOString(),
          }),
        }
      );

      toast({
        title: "Mensagem enviada!",
        description: "Retornaremos em breve.",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-start lg:items-center overflow-hidden py-24"
    >
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://video.wixstatic.com/video/d0220c_5968dd83ff6c4b3b8284e745050c0efc/1080p/mp4/file.mp4"
          type="video/mp4"
        />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      {/* CONTEÚDO */}
      <div className="relative z-10 section-container text-white">
        {/* INTRO TEXT */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">Vamos conversar sobre seu projeto</span>
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Explique brevemente o que você precisa automatizar ou melhorar em sua operação.
            Nossa equipe analisará seu caso e entrará em contato para entender como podemos ajudar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

          {/* LADO ESQUERDO */}
          <motion.div className="p-8 space-y-5 bg-white/10 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-display font-bold mb-4">
              <span className="gradient-text">Fale Conosco</span>
            </h3>

            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Conte-nos sobre o seu negócio e criaremos a solução de automação
              ideal para você.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <p className="font-medium">contato@leetsolutions.com.br</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <MessageSquare size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/70">WhatsApp</p>
                  <p className="font-medium">(17) 99749-9037</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FORMULÁRIO */}
          <motion.form
            onSubmit={handleSubmit}
            className="p-8 space-y-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <label className="text-sm font-medium mb-1.5 block">Nome</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Seu nome"
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@empresa.com"
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Telefone</label>
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="(11) 99999-9999"
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Mensagem
              </label>
              <Textarea
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                placeholder="Conte-nos sobre o seu projeto..."
                rows={4}
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-white text-primary hover:bg-transparent hover:text-white border border-white transition-all duration-300"
            >
              {loading ? "Enviando..." : "Enviar Mensagem"}
              <Send size={16} className="ml-2" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;