import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeetLogo from "@/components/LeetLogo";

const navLinks = [
  { label: "Sobre", href: "#about" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Como Funciona", href: "#how-it-works" }, 
  { label: "Diferenciais", href: "#why-us" },
  { label: "Contato", href: "#contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("#about");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="section-container flex items-center justify-between h-16 md:h-20">

        <div className="flex items-center gap-2">
          <LeetLogo />
          <a href="#" className="font-display text-xl font-bold tracking-tight text-gray-900">
            Leet <span className="c">Solutions</span>
          </a>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeHash === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "gradient-text"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 pb-4 shadow-sm">
          <div className="section-container flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium py-2 transition-colors ${
                    isActive
                      ? "gradient-text"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <Button size="sm" className="w-fit" asChild>
              <a href="#contact" onClick={() => setIsOpen(false)}>
                Começar
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;