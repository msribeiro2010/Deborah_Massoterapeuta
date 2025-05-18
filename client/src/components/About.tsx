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
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
              Deborah Santalena
            </h2>
            <p className="text-gray-600 mb-4">
              With over 10 years of experience, I specialize in various massage therapy techniques, trained at the American Institute of Therapeutic Studies with international certifications.
            </p>
            <p className="text-gray-600 mb-4">
              My approach combines knowledge of anatomy, physiology, and integrative practices, aiming not just for symptom relief but complete balance between body and mind.
            </p>
            <p className="text-gray-600 mb-6">
              I believe in the power of therapeutic touch as a tool for transformation and wellness, and I work with each client in a personalized way, understanding their specific needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                asChild
                size="lg"
                className="bg-[#8BBF9F] hover:bg-[#8BBF9F]/90 text-white py-3 px-8 rounded-full font-medium transition flex items-center justify-center max-w-[200px]"
              >
                <a href="#contact">Book Now</a>
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
            <img
              src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="Alexandra Williams - Massage Therapist"
              className="rounded-xl shadow-lg w-full max-w-md object-cover h-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
