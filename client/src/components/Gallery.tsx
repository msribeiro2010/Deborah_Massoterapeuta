import { motion } from "framer-motion";
import { galleryImages } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AmbienteImage {
  id: number;
  imageUrl: string;
  title: string | null;
  description: string | null;
}

const Gallery = () => {
  const [ambienteImages, setAmbienteImages] = useState<AmbienteImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAmbienteImages() {
      try {
        const response = await fetch('/api/images/ambiente');
        if (response.ok) {
          const images = await response.json();
          setAmbienteImages(images);
        }
      } catch (error) {
        console.error("Erro ao carregar imagens do ambiente:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadAmbienteImages();
  }, []);

  // Se não tiver imagens do banco de dados, usa as do fallback
  const imagesToDisplay = ambienteImages.length > 0
    ? ambienteImages.map(img => ({
        src: img.imageUrl.startsWith('http') ? img.imageUrl : `${window.location.origin}${img.imageUrl}`,
        alt: img.title || `Imagem do ambiente tranquilo`,
        description: img.description
      }))
    : galleryImages.map((image, index) => ({
        src: image,
        alt: `Imagem do ambiente tranquilo ${index + 1}`,
        description: null
      }));

  return (
    <section className="py-24 bg-gradient-to-b from-[#E2F4E8] to-[#EBFAEF] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-[#8BBF9F] uppercase tracking-widest text-sm font-medium"
          >
            Nosso Espaço
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4 bg-gradient-to-r from-[#4A7C91] to-[#8BBF9F] bg-clip-text text-transparent"
          >
            Ambiente Tranquilo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-gray-600"
          >
            Conheça nosso espaço projetado para proporcionar uma experiência completa de relaxamento e bem-estar.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-16 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-[#4A7C91]/10 backdrop-blur-[1px] z-10"></div>
          <div className="h-1 w-full bg-gradient-to-r from-[#4A7C91] to-[#8BBF9F] absolute top-0 left-0 z-20"></div>
          <div className="p-6 md:p-10 relative z-20">
            <p className="italic text-gray-600 mb-4 text-center">"Um espaço pensado em cada detalhe para proporcionar bem-estar e um atendimento exclusivo."</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {imagesToDisplay.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-xl border border-[#8BBF9F]/20 h-80"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 group-hover:opacity-0 transition-opacity duration-300"></div>
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-contain p-3"
              />
              {image.description && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm">{image.description}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
