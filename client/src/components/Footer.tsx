import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#4A7C91] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Deborah Santalena</h3>
            <p className="text-white/80 mb-4">
              Especialista em massoterapia e práticas integrativas, dedicada a promover bem-estar e equilíbrio através do toque terapêutico.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white/80 hover:text-white transition"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Massagem Relaxante
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Massagem Terapêutica
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Drenagem Linfática
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Massagem com Pedras Quentes
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Shiatsu
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Aromaterapia
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-white/80 hover:text-white transition">
                  Início
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-white transition">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/80 hover:text-white transition">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/80 hover:text-white transition">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex">
                <span className="mt-1 mr-3">📍</span>
                <span>
                  Rua Salvador Lombardi Netto, 260 - Centro
                  <br />
                  Paulínia - SP, 13140-000
                </span>
              </li>
              <li className="flex">
                <span className="mt-1 mr-3">📞</span>
                <span>(19) 97133-3256</span>
              </li>
              <li className="flex">
                <span className="mt-1 mr-3">✉️</span>
                <span>deborah_santalena@hotmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
          <p>&copy; {new Date().getFullYear()} Deborah Santalena Massoterapia. Todos os direitos reservados Marcelo Ribeiro - msribeiro2010@icloud.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
