import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
  return (
    <div className="bg-[#F9F4EE] p-8 rounded-xl shadow-sm h-full flex flex-col">
      <div className="flex-grow">
        <div className="flex text-[#8BBF9F] mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="fill-current" size={16} />
          ))}
        </div>
        <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
      </div>
      <div className="flex items-center mt-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
        <div className="ml-4">
          <h4 className="font-semibold text-[#494644]">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.duration}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const maxSlides = testimonials.length - slidesToShow;
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-[#8BBF9F] uppercase tracking-widest text-sm font-medium"
          >
            Experiências
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4"
          >
            O Que Nossos Clientes Dizem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-gray-600"
          >
            Veja o que nossos clientes têm a dizer sobre suas experiências com nossas sessões de massoterapia.
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative overflow-hidden" ref={testimonialRef}>
          <motion.div
            className="flex transition-all duration-500 ease-in-out"
            animate={{
              x: `-${currentSlide * (100 / slidesToShow)}%`,
            }}
            transition={{ duration: 0.5 }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={cn(
                  "px-4",
                  slidesToShow === 3
                    ? "w-1/3"
                    : slidesToShow === 2
                    ? "w-1/2"
                    : "w-full"
                )}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </motion.div>

          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-[#4A7C91] p-3 rounded-full shadow-md z-10 hidden md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            onClick={nextSlide}
            disabled={currentSlide >= maxSlides}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-[#4A7C91] p-3 rounded-full shadow-md z-10 hidden md:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center mt-8 md:hidden">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="outline"
            size="icon"
            className="bg-white hover:bg-gray-100 text-[#4A7C91] mx-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            onClick={nextSlide}
            disabled={currentSlide >= maxSlides}
            variant="outline"
            size="icon"
            className="bg-white hover:bg-gray-100 text-[#4A7C91] mx-2"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#8BBF9F] hover:bg-[#8BBF9F]/90 text-white rounded-full font-medium transition flex items-center justify-center"
          >
            <a href="#contact">
              Book Your Experience <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
