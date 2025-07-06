// Dados estáticos para o site funcionar sem backend

export const staticImages = {
  hero: [
    {
      id: 1,
      url: `${import.meta.env.BASE_URL}images/hero-massage.jpg`,
      alt: "Massagem Relaxante",
      category: "hero"
    }
  ],
  about: [
    {
      id: 2,
      url: `${import.meta.env.BASE_URL}images/deborah-profile.jpg`,
      alt: "Deborah - Massoterapeuta",
      category: "about"
    }
  ],
  ambiente: [
    {
      id: 3,
      url: `${import.meta.env.BASE_URL}images/ambiente-1.png`,
      alt: "Ambiente de Massagem",
      category: "ambiente"
    },
    {
      id: 4,
      url: `${import.meta.env.BASE_URL}images/ambiente-3.jpg`,
      alt: "Sala de Massagem",
      category: "ambiente"
    }
  ],
  all: [
    {
      id: 6,
      url: `${import.meta.env.BASE_URL}images/massagem-1.jpg`,
      alt: "Massagem Terapêutica"
    },
    {
      id: 7,
      url: `${import.meta.env.BASE_URL}images/massagem-2.jpg`,
      alt: "Massagem Relaxante"
    },
     ]
};

export const staticServices = [
  {
    id: 1,
    name: "Massagem Relaxante",
    description: "Técnica suave que promove relaxamento profundo e alívio do estresse",
    duration: "60 minutos",
    price: "R$ 150,00"
  },
  {
    id: 2,
    name: "Massagem Terapêutica",
    description: "Focada em pontos específicos para alívio de dores e tensões musculares",
    duration: "60 minutos",
    price: "R$ 180,00"
  },
  {
    id: 3,
    name: "Massagem com Pedras Quentes",
    description: "Combina massagem tradicional com pedras aquecidas para relaxamento profundo",
    duration: "90 minutos",
    price: "R$ 220,00"
  },
  {
    id: 4,
    name: "Massagem Desportiva",
    description: "Ideal para atletas, ajuda na recuperação muscular e prevenção de lesões",
    duration: "60 minutos",
    price: "R$ 200,00"
  },
  {
    id: 5,
    name: "Drenagem Linfática",
    description: "Técnica que estimula o sistema linfático, reduzindo inchaços e toxinas",
    duration: "60 minutos",
    price: "R$ 160,00"
  }
];