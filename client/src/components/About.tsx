import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface AboutImage {
  id: number;
  imageUrl: string;
  title: string | null;
  description: string | null;
}

const About = () => {
  const [aboutImage, setAboutImage] = useState<AboutImage | null>(null);

  // Buscar imagens da seção "about"
  const { data: aboutImages } = useQuery({
    queryKey: ["/api/images/about"],
    queryFn: async () => {
      const response = await fetch("/api/images/about");
      if (!response.ok) throw new Error("Falha ao carregar imagem");
      return response.json();
    },
  });

  useEffect(() => {
    async function loadAboutImage() {
      if (aboutImages && aboutImages.length > 0) {
        setAboutImage(aboutImages[0]); // Usar a primeira imagem disponível
      }
    }
    loadAboutImage();
  }, [aboutImages]);
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-white to-[#EBFAEF]"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <span className="text-[#8BBF9F] uppercase tracking-widest text-sm font-medium">
              Sobre Mim
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
              Deborah Santalena
            </h2>
            <p className="text-gray-600 mb-4">
              Com mais de 10 anos de experiência, sou especializada em várias técnicas de massoterapia, com certificações internacionais.
            </p>
            <p className="text-gray-600 mb-4">
              Minha abordagem combina práticas integrativas, visando não apenas o alívio dos sintomas, mas o equilíbrio completo entre corpo e mente.
            </p>
            <p className="text-gray-600 mb-6">
              Acredito no poder do toque terapêutico como ferramenta de transformação e bem-estar, e trabalho com cada cliente de forma personalizada, compreendendo suas necessidades específicas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                asChild
                size="lg"
                className="bg-[#8BBF9F] hover:bg-[#8BBF9F]/90 text-white py-3 px-8 rounded-full font-medium transition flex items-center justify-center max-w-[200px]"
              >
                <a href="#contact">Agende Agora</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="rounded-xl shadow-lg w-full max-w-md overflow-hidden">
              {aboutImage ? (
                <img
                  src={aboutImage.imageUrl}
                  alt={aboutImage.title || "Deborah Santalena"}
                  className="w-full h-[500px] object-cover"
                />
              ) : (
                <div className="bg-gradient-to-r from-[#8BBF9F]/30 to-[#4A7C91]/30 h-[500px] flex items-center justify-center">
                  <p className="text-[#4A7C91] text-lg font-medium p-4 text-center">Espaço reservado para foto da profissional</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
