import { Mail, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-3">
              Leet<span className="text-accent">Solutions</span>
            </h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Intelligent solutions for business automation and data efficiency.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Quick Links</h4>
            <div className="space-y-2">
              {["About", "Solutions", "Portfolio", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Mail size={14} />
                <span>contact@leetsolutions.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <MessageSquare size={14} />
                <span>+1 (555) 000-0000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Leet Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
