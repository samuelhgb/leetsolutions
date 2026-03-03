import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Sobre", href: "#about" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Diferenciais", href: "#why-us" },
  { label: "Contato", href: "#contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("#about");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    // Se não encontrar seções, não faz nada (evita "não funcionou" silencioso)
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pega a seção com maior "visibilidade"
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) {
          setActiveHash(`#${visible.target.id}`);
        }
      },
      {
        // Ajuste fino: considera "ativa" quando entra no meio da tela
        root: null,
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0.05, 0.1, 0.2, 0.35, 0.5],
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-display text-xl font-bold tracking-tight text-gray-900">
          Leet<span className="gradient-text">Solutions</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "gradient-text" : "text-gray-600 hover:text-gray-900"
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
                    isActive ? "gradient-text" : "text-gray-600 hover:text-gray-900"
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