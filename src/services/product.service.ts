import { BaseService } from "./base.service";
import type {
  Product,
  ProductSearchParams,
} from "../types/product.types";

class ProductService extends BaseService<Product> {
  constructor() {
    super("/products");
  }

  /**
   * @param params paramètres de recherche optionnels
   * @returns liste de produits filtrés
   */
  async search(params?: ProductSearchParams): Promise<Product[]> {
    try {
      console.log("Searching products with params:", params);

      //convertir PoductSearchParams en qery pour l'appel API
      const queryParams: Record<string, string | number> = {};

      if (params?.search) {
        queryParams.search = params.search;
      }
      if (params?.category) {
        queryParams.category = params.category;
      }
      if (params?.minPrice !== undefined) {
        queryParams.minPrice = params.minPrice;
      }
      if (params?.maxPrice !== undefined) {
        queryParams.maxPrice = params.maxPrice;
      }

      //méthode getall() héritée
      const result = await this.getAll(queryParams);
      // sequelize returns associations with capitalized keys by default, e.g. Images
      // normalise to lowercase 'images' so UI can read product.images
      return result.map((p) => {
        const copy: any = { ...p };
        if ((copy as any).Images) {
          copy.images = (copy as any).Images;
          delete copy.Images;
        }
        return copy;
      }) as Product[];
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  }

  /**
   * Méthode helper pour simplifier la recherche par catégorie
   * C'est un raccourci pour search({ category })
   *
   * @param category nom de la catégorie
   * @returns produits de cette catégorie
   */
  async getByCategory(category: string): Promise<Product[]> {
    console.log(`Fetching products from category: ${category}`);
    return this.search({ category });
  }

  /**
   * @param minPrice prix minimum
   * @param maxPrice prix maximum
   * @returns produits dans cette fourchette
   */
  async getByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    console.log(`💰 Fetching products between ${minPrice}€ and ${maxPrice}€`);
    return this.search({ minPrice, maxPrice });
  }

  /**
   * @param productId ID du produit
   * @returns true si disponible, false sinon
   */
  async isAvailable(productId: number): Promise<boolean> {
    try {
      const product = await this.getById(productId);
      return product.stock > 0;
    } catch (error) {
      console.error(`Error checking availability for product ${productId}:`, error);
      return false;
    }
  }

  /**
   * Récupérer produits en stock
   * @returns produits avec stock > 0
   */
  async getInStock(): Promise<Product[]> {
    const allProducts = await this.getAll();
    return allProducts.filter((product) => product.stock > 0);
  }

  //Récupérer les nouveaux produits, par défaut les 10 premiers, suppose que l'api envoie les produits triées
  async getNewArrivals(limit: number = 10): Promise<Product[]> {
    try {
      const products = await this.getAll();
      return products.slice(0, limit);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
      throw error;
    }
  }
}

export const productService = new ProductService();