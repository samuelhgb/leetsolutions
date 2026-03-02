import { motion } from "framer-motion";
import { Cpu, BarChart3, Zap, BrainCircuit } from "lucide-react";

const pillars = [
  { icon: Zap, title: "Intelligent Automation", desc: "Streamline workflows with smart automation tools." },
  { icon: Cpu, title: "Process Optimization", desc: "Eliminate bottlenecks and improve operational flow." },
  { icon: BarChart3, title: "Data Intelligence", desc: "Transform raw data into actionable business insights." },
  { icon: BrainCircuit, title: "AI-Powered Solutions", desc: "Leverage AI to enhance decision-making and efficiency." },
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
            About <span className="gradient-text">Leet Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Leet Solutions helps businesses modernize their operations through automation and data intelligence. We bridge the gap between complex technology and real business results.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our purpose is to help businesses become more competitive by using technology to eliminate manual work and improve decision making.
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
