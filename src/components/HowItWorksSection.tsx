import { motion } from "framer-motion";
import { Search, PenTool, Cog, Rocket, HeadphonesIcon } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Diagnóstico do Processo",
    description:
      "Entendemos como sua empresa opera atualmente, identificando tarefas manuais, gargalos e oportunidades de automação.",
  },
  {
    icon: PenTool,
    title: "Desenho da Solução",
    description:
      "Definimos a arquitetura da automação ou sistema inteligente mais adequado para o seu negócio.",
  },
  {
    icon: Cog,
    title: "Desenvolvimento da Automação",
    description:
      "Construímos a solução utilizando integrações, inteligência artificial e automação de processos.",
  },
  {
    icon: Rocket,
    title: "Implantação e Testes",
    description:
      "A solução é implantada, testada e ajustada para garantir estabilidade e eficiência.",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte e Evolução",
    description:
      "Acompanhamos o funcionamento da automação e evoluímos a solução conforme o crescimento do negócio.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Como funciona trabalhar com a{" "}
            <span className="gradient-text">Leet Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            Transformamos desafios operacionais em soluções inteligentes através
            de um processo simples e estruturado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="glass-card p-8 text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mx-auto mb-6 transition-colors">
                <step.icon size={28} className="text-primary" />
              </div>

              <span className="text-xs font-semibold text-primary/60 uppercase tracking-wider mb-2 block font-sans">
                Etapa {index + 1}
              </span>

              <h3 className="text-xl font-sans font-semibold text-foreground mb-3 tracking-normal">
                {step.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed font-sans">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;