import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const About = () => {
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
              Com mais de 10 anos de experiência, sou especializada em várias técnicas de massoterapia, formada pelo Instituto Americano de Estudos Terapêuticos com certificações internacionais.
            </p>
            <p className="text-gray-600 mb-4">
              Minha abordagem combina conhecimentos de anatomia, fisiologia e práticas integrativas, visando não apenas o alívio dos sintomas, mas o equilíbrio completo entre corpo e mente.
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
            {/* Foto do profissional temporariamente removida */}
            <div className="rounded-xl shadow-lg w-full max-w-md bg-gradient-to-r from-[#8BBF9F]/30 to-[#4A7C91]/30 h-[500px] flex items-center justify-center">
              <p className="text-[#4A7C91] text-lg font-medium p-4 text-center">Espaço reservado para foto da profissional</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
