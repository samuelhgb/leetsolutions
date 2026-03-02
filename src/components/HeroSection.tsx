import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Technology background"
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-background" />
      </div>

      <div className="section-container relative z-10 pt-20">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            
            <Sparkles size={14} className="text-accent" />
            <span className="text-xs font-medium text-primary-foreground/80">Automação de Processos & Inteligência de Dados</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Soluções Inteligentes para{" "}
            <span className="gradient-text text-primary-foreground">Negócios Mais Eficientes</span>
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mb-10 leading-relaxed">
            Ajudamos empresas a automatizar processos, organizar dados e melhorar a eficiência através de soluções tecnológicas inteligentes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-base px-8" asChild>
              <a href="#solutions">
                Ver Soluções
                <ArrowRight size={18} className="ml-2" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild>
              
              <a href="#contact" className="text-primary">Fale Conosco</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default HeroSection;