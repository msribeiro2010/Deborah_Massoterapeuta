import { motion } from "framer-motion";
import { Brain, Heart, Wind, Moon, Shield, Scale } from "lucide-react";
import { benefitItems } from "@/lib/utils";

const iconComponents = {
  brain: Brain,
  heart: Heart,
  wind: Wind,
  moon: Moon,
  "shield-alt": Shield,
  "balance-scale": Scale,
};

const BenefitCard = ({ benefit, index }: { benefit: any; index: number }) => {
  const IconComponent = iconComponents[benefit.icon as keyof typeof iconComponents];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-[#4A7C91]/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-[#4A7C91]/50 transition"
    >
      <div className="w-14 h-14 rounded-full bg-[#8BBF9F]/20 flex items-center justify-center mb-6">
        <IconComponent className="text-[#EBFAEF] text-xl" size={20} />
      </div>
      <h3 className="text-xl font-display font-semibold mb-3">{benefit.title}</h3>
      <p className="text-white/80">{benefit.description}</p>
    </motion.div>
  );
};

const Benefits = () => {
  return (
    <section className="py-24 bg-[#4A7C91] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-[#EBFAEF] uppercase tracking-widest text-sm font-medium"
          >
            Por Que Nos Escolher
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4"
          >
            Benefícios da Massoterapia
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-white/80"
          >
            A massoterapia vai além do relaxamento, trazendo diversos benefícios para sua saúde física e mental, melhorando sua qualidade de vida.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitItems.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
