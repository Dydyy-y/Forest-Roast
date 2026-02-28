import { BaseService } from './base.service';
import { getHeaders } from './api';
import type { Cart } from '../types/cart.types';

class CartService extends BaseService<Cart> {
  constructor() {
    // endpoint '/carts' → les URLs seront construites avec buildUrl()
    // ex: buildUrl('/user/42') → http://localhost:8080/api/carts/user/42
    super('/carts');
  }

  async getCartByUserId(userId: number): Promise<Cart> {
    try {
      console.log(`Chargement du panier pour l'utilisateur ${userId}`);

      // Chemin spécial : /carts/user/{id} → utiliser buildUrl('/user/' + userId)
      const response = await fetch(this.buildUrl(`/user/${userId}`), {
        method: 'GET',
        headers: getHeaders({
          includeAuth: true,   // JWT obligatoire
          contentType: 'none', // GET → pas de body
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erreur ${response.status}`);
      }

      return response.json() as Promise<Cart>;
    } catch (error) {
      console.error(`Erreur chargement panier utilisateur ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Retourne le nombre d'articles dans le panier d'un utilisateur
   *
   * GET /api/carts/user/{user_id}/count
   * Authorization: Bearer <token>   ← REQUIRED
   *
   * Response 200 : number (entier)
   * Response 500 : { error: string }
   *
   * Utile pour afficher un badge dans la navbar sans recharger le panier complet.
   *
   * @param userId l'id de l'utilisateur connecté
   */
  async getCartItemCount(userId: number): Promise<number> {
    try {
      const response = await fetch(this.buildUrl(`/user/${userId}/count`), {
        method: 'GET',
        headers: getHeaders({
          includeAuth: true,
          contentType: 'none',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erreur ${response.status}`);
      }

      return response.json() as Promise<number>;
    } catch (error) {
      console.error(`Erreur comptage panier utilisateur ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Ajoute un produit au panier
   *
   * POST /api/carts/{cart_id}/products/{product_id}
   * Authorization: Bearer <token>   ← REQUIRED
   * ⚠️ Pas de body JSON nécessaire — tout est dans l'URL
   *
   * Response 200 : Cart mis à jour (avec Products[] actualisé)
   * Response 404 : "Cart or product not found" (text/plain !)
   * Response 500 : { error: string }
   *
   * @param cartId    l'id du panier (depuis Cart.id)
   * @param productId l'id du produit à ajouter
   */
  async addProduct(cartId: number, productId: number): Promise<Cart> {
    try {
      console.log(`Ajout produit ${productId} au panier ${cartId}`);

      const response = await fetch(
        this.buildUrl(`/${cartId}/products/${productId}`),
        {
          method: 'POST',
          // contentType: 'none' → pas de Content-Type header, pas de body
          headers: getHeaders({ includeAuth: true, contentType: 'none' }),
        }
      );

      // Gestion erreur manuelle : 404 est text/plain (pas JSON)
      if (!response.ok) {
        const errorText = await response.text();
        let message = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          message = errorJson.message || errorJson.error || message;
        } catch {
          // text/plain → garder tel quel
        }
        throw new Error(message || `Erreur ${response.status}`);
      }

      return response.json() as Promise<Cart>;
    } catch (error) {
      console.error(`Erreur ajout produit ${productId} au panier:`, error);
      throw error;
    }
  }

  /**
   * Retire un produit du panier
   *
   * DELETE /api/carts/{cart_id}/products/{product_id}
   * Authorization: Bearer <token>   ← REQUIRED
   *
   * Response 200 : Cart mis à jour (avec Products[] actualisé)
   * Response 404 : "Cart or product not found" (text/plain !)
   * Response 500 : { error: string }
   *
   * @param cartId    l'id du panier
   * @param productId l'id du produit à retirer
   */
  async removeProduct(cartId: number, productId: number): Promise<Cart> {
    try {
      console.log(`Retrait produit ${productId} du panier ${cartId}`);

      const response = await fetch(
        this.buildUrl(`/${cartId}/products/${productId}`),
        {
          method: 'DELETE',
          headers: getHeaders({ includeAuth: true, contentType: 'none' }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let message = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          message = errorJson.message || errorJson.error || message;
        } catch {
          // text/plain → garder tel quel
        }
        throw new Error(message || `Erreur ${response.status}`);
      }

      return response.json() as Promise<Cart>;
    } catch (error) {
      console.error(`Erreur retrait produit ${productId} du panier:`, error);
      throw error;
    }
  }
}

// Export en singleton — une seule instance pour toute l'app
export const cartService = new CartService();
