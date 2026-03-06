import { motion } from "framer-motion";
import { Cpu, BarChart3, Zap, BrainCircuit } from "lucide-react";
import { Cog, Database, Bot } from "lucide-react";

const pillars = [
  { icon: Zap, title: "Automação Inteligente", desc: "Otimize fluxos de trabalho com ferramentas de automação inteligentes." },
  { icon: Cpu, title: "Otimização de Processos", desc: "Elimine gargalos e melhore o fluxo operacional." },
  { icon: BarChart3, title: "Inteligência de Dados", desc: "Transforme dados brutos em insights acionáveis para o negócio." },
  { icon: BrainCircuit, title: "Soluções com IA", desc: "Utilize IA para aprimorar a tomada de decisão e a eficiência." },
];

const services = [
  {
    icon: Cog,
    title: "Automação de Processos",
    description: "Automatizamos tarefas repetitivas e manuais, permitindo que sua equipe foque no que realmente importa.",
  },
  {
    icon: Database,
    title: "Inteligência de Dados",
    description: "Organizamos e transformamos dados empresariais em insights valiosos que apoiam melhores decisões.",
  },
  {
    icon: Bot,
    title: "Soluções com IA",
    description: "Implementamos sistemas inteligentes que interagem com clientes e colaboradores para otimizar operações diárias.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
            Sobre a Leet <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            A Leet Solutions ajuda empresas a modernizar suas operações através de automação e inteligência de dados. Conectamos tecnologia complexa a resultados reais de negócio.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Nosso propósito é ajudar empresas a se tornarem mais competitivas usando tecnologia para eliminar trabalho manual e melhorar a tomada de decisão.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {services.map((service, i) => (
                    <motion.div
                      key={service.title}
                      className="glass-card p-8 group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-6 transition-colors">
                        <service.icon size={28} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-display font-semibold text-foreground mb-3">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </motion.div>
                  ))}
          </div>
      </div>
    </section>
  );
};

export default AboutSection;
