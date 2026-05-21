export interface WebsiteTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  imageUrl: string;
  techStack: string[];
  isCustom?: boolean;
}

export const defaultSites: WebsiteTemplate[] = [
  {
    id: "1",
    title: "Sabor & Arte - Restaurante Gourmet",
    category: "Restaurantes & Cafés",
    description: "Website premium para restaurantes com cardápio online interativo, reservas de mesa e design sofisticado.",
    url: "https://tailwindcss.com",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    techStack: ["React", "Tailwind CSS", "Framer Motion"]
  },
  {
    id: "2",
    title: "MedClinic - Clínica e Saúde",
    category: "Saúde & Bem-estar",
    description: "Plataforma profissional para médicos, clínicas ou terapeutas com agendamento de consultas online e perfis de especialistas.",
    url: "https://react.dev",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80",
    techStack: ["Next.js", "Tailwind CSS", "Sanity CMS"]
  },
  {
    id: "3",
    title: "Lar Ideal - Imobiliária de Luxo",
    category: "Imobiliária",
    description: "Portal imobiliário completo com filtros avançados de busca por localização, preço e tipologia, com integração de fotos e mapas.",
    url: "https://vite.dev",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
    techStack: ["React", "Tailwind CSS", "Supabase"]
  },
  {
    id: "4",
    title: "TrendStore - E-commerce de Moda",
    category: "E-commerce",
    description: "Loja virtual moderna e responsiva com carrinho de compras, checkout seguro, gestão de stock e integração com meios de pagamento.",
    url: "https://tailwindcss.com/docs",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80",
    techStack: ["Next.js", "Tailwind CSS", "Stripe"]
  },
  {
    id: "5",
    title: "Silva & Associados - Advocacia",
    category: "Serviços Profissionais",
    description: "Website institucional de alta credibilidade para advogados ou consultores, focado em autoridade profissional e captação de clientes.",
    url: "https://github.com",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
    techStack: ["Astro", "Tailwind CSS", "Markdown"]
  },
  {
    id: "6",
    title: "FitZone - Health Club & Ginásio",
    category: "Desporto & Fitness",
    description: "Website enérgico para ginásios ou personal trainers com horário de aulas, tabelas de preços e área de inscrição para novos membros.",
    url: "https://play.tailwindcss.com",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
    techStack: ["React", "Tailwind CSS", "Framer Motion"]
  },
  {
    id: "7",
    title: "SaaS TaskFlow - Landing Page",
    category: "Tecnologia & SaaS",
    description: "Landing page de altíssima conversão para produtos de software ou aplicações móveis, com secção de preços e FAQ interactiva.",
    url: "https://react.dev/reference/react",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    techStack: ["React", "Tailwind CSS", "Vite"]
  },
  {
    id: "8",
    title: "Sparkle Dental - Clínica Dentária",
    category: "Saúde & Bem-estar",
    description: "Website moderno para consultórios dentários com apresentação de tratamentos, marcações online e galeria antes/depois.",
    url: "https://tailwindcss.com",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80",
    techStack: ["React", "Tailwind CSS", "Node.js"]
  },
  {
    id: "9",
    title: "Verde Jardim - Florista Online",
    category: "E-commerce",
    description: "Loja online minimalista para entrega de plantas e flores ao domicílio com checkout expresso e mensagens de oferta.",
    url: "https://react.dev",
    imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&auto=format&fit=crop&q=80",
    techStack: ["Next.js", "Tailwind CSS", "Shopify"]
  },
  {
    id: "10",
    title: "Studio Zoom - Fotografia & Vídeo",
    category: "Portfólio / Pessoal",
    description: "Portfólio interativo de ecrã inteiro para fotógrafos e videomakers com galerias dinâmicas e formulário de orçamento.",
    url: "https://vite.dev",
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=80",
    techStack: ["Astro", "Tailwind CSS", "Framer Motion"]
  },
  {
    id: "11",
    title: "AutoDrive - Aluguer de Carros",
    category: "Serviços Profissionais",
    description: "Portal de reserva de viaturas com catálogo de veículos por categorias, preços por dia e termos de seguro.",
    url: "https://tailwindcss.com/docs",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
    techStack: ["React", "Tailwind CSS", "Supabase"]
  },
  {
    id: "12",
    title: "Confeitaria Doce Arte - Pastelaria",
    category: "Restaurantes & Cafés",
    description: "Website com catálogo de bolos por encomenda, galeria de casamentos e formulário de orçamento personalizado.",
    url: "https://github.com",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",
    techStack: ["Gatsby", "Tailwind CSS", "Contentful"]
  },
  {
    id: "13",
    title: "Alpha Gym - Box de Crossfit",
    category: "Desporto & Fitness",
    description: "Landing page desportiva com horários de treinos, tabela de mensalidades e ficha de contacto rápido.",
    url: "https://play.tailwindcss.com",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    techStack: ["React", "Tailwind CSS"]
  },
  {
    id: "14",
    title: "ConstruNova - Engenharia & Obras",
    category: "Institucional",
    description: "Website corporativo para construtoras com portfólio de projetos terminados, certificações e contactos comerciais.",
    url: "https://react.dev/reference/react",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=80",
    techStack: ["Next.js", "Tailwind CSS", "Sanity"]
  },
  {
    id: "15",
    title: "Paws & Claws - Clínica Veterinária",
    category: "Saúde & Bem-estar",
    description: "Plataforma de saúde animal com marcação de consultas, urgências 24h e dicas de cuidados para cães e gatos.",
    url: "https://tailwindcss.com",
    imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=80",
    techStack: ["React", "Tailwind CSS", "Firebase"]
  },
  {
    id: "16",
    title: "Zen Spa - Bem-Estar & Massagens",
    category: "Saúde & Bem-estar",
    description: "Website de relaxamento e spa com menu de terapias, marcação online de massagens e venda de vales de oferta.",
    url: "https://react.dev",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
    techStack: ["React", "Tailwind CSS", "Framer Motion"]
  },
  {
    id: "17",
    title: "EducaTech - Cursos & Formação",
    category: "Tecnologia & SaaS",
    description: "Plataforma de e-learning moderna com catálogo de cursos online, perfis de formadores e sistema de subscrição.",
    url: "https://vite.dev",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    techStack: ["Next.js", "Tailwind CSS", "Mux Video API"]
  },
  {
    id: "18",
    title: "Hotel Vista Mar - Alojamento",
    category: "Institucional",
    description: "Website de reserva direta de quartos com galeria de fotos do hotel, atrativos locais e sistema de reservas online.",
    url: "https://tailwindcss.com/docs",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    techStack: ["Astro", "Tailwind CSS", "AlpineJS"]
  },
  {
    id: "19",
    title: "EcoCycle - Loja de Bicicletas",
    category: "E-commerce",
    description: "Catálogo de comércio eletrónico de bicicletas de estrada e montanha, peças de reposição e marcação de revisões.",
    url: "https://github.com",
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80",
    techStack: ["React", "Tailwind CSS", "Stripe API"]
  },
  {
    id: "20",
    title: "BarberClub - Barbearia Vintage",
    category: "Restaurantes & Cafés",
    description: "Website moderno para barbearia com portfólio de cortes, agendamento interativo por profissional e preços de serviços.",
    url: "https://play.tailwindcss.com",
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80",
    techStack: ["React", "Tailwind CSS", "Framer Motion"]
  }
];
