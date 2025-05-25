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
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada para deborah_santalena@hotmail.com. Entraremos em contato em breve.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro. Por favor, tente novamente.",
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-[#8BBF9F] uppercase tracking-widest text-sm font-medium">
              Contato
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
              Agende Sua Sessão
            </h2>
            <p className="text-gray-600 mb-6">
              Entre em contato para agendar sua sessão, fazer perguntas ou solicitar mais informações. Estamos disponíveis para proporcionar a melhor experiência de massoterapia.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#EBFAEF] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-[#8BBF9F]">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#494644] mb-1">Endereço</h3>
                  <p className="text-gray-600">
                    Rua Salvador Lombardi Netto, 260 - Centro
                    <br />
                    Paulínia - SP, 13140-000
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#EBFAEF] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-[#8BBF9F]">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#494644] mb-1">Telefone</h3>
                  <a 
                    href="https://wa.me/5519971333256" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#8BBF9F] transition-colors flex items-center"
                  >
                    (19) 97133-3256
                    <span className="ml-2 text-[#25D366] text-sm">WhatsApp</span>
                  </a>
                  <p className="text-sm text-[#4A7C91] font-medium mt-1">
                    Atendimento somente mulheres
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#EBFAEF] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-[#8BBF9F]">✉️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#494644] mb-1">Email</h3>
                  <p className="text-gray-600">deborah_santalena@hotmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#EBFAEF] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-[#8BBF9F]">🕒</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#494644] mb-1">Horário de Funcionamento</h3>
                  <p className="text-gray-600">
                    Segunda a Sexta: 9h às 20h
                    <br />
                    Sábado: 9h às 15h
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://instagram.com/deborah.santalena"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#EBFAEF] hover:bg-[#8BBF9F] text-[#8BBF9F] hover:text-white flex items-center justify-center transition"
                aria-label="Instagram @deborah.santalena"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://wa.me/5519971333256"
                target="_blank"
                rel="noopener noreferrer"
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
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-display font-semibold mb-6">Formulário de Contato</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Seu nome completo"
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
                            placeholder="Seu email"
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
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(00) 00000-0000"
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
                        <FormLabel>Serviço de Interesse</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4A7C91]">
                              <SelectValue placeholder="Selecione um serviço" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="relaxing">Massagem Relaxante</SelectItem>
                            <SelectItem value="modeling">Massagem Modeladora</SelectItem>
                            <SelectItem value="lymphatic">Drenagem Linfática</SelectItem>
                            <SelectItem value="hotstone">Massagem com Pedras Quentes</SelectItem>
                            <SelectItem value="shiatsu">Shiatsu</SelectItem>
                            <SelectItem value="myofascial">Liberação Miofascial</SelectItem>
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
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Conte-nos mais sobre suas necessidades"
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
                    {mutation.isPending ? "Enviando..." : "Enviar Mensagem"}
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
