import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle, Bell, UserPlus, RefreshCw } from "lucide-react";

const projects = [
  {
    icon: CalendarCheck,
    title: "Smart Scheduling Assistant",
    description: "Automated appointment scheduling through WhatsApp integrated with Google Calendar.",
  },
  {
    icon: MessageCircle,
    title: "Smart Customer Assistant",
    description: "Automated customer service that answers frequently asked questions and assists clients 24/7.",
  },
  {
    icon: Bell,
    title: "Smart Reminder System",
    description: "Automatic reminders sent to customers to reduce missed appointments.",
  },
  {
    icon: UserPlus,
    title: "Smart Lead Capture",
    description: "Automatic collection and organization of customer leads from forms and messages.",
  },
  {
    icon: RefreshCw,
    title: "Smart Follow-Up System",
    description: "Automatic messages sent to inactive customers to increase retention.",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding bg-secondary">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Solutions we've built to help businesses operate smarter and grow faster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="glass-card p-6 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-4 transition-colors">
                <project.icon size={24} className="text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
