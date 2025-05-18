import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const serviceItems = [
  {
    id: 1,
    title: "Massagem Relaxante",
    description: "Movimentos suaves que aliviam a tensão e promovem o relaxamento profundo do corpo e da mente, ideal para redução do estresse.",
    icon: "spa",
    duration: "60 min",
    price: "R$120",
  },
  {
    id: 2,
    title: "Massagem Terapêutica",
    description: "Focada em questões específicas como dores musculares e tensão crônica, utilizando técnicas para restaurar a função e aliviar o desconforto.",
    icon: "heartbeat",
    duration: "75 min",
    price: "R$150",
  },
  {
    id: 3,
    title: "Drenagem Linfática",
    description: "Técnica suave que estimula o sistema linfático, reduz edemas e ajuda a eliminar toxinas, melhorando a circulação e o sistema imunológico.",
    icon: "hands",
    duration: "60 min",
    price: "R$140",
  },
  {
    id: 4,
    title: "Massagem com Pedras Quentes",
    description: "Utiliza pedras vulcânicas aquecidas que retêm calor, promovendo relaxamento muscular profundo, melhorando a circulação e o fluxo de energia.",
    icon: "fire",
    duration: "90 min",
    price: "R$180",
  },
  {
    id: 5,
    title: "Shiatsu",
    description: "Técnica japonesa que aplica pressão em pontos específicos do corpo, equilibrando o fluxo de energia, aliviando dores e promovendo bem-estar.",
    icon: "fan",
    duration: "60 min",
    price: "R$140",
  },
  {
    id: 6,
    title: "Aromaterapia",
    description: "Combina massagem com óleos essenciais cuidadosamente selecionados, potencializando os benefícios terapêuticos para o corpo e a mente.",
    icon: "leaf",
    duration: "60 min",
    price: "R$150",
  },
];

export const benefitItems = [
  {
    title: "Redução do Estresse",
    description: "Diminui os níveis de cortisol e promove relaxamento profundo, melhorando a saúde mental e emocional.",
    icon: "brain",
  },
  {
    title: "Melhora da Circulação",
    description: "Estimula o fluxo sanguíneo, levando mais oxigênio e nutrientes aos tecidos do corpo.",
    icon: "heart",
  },
  {
    title: "Alívio da Dor",
    description: "Reduz dores musculares, tensão crônica e melhora a mobilidade das articulações através de técnicas específicas.",
    icon: "wind",
  },
  {
    title: "Sono de Qualidade",
    description: "Promove relaxamento que facilita um sono mais profundo e restaurador, combatendo a insônia.",
    icon: "moon",
  },
  {
    title: "Fortalece a Imunidade",
    description: "Estimula o sistema linfático, ajudando na remoção de toxinas e fortalecendo o sistema imunológico.",
    icon: "shield-alt",
  },
  {
    title: "Equilíbrio Energético",
    description: "Restabelece o fluxo de energia por todo o corpo, promovendo sensação de vitalidade e bem-estar geral.",
    icon: "balance-scale",
  },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=844&q=80",
  "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
];

export const testimonials = [
  {
    id: 1,
    name: "Fernanda",
    duration: "Cliente há 2 anos",
    content: "As sessões com Deborah transformaram minha qualidade de vida. Sofri com dores crônicas nas costas por anos, e depois de algumas sessões de massagem terapêutica, senti uma melhora significativa. Agora vou mensalmente e recomendo para todos."
  },
  {
    id: 2,
    name: "Marcelo",
    duration: "Cliente há 1 ano",
    content: "Como executivo, o estresse é constante na minha rotina. A massagem relaxante com aromaterapia tem sido essencial para manter meu equilíbrio. O ambiente é impecável e Deborah é extremamente profissional e atenciosa."
  },
  {
    id: 3,
    name: "Gabi",
    duration: "Cliente há 8 meses",
    content: "Após minha gravidez, comecei sessões de drenagem linfática com Deborah e os resultados foram surpreendentes. Além de reduzir o inchaço, me senti muito mais energizada. O atendimento personalizado faz toda a diferença!"
  },
  {
    id: 4,
    name: "Clara",
    duration: "Cliente há 1,5 anos",
    content: "Como atleta, a massagem esportiva tem sido fundamental para minha recuperação e desempenho. Deborah entende perfeitamente as necessidades específicas do meu corpo e adapta o tratamento adequadamente."
  }
];
