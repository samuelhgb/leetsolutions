import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--hero-gradient)] opacity-95" />

      <div className="section-container relative z-10 text-center">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-6">
            Pronto para automatizar processos no seu negócio?
          </h2>

          <p className="text-lg text-primary-foreground/80 leading-relaxed mb-10">
            Descubra como soluções inteligentes podem reduzir tarefas manuais,
            organizar seus dados e aumentar a eficiência da sua operação.
          </p>

          <Button
            size="lg"
            className="text-base px-8 bg-white text-primary border border-white hover:bg-transparent hover:text-white transition-all duration-300"
            asChild
          >
            <a href="#contact">
              Solicitar diagnóstico gratuito
              <ArrowRight size={18} className="ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
