/**
 * Données Mock - Produits Café Premium
 * 
 * Dataset de démonstration pour Elegant Heritage Coffee
 * À utiliser pour tester les composants avant connexion API
 */

import { Product } from '../types/product.types';

export const mockCoffeeProducts: Product[] = [
  {
    id: 1,
    name: "Pérou Cajamarca",
    price: 12.90,
    description: "Un café d'exception cultivé à 1800m d'altitude dans la région de Cajamarca. Ce café lavé révèle des notes prononcées de chocolat noir et caramel, avec une finale douce de noisette. Cultivé par Don José sur la Finca El Paraíso, chaque grain peut être tracé jusqu'à sa parcelle d'origine.",
    stock: 45,
    category: "Amérique du Sud",
    origin: {
      country: "Pérou",
      region: "Cajamarca",
      farm: "Finca El Paraíso",
      farmerId: "PE-CAJ-001",
      coordinates: {
        latitude: -7.1615,
        longitude: -78.5126
      }
    },
    roastLevel: "medium",
    tastingNotes: ["Chocolat noir", "Caramel", "Noisette"],
    processingMethod: "Lavé",
    altitude: 1800,
    harvestDate: "2026-01-15",
    certifications: ["Bio", "Fair Trade", "Rainforest Alliance"],
    intensity: 7,
    images: [
      {
        id: 1,
        link: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
        alt: "Café Pérou Cajamarca - Grains torréfiés"
      },
      {
        id: 2,
        link: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800",
        alt: "Plantation de café à Cajamarca, Pérou"
      }
    ]
  },

  {
    id: 2,
    name: "Ethiopie Yirgacheffe",
    price: 14.50,
    description: "Le berceau du café. Cultivé dans la légendaire région de Yirgacheffe, ce café naturel exprime toute la complexité aromatique de l'Ethiopie. Notes florales de jasmin, agrumes vifs de bergamote et finale sucrée de fruits rouges. Un voyage sensoriel unique.",
    stock: 32,
    category: "Afrique",
    origin: {
      country: "Ethiopie",
      region: "Yirgacheffe",
      farm: "Cooperative Chelchele",
      farmerId: "ET-YIR-012",
      coordinates: {
        latitude: 6.1628,
        longitude: 38.2067
      }
    },
    roastLevel: "light",
    tastingNotes: ["Jasmin", "Bergamote", "Fruits rouges"],
    processingMethod: "Naturel",
    altitude: 2100,
    harvestDate: "2025-12-20",
    certifications: ["Bio", "Fair Trade"],
    intensity: 5,
    images: [
      {
        id: 3,
        link: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
        alt: "Café Ethiopie Yirgacheffe"
      }
    ]
  },

  {
    id: 3,
    name: "Indonésie Sumatra Mandheling",
    price: 13.80,
    description: "Un café corsé et terreux de l'île de Sumatra. Traité selon la méthode traditionnelle Giling Basah (semi-humide), il développe un corps sirupeux exceptionnel avec des notes de cèdre, chocolat amer et épices. Idéal pour les amateurs de cafés puissants.",
    stock: 28,
    category: "Asie",
    origin: {
      country: "Indonésie",
      region: "Sumatra - Aceh",
      farm: "Koperasi Baitul Qiradh Baburrayyan",
      farmerId: "ID-SUM-007",
      coordinates: {
        latitude: 4.6951,
        longitude: 96.7494
      }
    },
    roastLevel: "dark",
    tastingNotes: ["Cèdre", "Chocolat amer", "Épices"],
    processingMethod: "Giling Basah (semi-humide)",
    altitude: 1500,
    harvestDate: "2026-01-05",
    certifications: ["Fair Trade"],
    intensity: 9,
    images: [
      {
        id: 4,
        link: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
        alt: "Café Indonésie Sumatra Mandheling"
      }
    ]
  },

  {
    id: 4,
    name: "Colombie Huila",
    price: 11.90,
    description: "La douceur colombienne dans toute sa splendeur. Ce café de la région de Huila offre un profil équilibré et accessible, parfait pour débuter la journée. Notes de pomme verte, sucre roux et amande douce. Une torréfaction medium révèle toute sa rondeur.",
    stock: 52,
    category: "Amérique du Sud",
    origin: {
      country: "Colombie",
      region: "Huila",
      farm: "Finca La Esperanza",
      farmerId: "CO-HUI-023",
      coordinates: {
        latitude: 2.5355,
        longitude: -75.5277
      }
    },
    roastLevel: "medium",
    tastingNotes: ["Pomme verte", "Sucre roux", "Amande"],
    processingMethod: "Lavé",
    altitude: 1650,
    harvestDate: "2025-11-30",
    certifications: ["Bio", "Fair Trade", "Rainforest Alliance"],
    intensity: 6,
    images: [
      {
        id: 5,
        link: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
        alt: "Café Colombie Huila"
      }
    ]
  },

  {
    id: 5,
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
      coordinates: {
        latitude: -0.4167,
        longitude: 36.9500
      }
    },
    roastLevel: "light",
    tastingNotes: ["Cassis", "Pamplemousse rose", "Tomate confite"],
    processingMethod: "Lavé double fermentation",
    altitude: 1900,
    harvestDate: "2026-02-01",
    certifications: ["Fair Trade"],
    intensity: 8,
    images: [
      {
        id: 6,
        link: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800",
        alt: "Café Kenya AA Nyeri"
      }
    ]
  },

  {
    id: 6,
    name: "Guatemala Antigua",
    price: 13.20,
    description: "Un classique centraméricain de la vallée volcanique d'Antigua. Sol riche en minéraux, altitude idéale et savoir-faire ancestral donnent un café complexe aux notes de cacao, caramel salé et orange confite. Torréfaction medium-dark pour un corps riche.",
    stock: 38,
    category: "Amérique Centrale",
    origin: {
      country: "Guatemala",
      region: "Antigua",
      farm: "Finca Azotea",
      farmerId: "GT-ANT-015",
      coordinates: {
        latitude: 14.5611,
        longitude: -90.7344
      }
    },
    roastLevel: "medium-dark",
    tastingNotes: ["Cacao", "Caramel salé", "Orange confite"],
    processingMethod: "Lavé",
    altitude: 1600,
    harvestDate: "2026-01-10",
    certifications: ["Bio", "Rainforest Alliance"],
    intensity: 7,
    images: [
      {
        id: 7,
        link: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800",
        alt: "Café Guatemala Antigua"
      }
    ]
  },

  {
    id: 7,
    name: "Costa Rica Tarrazu",
    price: 14.10,
    description: "La pureté costaricaine. Cultivé dans la prestigieuse région de Tarrazu, ce café strictement hard bean (SHB) bénéficie d'une altitude exceptionnelle. Notes de miel d'acacia, nectarine et fleur d'oranger. Une douceur naturelle remarquable.",
    stock: 41,
    category: "Amérique Centrale",
    origin: {
      country: "Costa Rica",
      region: "Tarrazu",
      farm: "Finca Don Cayito",
      farmerId: "CR-TAR-009",
      coordinates: {
        latitude: 9.4986,
        longitude: -84.0100
      }
    },
    roastLevel: "medium",
    tastingNotes: ["Miel d'acacia", "Nectarine", "Fleur d'oranger"],
    processingMethod: "Honey (miel)",
    altitude: 1950,
    harvestDate: "2025-12-15",
    certifications: ["Bio", "Fair Trade"],
    intensity: 6,
    images: [
      {
        id: 8,
        link: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800",
        alt: "Café Costa Rica Tarrazu"
      }
    ]
  },

  {
    id: 8,
    name: "Brésil Cerrado",
    price: 10.90,
    description: "Le géant brésilien dans toute sa générosité. Ce café du Cerrado Mineiro offre un excellent rapport qualité-prix avec un profil gourmand : noisette grillée, chocolat au lait et notes de pain d'épices. Corps moyen, parfait pour l'espresso.",
    stock: 67,
    category: "Amérique du Sud",
    origin: {
      country: "Brésil",
      region: "Cerrado Mineiro",
      farm: "Fazenda Sertão",
      farmerId: "BR-CER-031",
      coordinates: {
        latitude: -17.8419,
        longitude: -46.9292
      }
    },
    roastLevel: "medium-dark",
    tastingNotes: ["Noisette grillée", "Chocolat au lait", "Pain d'épices"],
    processingMethod: "Naturel",
    altitude: 1100,
    harvestDate: "2026-01-20",
    certifications: ["Rainforest Alliance"],
    intensity: 7,
    images: [
      {
        id: 9,
        link: "https://images.unsplash.com/photo-1501481663691-6e8c7eacc43d?w=800",
        alt: "Café Brésil Cerrado"
      }
    ]
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
