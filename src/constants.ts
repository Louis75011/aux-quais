import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'pdj-1',
    name: 'Lasagnes Maison à la Bolognaise',
    description: 'Pâtes fraîches, viande de boeuf locale, sauce tomate maison et béchamel onctueuse. Servi avec une petite salade.',
    price: 14.50,
    category: 'plat-du-jour',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's-1',
    name: 'La Focaccia Mortadelle',
    description: 'Focaccia maison, mortadelle artisanale, mozzarella di bufala, roquette et filet d\'huile d\'olive.',
    price: 9.50,
    category: 'salé',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's-2',
    name: 'La Burrata Crémeuse',
    description: 'Burrata entière, tomates cerises rôties, pesto maison et pignons de pin.',
    price: 11.90,
    category: 'salé',
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's-3',
    name: 'Le Sandwich Poulet Fermier',
    description: 'Pain de campagne bio, poulet rôti, mayonnaise maison aux herbes, crudités de saison.',
    price: 8.50,
    category: 'salé',
    image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'd-1',
    name: 'Crumble Pomme Cannelle',
    description: 'Pommes fondantes, sablage croustillant au beurre salé et pointe de cannelle.',
    price: 6.50,
    category: 'sucré',
    image: 'https://images.unsplash.com/photo-1562007908-17c67e870c88?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'd-2',
    name: 'Fondant au Chocolat Noir',
    description: 'Coeur coulant, chocolat 70% cacao, servi avec une crème anglaise maison.',
    price: 7.00,
    category: 'sucré',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'd-3',
    name: 'Tarte Abricots du Marché',
    description: 'Pâte sablée maison, abricots frais de saison, amandes effilées.',
    price: 4.00,
    category: 'sucré',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b-1',
    name: 'Limonade Artisanale',
    description: 'Citron frais, sucre de canne bio, eau pétillante.',
    price: 4.50,
    category: 'boissons',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b-2',
    name: 'Café de Spécialité',
    description: 'Torréfié localement, notes chocolatées et fruitées.',
    price: 2.50,
    category: 'boissons',
    image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=800'
  }
];

export const LOCATIONS = [
  {
    id: 'etang',
    name: 'Gare de L\'Étang-la-Ville',
    address: 'Rue de la Station, 78620 L\'Étang-la-Ville',
    phone: '01 34 51 94 99',
    status: 'Ouvert'
  },
  {
    id: 'noisy',
    name: 'Gare de Noisy-le-Roi',
    address: 'Gare de Noisy-le-Roi, 78590 Noisy-le-Roi',
    phone: 'Prochainement',
    status: 'Bientôt disponible'
  }
];

export const BUSINESS_INFO = {
  name: 'Aux Quais',
  tagline: 'Bio, local, 100% fait maison — en gare',
  email: 'contact@auxquais.fr',
  hours: {
    monday: 'Fermé',
    tuesday: '07:30–18:30',
    wednesday: '07:30–18:30',
    thursday: '07:30–18:30',
    friday: '07:30–18:30',
    saturday: '09:30–18:30',
    sunday: 'Fermé'
  },
  socials: {
    facebook: 'https://www.facebook.com/auxquais',
    instagram: 'https://www.instagram.com/okauxquais'
  }
};
