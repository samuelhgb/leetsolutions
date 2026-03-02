import { motion } from "framer-motion";
import { Cpu, BarChart3, Zap, BrainCircuit } from "lucide-react";

const pillars = [
  { icon: Zap, title: "Automação Inteligente", desc: "Otimize fluxos de trabalho com ferramentas de automação inteligentes." },
  { icon: Cpu, title: "Otimização de Processos", desc: "Elimine gargalos e melhore o fluxo operacional." },
  { icon: BarChart3, title: "Inteligência de Dados", desc: "Transforme dados brutos em insights acionáveis para o negócio." },
  { icon: BrainCircuit, title: "Soluções com IA", desc: "Utilize IA para aprimorar a tomada de decisão e a eficiência." },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary">
      <div className="section-container">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
            Sobre a <span className="gradient-text">Leet Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            A Leet Solutions ajuda empresas a modernizar suas operações através de automação e inteligência de dados. Conectamos tecnologia complexa a resultados reais de negócio.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Nosso propósito é ajudar empresas a se tornarem mais competitivas usando tecnologia para eliminar trabalho manual e melhorar a tomada de decisão.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              className="glass-card p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
