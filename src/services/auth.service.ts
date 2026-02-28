import { BaseService } from './base.service';
import { getHeaders } from './api';
import type { AuthUser, SignUpRequest, SignInRequest, SignInResponse } from '../types/auth.types';

class AuthService extends BaseService<AuthUser> {
  constructor() {
    // endpoint '/users' → les URLs seront : {baseUrl}/users/signup et {baseUrl}/users/signin
    super('/users');
  }

  /**
   * @param data données du formulaire d'inscription
   * @returns l'utilisateur créé
   */
  async signup(data: SignUpRequest): Promise<AuthUser> {
    try {
      console.log('Signing up user:', data.emailAddress);

      const response = await fetch(this.buildUrl('/signup'), {
        method: 'POST',
        headers: getHeaders({
          includeAuth: false,   // pas de token au signup, on n'est pas encore connecté
          contentType: 'json',
        }),
        body: JSON.stringify(data),
      });

      // Gestion erreur : on lit la réponse manuellement pour gérer text/plain ET JSON
      if (!response.ok) {
        const errorText = await response.text();
        let message = `Erreur lors de l'inscription (${response.status})`;
        try {
          // Essayer de parser comme JSON (cas 500 Sequelize, etc.)
          const errorJson = JSON.parse(errorText);
          if (errorJson.name === 'SequelizeValidationError' && Array.isArray(errorJson.errors) && errorJson.errors.length > 0) {
            // Traduire les erreurs de validation Sequelize
            const first = errorJson.errors[0];
            if (first.path === 'emailAddress' && first.validatorName === 'isEmail') {
              message = 'Adresse email invalide. Utilisez le format : example@email.com';
            } else if (first.path === 'emailAddress' && first.type === 'unique violation') {
              message = 'Cette adresse email est déjà utilisée.';
            } else {
              message = first.message ?? message;
            }
          } else if (response.status === 409 || errorJson.error === 'Email déjà utilisé') {
            message = 'Cette adresse email est déjà utilisée. Essayez de vous connecter.';
          } else {
            message = errorJson.message || errorJson.error || message;
          }
        } catch {
          // Pas du JSON → message générique
        }
        throw new Error(message);
      }

      return response.json() as Promise<AuthUser>;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  /**
   * @param data email + mot de passe
   * @returns token JWT + infos utilisateur
   */
  async signin(data: SignInRequest): Promise<SignInResponse> {
    try {
      console.log('Signing in user:', data.emailAddress);

      const response = await fetch(this.buildUrl('/signin'), {
        method: 'POST',
        headers: getHeaders({
          includeAuth: false,   // pas de token au signin, on essaie de l'obtenir
          contentType: 'json',
        }),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // 401 renvoie text/plain "Authentication failed", pas du JSON
        // On utilise .text() pour éviter une erreur de parsing JSON
        const errorText = await response.text();
        let message = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          message = errorJson.message || errorJson.error || message;
        } catch {
          // Pas du JSON (cas 401) → garder le texte brut
        }

        // Traduction des messages d'erreur API (en anglais) en français
        const traductions: Record<string, string> = {
          'User not found': 'Aucun compte trouvé avec cet email.',
          'Authentication failed': 'Email ou mot de passe incorrect.',
          'Invalid password': 'Mot de passe incorrect.',
          'Unauthorized': 'Email ou mot de passe incorrect.',
        };
        message = traductions[message.trim()] ?? message ?? `Erreur d'authentification (${response.status})`;
        throw new Error(message);
      }

      return response.json() as Promise<SignInResponse>;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }
}

// Instance singleton exportée — même pattern que productService
export const authService = new AuthService();
export default authService;
