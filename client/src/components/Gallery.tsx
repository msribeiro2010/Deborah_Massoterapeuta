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
    <section className="py-24 bg-[#EBFAEF] overflow-hidden">
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
            className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imagesToDisplay.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-80 flex items-center justify-center bg-transparent rounded-xl overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="max-h-full max-w-full object-contain"
              />
              {image.description && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
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
