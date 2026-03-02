import { motion } from "framer-motion";
import { Cog, Database, Bot } from "lucide-react";

const services = [
  {
    icon: Cog,
    title: "Process Automation",
    description: "We automate repetitive and manual tasks, allowing your team to focus on what really matters.",
  },
  {
    icon: Database,
    title: "Data Intelligence",
    description: "We organize and transform business data into valuable insights that support better decision making.",
  },
  {
    icon: Bot,
    title: "AI-Powered Solutions",
    description: "We implement intelligent systems that interact with customers and employees to streamline daily operations.",
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
            Our <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We deliver tailored technology solutions that drive real results for your business.
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
