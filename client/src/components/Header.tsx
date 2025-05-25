import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "../assets/new-logo.png";

const navItems = [
  { name: "Início", href: "#home" },
  { name: "Serviços", href: "#services" },
  { name: "Sobre", href: "#about" },
  { name: "Depoimentos", href: "#testimonials" },
  { name: "Contato", href: "#contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (href: string) => {
    console.log('Clicou em:', href); // Debug
    closeMobileMenu();
    
    // Aguardar um pouco para o menu fechar antes de fazer scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      console.log('Elemento encontrado:', element); // Debug
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 100;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <header
      className={cn(
        "fixed w-full bg-white/95 shadow-sm backdrop-blur-sm z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-3 md:py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="transform group-hover:scale-105 transition-transform duration-300">
            <img 
              src={logoImage} 
              alt="Deborah Santalena Logo" 
              className="h-20 sm:h-24 md:h-28" 
            />
          </div>
          <div>
            <span className="block text-xl sm:text-2xl md:text-3xl font-display font-bold text-[#4A7C91] leading-tight">
              Deborah Santalena
            </span>
            <span className="block text-xs sm:text-sm font-sans text-[#8BBF9F] tracking-wider font-light">
              Massoterapia & Bem-estar
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-[#494644] hover:text-[#4A7C91] font-medium transition"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
          type="button"
        >
          {mobileMenuOpen ? <X className="h-6 w-6 text-[#494644]" /> : <Menu className="h-6 w-6 text-[#494644]" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden relative z-40"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSection(item.href);
                  }}
                  className="py-4 px-4 text-[#494644] hover:text-[#4A7C91] hover:bg-gray-50 font-medium transition text-left rounded-md touch-manipulation active:bg-gray-100 min-h-[48px] w-full"
                  type="button"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
