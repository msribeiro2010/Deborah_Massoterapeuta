import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const serviceItems = [
  {
    id: 1,
    title: "Relaxing Massage",
    description: "Gentle movements that relieve tension and promote deep relaxation of body and mind, ideal for stress reduction.",
    icon: "spa",
    duration: "60 min",
    price: "$120",
  },
  {
    id: 2,
    title: "Therapeutic Massage",
    description: "Focused on specific issues such as muscle pain and chronic tension, using techniques to restore function and relieve discomfort.",
    icon: "heartbeat",
    duration: "75 min",
    price: "$150",
  },
  {
    id: 3,
    title: "Lymphatic Drainage",
    description: "Gentle technique that stimulates the lymphatic system, reduces edema and helps eliminate toxins, improving circulation and the immune system.",
    icon: "hands",
    duration: "60 min",
    price: "$140",
  },
  {
    id: 4,
    title: "Hot Stone Massage",
    description: "Uses heated volcanic stones that retain heat, promoting deep muscle relaxation, improving circulation and energy flow.",
    icon: "fire",
    duration: "90 min",
    price: "$180",
  },
  {
    id: 5,
    title: "Shiatsu",
    description: "Japanese technique that applies pressure to specific points on the body, balancing energy flow, relieving pain and promoting well-being.",
    icon: "fan",
    duration: "60 min",
    price: "$140",
  },
  {
    id: 6,
    title: "Aromatherapy",
    description: "Combines massage with carefully selected essential oils, enhancing therapeutic benefits for body and mind.",
    icon: "leaf",
    duration: "60 min",
    price: "$150",
  },
];

export const benefitItems = [
  {
    title: "Stress Reduction",
    description: "Lowers cortisol levels and promotes deep relaxation, improving mental and emotional health.",
    icon: "brain",
  },
  {
    title: "Improved Circulation",
    description: "Stimulates blood flow, carrying more oxygen and nutrients to body tissues.",
    icon: "heart",
  },
  {
    title: "Pain Relief",
    description: "Reduces muscle pain, chronic tension, and improves joint mobility through specific techniques.",
    icon: "wind",
  },
  {
    title: "Better Sleep",
    description: "Promotes relaxation that facilitates deeper, more restorative sleep, combating insomnia.",
    icon: "moon",
  },
  {
    title: "Strengthens Immunity",
    description: "Stimulates the lymphatic system, helping to remove toxins and strengthening the immune system.",
    icon: "shield-alt",
  },
  {
    title: "Energy Balance",
    description: "Reestablishes the flow of energy throughout the body, promoting a sense of vitality and overall well-being.",
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
    name: "Maria Johnson",
    duration: "Client for 2 years",
    content: "Alexandra's sessions transformed my quality of life. I suffered from chronic back pain for years, and after a few therapeutic massage sessions, I felt a significant improvement. Now I go monthly and recommend it to everyone."
  },
  {
    id: 2,
    name: "Richard Miller",
    duration: "Client for 1 year",
    content: "As an executive, stress is constant in my routine. The relaxing massage with aromatherapy has been essential to maintain my balance. The environment is impeccable and Alexandra is extremely professional and attentive."
  },
  {
    id: 3,
    name: "Sophia Garcia",
    duration: "Client for 8 months",
    content: "After my pregnancy, I started lymphatic drainage sessions with Alexandra and the results were surprising. Besides reducing swelling, I felt much more energetic. The personalized care makes all the difference!"
  },
  {
    id: 4,
    name: "Paul Anderson",
    duration: "Client for 1.5 years",
    content: "As an athlete, sports massage has been fundamental to my recovery and performance. Alexandra perfectly understands the specific needs of my body and adapts the treatment accordingly."
  }
];
