import { motion } from "framer-motion";
import { Settings2, Rocket, Monitor, TrendingUp, Shield } from "lucide-react";

const advantages = [
  { icon: Settings2, title: "Custom Solutions", desc: "Every solution is tailored to your specific business needs and workflows." },
  { icon: Rocket, title: "Fast Implementation", desc: "We deliver and deploy solutions quickly so you see results sooner." },
  { icon: Monitor, title: "Modern Technology", desc: "We use the latest tools and platforms to keep you ahead of the curve." },
  { icon: TrendingUp, title: "Scalable Systems", desc: "Our solutions grow with your business, handling increasing demand effortlessly." },
  { icon: Shield, title: "Automation Specialists", desc: "Deep expertise in process automation with a proven track record." },
];

const WhyChooseSection = () => {
  return (
    <section id="why-us" className="section-padding">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Why Choose <span className="gradient-text">Leet Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We combine deep technical expertise with a client-focused approach to deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {advantages.map((item, i) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-4 p-5 rounded-2xl hover:bg-secondary transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
