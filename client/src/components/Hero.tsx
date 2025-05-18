import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] md:h-screen flex items-center overflow-hidden py-20 md:py-0"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
          backgroundPosition: "center 30%"
        }}
      >
        <div className="absolute inset-0 bg-[#4A7C91]/50 backdrop-blur-[2px]"></div>
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
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-white/95 max-w-md md:max-w-xl text-shadow-sm">
            Com técnicas especializadas de massoterapia, ajudo você a encontrar o relaxamento profundo e o bem-estar que seu corpo merece.
          </p>
          <div className="flex flex-col xs:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#8BBF9F] hover:bg-[#8BBF9F]/90 text-white rounded-full font-medium transition flex items-center justify-center shadow-md"
            >
              <a href="#contact">
                Agendar Sessão <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white hover:bg-white/90 text-[#4A7C91] rounded-full font-medium transition flex items-center justify-center shadow-sm backdrop-blur-sm"
            >
              <a href="#services">Explorar Serviços</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
