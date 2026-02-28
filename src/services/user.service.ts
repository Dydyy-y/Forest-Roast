/**
 * Service utilisateur
 *
 * Gère les appels API pour lire et modifier le profil d'un utilisateur connecté.
 *
 * Endpoints utilisés (depuis swagger.json) :
 * - GET /api/users/{id}   → lire le profil
 * - PUT /api/users/{id}   → modifier le profil
 *
 * ⚠️ Ces deux endpoints NÉCESSITENT le JWT → includeAuth: true
 * ⚠️ Les réponses 401/404 sont text/plain, pas JSON
 */
import { BaseService } from './base.service';
import { getHeaders } from './api';
import type { AuthUser, UserUpdate } from '../types/auth.types';

class UserService extends BaseService<AuthUser> {
  constructor() {
    // endpoint '/users' → URLs : {baseUrl}/users/{id}
    super('/users');
  }

  /**
   * Récupère les infos d'un utilisateur par son ID
   *
   * GET /api/users/{id}
   * Authorization: Bearer <token>  ← REQUIRED
   *
   * Response 200 : User { id, firstName, lastName, emailAddress, ... }
   * Response 401 : "Unauthorized" (text/plain)
   * Response 404 : "User not found" (text/plain)
   *
   * @param id identifiant de l'utilisateur (depuis AuthContext)
   */
  async getById(id: number): Promise<AuthUser> {
    try {
      const response = await fetch(this.buildUrl(`/${id}`), {
        method: 'GET',
        headers: getHeaders({
          includeAuth: true,    // JWT obligatoire
          contentType: 'none',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let message = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          message = errorJson.message || errorJson.error || message;
        } catch {
          // text/plain — garder tel quel
        }
        throw new Error(message || `Erreur ${response.status}`);
      }

      return response.json() as Promise<AuthUser>;
    } catch (error) {
      console.error(`❌ Error fetching user ${id}:`, error);
      throw error;
    }
  }

  /**
   * Met à jour le profil d'un utilisateur
   *
   * PUT /api/users/{id}
   * Authorization: Bearer <token>  ← REQUIRED
   * Body : UserUpdate (tous les champs optionnels)
   *
   * Response 200 : User mis à jour
   * Response 401 : "Unauthorized" (text/plain)
   * Response 404 : "User not found" (text/plain)
   *
   * ⚠️ Ne pas inclure password dans data s'il est vide
   *
   * @param id   identifiant de l'utilisateur
   * @param data champs à modifier (uniquement les non-vides)
   */
  async update(id: number, data: UserUpdate): Promise<AuthUser> {
    try {
      const response = await fetch(this.buildUrl(`/${id}`), {
        method: 'PUT',
        headers: getHeaders({
          includeAuth: true,    // JWT obligatoire
          contentType: 'json',
        }),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let message = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          message = errorJson.message || errorJson.error || message;
        } catch {
          // text/plain — garder tel quel
        }
        throw new Error(message || `Erreur ${response.status}`);
      }

      return response.json() as Promise<AuthUser>;
    } catch (error) {
      console.error(`❌ Error updating user ${id}:`, error);
      throw error;
    }
  }
}

// Singleton exporté — même pattern que authService, productService
export const userService = new UserService();
export default userService;
