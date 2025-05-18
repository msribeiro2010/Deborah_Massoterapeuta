import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531700968341-bd114e5006ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[#4A7C91]/40 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            Restaure seu equilíbrio através do toque terapêutico
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Com técnicas especializadas de massoterapia, ajudo você a encontrar o relaxamento profundo e o bem-estar que seu corpo merece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#8BBF9F] hover:bg-[#8BBF9F]/90 text-white rounded-full font-medium transition flex items-center justify-center"
            >
              <a href="#contact">
                Agendar Sessão <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white hover:bg-white/90 text-[#4A7C91] rounded-full font-medium transition flex items-center justify-center"
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
