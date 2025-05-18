import { motion } from "framer-motion";
import { Bath, HeartPulse, HandHelping, Flame, Fan, Leaf } from "lucide-react";
import { serviceItems } from "@/lib/utils";
import { cn } from "@/lib/utils";

const iconComponents = {
  spa: Bath,
  heartbeat: HeartPulse,
  hands: HandHelping,
  fire: Flame,
  fan: Fan,
  leaf: Leaf,
};

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const IconComponent = iconComponents[service.icon as keyof typeof iconComponents];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-[#F9F4EE] p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition group"
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EBFAEF] flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#8BBF9F] transition">
        <IconComponent className="text-[#8BBF9F] group-hover:text-white text-xl sm:text-2xl transition" size={22} />
      </div>
      <h3 className="text-lg sm:text-xl font-display font-semibold mb-2 sm:mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-4 text-sm sm:text-base">{service.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs sm:text-sm text-[#4A7C91] font-medium">
          {service.duration} | {service.price}
        </span>
        <a
          href="#contact"
          className="text-[#8BBF9F] hover:text-[#4A7C91] transition font-medium flex items-center text-sm sm:text-base"
        >
          Agendar <ArrowRightIcon className="ml-1 h-3 w-3" />
        </a>
      </div>
    </motion.div>
  );
};

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={cn("h-5 w-5", className)}
  >
    <path
      fillRule="evenodd"
      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
      clipRule="evenodd"
    />
  </svg>
);

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-[#8BBF9F] uppercase tracking-widest text-sm font-medium"
          >
            Nossos Serviços
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4"
          >
            Tratamentos Terapêuticos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-gray-600"
          >
            Oferecemos diversas técnicas de massoterapia para atender às suas necessidades específicas, proporcionando alívio de tensão e promovendo bem-estar integral.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-gray-600 mt-2 font-medium text-[#4A7C91]"
          >
            Todas as modalidades podem ser associadas com aromaterapia e ventosaterapia.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto mt-6 p-3 rounded-lg bg-gradient-to-r from-[#8BBF9F]/10 to-[#4A7C91]/10 border border-[#8BBF9F]/30"
          >
            <p className="text-[#4A7C91] font-semibold">
              ✨ Atendimento exclusivo para o público feminino. Sua beleza e relaxamento em nossas mãos. ✨
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {serviceItems.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
