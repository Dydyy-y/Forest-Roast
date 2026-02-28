import { Product } from '../types/product.types';

export const mockCoffeeProducts: Product[] = [
  {
    id: 1,
    name: "Indonésie Sumatra Mandheling",
    price: 13.80,
    description: "Un café corsé et terreux de l'île de Sumatra. Traité selon la méthode traditionnelle Giling Basah (semi-humide), il développe un corps sirupeux exceptionnel avec des notes de cèdre, chocolat amer et épices. Idéal pour les amateurs de cafés puissants.",
    stock: 28,
    category: "Asie",
    origin: {
      country: "Indonésie",
      region: "Sumatra — Aceh",
      farm: "Koperasi Baitul Qiradh Baburrayyan",
      farmerId: "ID-SUM-007",
      coordinates: { latitude: 4.6951, longitude: 96.7494 }
    },
    roastLevel: "dark",
    tastingNotes: ["Cèdre", "Chocolat amer", "Épices"],
    processingMethod: "Giling Basah (semi-humide)",
    altitude: 1500,
    harvestDate: "2026-01-05",
    certifications: ["Fair Trade"],
    intensity: 9,
    images: [{ id: 1, link: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800", alt: "Café Indonésie Sumatra Mandheling" }]
  },
  {
    id: 2,
    name: "Brésil Cerrado",
    price: 10.90,
    description: "Le géant brésilien dans toute sa générosité. Ce café du Cerrado Mineiro offre un profil gourmand : noisette grillée, chocolat au lait et notes de pain d'épices. Corps moyen, parfait pour l'espresso du matin.",
    stock: 67,
    category: "Amérique du Sud",
    origin: {
      country: "Brésil",
      region: "Cerrado Mineiro",
      farm: "Fazenda Sertão",
      farmerId: "BR-CER-031",
      coordinates: { latitude: -17.8419, longitude: -46.9292 }
    },
    roastLevel: "medium-dark",
    tastingNotes: ["Noisette grillée", "Chocolat au lait", "Pain d'épices"],
    processingMethod: "Naturel",
    altitude: 1100,
    harvestDate: "2026-01-20",
    certifications: ["Rainforest Alliance"],
    intensity: 7,
    images: [{ id: 2, link: "https://images.unsplash.com/photo-1501481663691-6e8c7eacc43d?w=800", alt: "Café Brésil Cerrado" }]
  },
  {
    id: 3,
    name: "Colombie Huila",
    price: 11.90,
    description: "La douceur colombienne dans toute sa splendeur. Ce café de la région de Huila offre un profil équilibré et accessible. Notes de pomme verte, sucre roux et amande douce. Une torréfaction medium révèle toute sa rondeur.",
    stock: 52,
    category: "Amérique du Sud",
    origin: {
      country: "Colombie",
      region: "Huila",
      farm: "Finca La Esperanza",
      farmerId: "CO-HUI-023",
      coordinates: { latitude: 2.5355, longitude: -75.5277 }
    },
    roastLevel: "medium",
    tastingNotes: ["Pomme verte", "Sucre roux", "Amande"],
    processingMethod: "Lavé",
    altitude: 1650,
    harvestDate: "2025-11-30",
    certifications: ["Bio", "Fair Trade", "Rainforest Alliance"],
    intensity: 6,
    images: [{ id: 3, link: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800", alt: "Café Colombie Huila" }]
  },
  {
    id: 4,
    name: "Honduras Santa Bárbara",
    price: 12.40,
    description: "Découvrez ce café du massif de Santa Bárbara, l'un des meilleurs d'Amérique centrale. Cultivé en altitude par de petits producteurs, il révèle des notes de pêche blanche, caramel beurré et cacao. Une douceur fruitée remarquable.",
    stock: 34,
    category: "Amérique Centrale",
    origin: {
      country: "Honduras",
      region: "Santa Bárbara",
      farm: "Cooperativa Cafetalera Honducafé",
      farmerId: "HN-SB-019",
      coordinates: { latitude: 14.9074, longitude: -88.2362 }
    },
    roastLevel: "medium",
    tastingNotes: ["Pêche blanche", "Caramel beurré", "Cacao"],
    processingMethod: "Lavé",
    altitude: 1700,
    harvestDate: "2026-01-25",
    certifications: ["Bio", "Fair Trade"],
    intensity: 6,
    images: [{ id: 4, link: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800", alt: "Café Honduras Santa Bárbara" }]
  },
  {
    id: 5,
    name: "Éthiopie Yirgacheffe",
    price: 14.50,
    description: "Le berceau du café. Cultivé dans la légendaire région de Yirgacheffe, ce café naturel exprime toute la complexité aromatique de l'Éthiopie. Notes florales de jasmin, agrumes de bergamote et finale sucrée de fruits rouges. Un voyage sensoriel unique.",
    stock: 32,
    category: "Afrique",
    origin: {
      country: "Éthiopie",
      region: "Yirgacheffe",
      farm: "Cooperative Chelchele",
      farmerId: "ET-YIR-012",
      coordinates: { latitude: 6.1628, longitude: 38.2067 }
    },
    roastLevel: "light",
    tastingNotes: ["Jasmin", "Bergamote", "Fruits rouges"],
    processingMethod: "Naturel",
    altitude: 2100,
    harvestDate: "2025-12-20",
    certifications: ["Bio", "Fair Trade"],
    intensity: 5,
    images: [{ id: 5, link: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800", alt: "Café Éthiopie Yirgacheffe" }]
  },
  {
    id: 6,
    name: "Indonésie Sulawesi Toraja",
    price: 14.20,
    description: "L'autre trésor indonésien. Venant des hauts plateaux de Toraja à Sulawesi, ce café offre un profil très différent de Sumatra : plus doux, avec un corps velouté et des notes de tabac blond, vanille et réglisse. Un café de méditation.",
    stock: 22,
    category: "Asie",
    origin: {
      country: "Indonésie",
      region: "Sulawesi — Toraja",
      farm: "Lembang Cooperative",
      farmerId: "ID-SUL-014",
      coordinates: { latitude: -2.9725, longitude: 120.0089 }
    },
    roastLevel: "medium-dark",
    tastingNotes: ["Tabac blond", "Vanille", "Réglisse"],
    processingMethod: "Giling Basah (semi-humide)",
    altitude: 1800,
    harvestDate: "2026-01-12",
    certifications: ["Rainforest Alliance"],
    intensity: 8,
    images: [{ id: 6, link: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800", alt: "Café Indonésie Sulawesi Toraja" }]
  },
  {
    id: 7,
    name: "Kenya AA Nyeri",
    price: 15.20,
    description: "L'acidité vibrante du Kenya. Grade AA (les plus gros grains), ce café de Nyeri explose en bouche avec des notes de cassis, pamplemousse rose et tomate confite. Une torréfaction claire préserve son caractère fruité exceptionnel. Pour les palais aventureux.",
    stock: 18,
    category: "Afrique",
    origin: {
      country: "Kenya",
      region: "Nyeri",
      farm: "Kagumo Farmers Cooperative",
      farmerId: "KE-NYE-045",
      coordinates: { latitude: -0.4167, longitude: 36.9500 }
    },
    roastLevel: "light",
    tastingNotes: ["Cassis", "Pamplemousse rose", "Tomate confite"],
    processingMethod: "Lavé double fermentation",
    altitude: 1900,
    harvestDate: "2026-02-01",
    certifications: ["Fair Trade"],
    intensity: 8,
    images: [{ id: 7, link: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800", alt: "Café Kenya AA Nyeri" }]
  },
  {
    id: 8,
    name: "Mexique Chiapas",
    price: 11.50,
    description: "Un café solaire de l'état de Chiapas, au cœur des forêts tropicales mexicaines. Cultivé à l'ombre des arbres fruitiers par des communautés indigènes, il dévoile des notes douces de mandarine, miel sauvage et chocolat blanc. Un café bio et équitable exemplaire.",
    stock: 44,
    category: "Amérique Centrale",
    origin: {
      country: "Mexique",
      region: "Chiapas — Sierra Madre",
      farm: "Cooperativa Indígena ISMAM",
      farmerId: "MX-CHI-008",
      coordinates: { latitude: 15.4915, longitude: -92.5770 }
    },
    roastLevel: "medium",
    tastingNotes: ["Mandarine", "Miel sauvage", "Chocolat blanc"],
    processingMethod: "Lavé",
    altitude: 1400,
    harvestDate: "2025-12-10",
    certifications: ["Bio", "Fair Trade"],
    intensity: 5,
    images: [{ id: 8, link: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800", alt: "Café Mexique Chiapas" }]
  }
];

/**
 * Helper function : Filtrer les cafés par origine
 */
export const filterByOrigin = (country: string): Product[] => {
  return mockCoffeeProducts.filter(
    product => product.origin?.country.toLowerCase() === country.toLowerCase()
  );
};

/**
 * Helper function : Filtrer les cafés par niveau de torréfaction
 */
export const filterByRoastLevel = (roastLevel: string): Product[] => {
  return mockCoffeeProducts.filter(
    product => product.roastLevel === roastLevel
  );
};

/**
 * Helper function : Rechercher dans les noms et descriptions
 */
export const searchCoffee = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return mockCoffeeProducts.filter(
    product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tastingNotes?.some(note => note.toLowerCase().includes(lowerQuery))
  );
};
