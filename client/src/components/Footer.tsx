import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#4A7C91] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Alexandra Williams</h3>
            <p className="text-white/80 mb-4">
              Specialist in massage therapy and integrative practices, dedicated to promoting well-being and balance through therapeutic touch.
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
            <h3 className="text-xl font-display font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Relaxing Massage
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Therapeutic Massage
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Lymphatic Drainage
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Hot Stone Massage
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Shiatsu
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Aromatherapy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-white/80 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/80 hover:text-white transition">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/80 hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex">
                <span className="mt-1 mr-3">📍</span>
                <span>
                  123 Wellness Way, Serenity Hills
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex">
                <span className="mt-1 mr-3">📞</span>
                <span>(212) 555-7890</span>
              </li>
              <li className="flex">
                <span className="mt-1 mr-3">✉️</span>
                <span>contact@alexandrawilliams.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
          <p>&copy; {new Date().getFullYear()} Alexandra Williams Massage Therapy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
