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
      className="bg-[#F9F4EE] p-8 rounded-xl shadow-sm hover:shadow-md transition group"
    >
      <div className="w-16 h-16 rounded-full bg-[#EBFAEF] flex items-center justify-center mb-6 group-hover:bg-[#8BBF9F] transition">
        <IconComponent className="text-[#8BBF9F] group-hover:text-white text-2xl transition" size={24} />
      </div>
      <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#4A7C91] font-medium">
          {service.duration} | {service.price}
        </span>
        <a
          href="#contact"
          className="text-[#8BBF9F] hover:text-[#4A7C91] transition font-medium flex items-center"
        >
          Book <ArrowRightIcon className="ml-1 h-3 w-3" />
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
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4"
          >
            Therapeutic Treatments
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-gray-600"
          >
            We offer various massage therapy techniques to meet your specific needs, providing tension relief and promoting holistic well-being.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
