import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroImage {
  id: number;
  imageUrl: string;
  title: string | null;
  description: string | null;
}

const Hero = () => {
  const [heroImage, setHeroImage] = useState<HeroImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHeroImage() {
      try {
        const response = await fetch('/api/images/hero');
        if (response.ok) {
          const images = await response.json();
          if (images && images.length > 0) {
            setHeroImage(images[0]);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar imagem do hero:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadHeroImage();
  }, []);

  // Certifica que a URL tem o formato correto para exibição
  const backgroundImageUrl = heroImage?.imageUrl 
    ? (heroImage.imageUrl.startsWith('http') ? heroImage.imageUrl : `${window.location.origin}${heroImage.imageUrl}`)
    : "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

  return (
    <section
      id="home"
      className="relative min-h-[85vh] md:h-screen flex items-center overflow-hidden py-20 md:py-0"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
          backgroundPosition: "center 30%",
          backgroundSize: "cover",
          imageRendering: "auto",
          filter: "brightness(1.05) contrast(1.05) saturate(1.05)"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#4A7C91]/70 via-[#4A7C91]/50 to-[#4A7C91]/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-4 relative z-10 text-white pt-12 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl md:max-w-2xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4 md:mb-6 text-shadow">
            Restaure seu equilíbrio através do toque terapêutico
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-4 text-white/95 max-w-md md:max-w-xl text-shadow-sm">
            Com técnicas especializadas de massoterapia, ajudo você a encontrar o relaxamento profundo e o bem-estar que seu corpo merece.
          </p>
          <div className="inline-block bg-gradient-to-r from-[#8BBF9F]/70 to-[#4A7C91]/70 backdrop-blur-sm py-3 px-5 rounded-lg mb-6 md:mb-8 border border-white/20 shadow-lg transform hover:shadow-xl transition-all duration-300">
            <p className="text-white font-medium text-md">
              ✨ <span className="italic">Dedicado exclusivamente às mulheres</span> — Um espaço onde beleza e serenidade florescem através do toque terapêutico ✨
            </p>
          </div>
          <div className="flex flex-col xs:flex-row gap-4 mt-2">
            <Button
              asChild
              size="lg"
              className="relative overflow-hidden group bg-gradient-to-r from-[#4A7C91] to-[#8BBF9F] text-white rounded-full font-semibold transition-all hover:shadow-lg hover:scale-105 flex items-center justify-center"
            >
              <a href="#contact" className="px-6 py-3 flex items-center z-10">
                <span className="relative z-10">Agendar Sessão</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#8BBF9F] to-[#4A7C91] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-white/30 hover:border-white/50 rounded-full font-semibold transition-all hover:shadow-lg hover:scale-105 flex items-center justify-center"
            >
              <a href="#services" className="px-6 py-3 relative overflow-hidden group">
                <span className="relative z-10">Explorar Serviços</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
