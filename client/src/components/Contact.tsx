import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InstagramIcon, FacebookIcon, MessageCircleIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  service: z.string().min(1, { message: "Please select a service." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-[#F9F4EE] to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-[#8BBF9F] uppercase tracking-widest text-sm font-medium">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
              Book Your Session
            </h2>
            <p className="text-gray-600 mb-6">
              Contact us to schedule your session, ask questions, or request more information. We're available to provide the best massage therapy experience.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#EBFAEF] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-[#8BBF9F]">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#494644] mb-1">Address</h3>
                  <p className="text-gray-600">
                    123 Wellness Way, Serenity Hills
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#EBFAEF] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-[#8BBF9F]">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#494644] mb-1">Phone</h3>
                  <p className="text-gray-600">(212) 555-7890</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#EBFAEF] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-[#8BBF9F]">✉️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#494644] mb-1">Email</h3>
                  <p className="text-gray-600">contact@alexandrawilliams.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#EBFAEF] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-[#8BBF9F]">🕒</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#494644] mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday to Friday: 9am to 8pm
                    <br />
                    Saturday: 9am to 3pm
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#EBFAEF] hover:bg-[#8BBF9F] text-[#8BBF9F] hover:text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#EBFAEF] hover:bg-[#8BBF9F] text-[#8BBF9F] hover:text-white flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#EBFAEF] hover:bg-[#8BBF9F] text-[#8BBF9F] hover:text-white flex items-center justify-center transition"
                aria-label="WhatsApp"
              >
                <MessageCircleIcon size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-display font-semibold mb-6">Contact Form</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4A7C91]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Your email"
                            className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4A7C91]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(000) 000-0000"
                            className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4A7C91]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service of Interest</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4A7C91]">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="relaxing">Relaxing Massage</SelectItem>
                            <SelectItem value="therapeutic">Therapeutic Massage</SelectItem>
                            <SelectItem value="lymphatic">Lymphatic Drainage</SelectItem>
                            <SelectItem value="hotstone">Hot Stone Massage</SelectItem>
                            <SelectItem value="shiatsu">Shiatsu</SelectItem>
                            <SelectItem value="aromatherapy">Aromatherapy</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us more about your needs"
                            className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4A7C91] h-32 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#4A7C91] hover:bg-[#4A7C91]/90 text-white py-3 px-6 rounded-lg font-medium transition"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
