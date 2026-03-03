import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Mensagem enviada!", description: "Retornaremos em breve." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
  <section
    id="contact"
    className="relative min-h-screen flex items-center overflow-hidden"
  >
    {/* 🎥 VIDEO BACKGROUND */}
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

    {/* 🌫 OVERLAY COM BLUR */}
    <div className="absolute inset-0 backdrop-blur-sm bg-black/60"></div>

    {/* 📦 CONTEÚDO */}
    <div className="relative z-10 section-container text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        
        {/* LADO ESQUERDO */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">Fale Conosco</span>
          </h2>

          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Conte-nos sobre o seu negócio e criaremos a solução de automação ideal para você.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Mail size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-white/70">Email</p>
                <p className="font-medium">contact@leetsolutions.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <MessageSquare size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-white/70">WhatsApp</p>
                <p className="font-medium">+1 (555) 000-0000</p>
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
            <label className="text-sm font-medium mb-1.5 block">
              Nome
            </label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Seu nome"
              required
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Email
            </label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
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
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Conte-nos sobre o seu projeto..."
              rows={4}
              required
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-white text-primary hover:bg-transparent hover:text-white border border-white transition-all duration-300"
          >
            Enviar Mensagem
            <Send size={16} className="ml-2" />
          </Button>
        </motion.form>
      </div>
    </div>
  </section>
);

export default ContactSection;
