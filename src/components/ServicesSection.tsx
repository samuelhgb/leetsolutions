import { motion } from "framer-motion";
import { Cog, Database, Bot } from "lucide-react";

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

const ServicesSection = () => {
  return (
    <section id="solutions" className="section-padding">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Nossas <span className="gradient-text">Soluções</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Entregamos soluções tecnológicas sob medida que geram resultados reais para o seu negócio.
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

export default ServicesSection;
