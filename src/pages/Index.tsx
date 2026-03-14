import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CtaSection from "@/components/CtaSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
