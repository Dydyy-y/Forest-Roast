import { getHeaders } from "./api";

//pour getall()
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

//réponse API paginée
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

//abstract : ne peut pas faire new BaseService(), doit etre étendue
export abstract class BaseService<T> {
  protected readonly baseUrl: string; //baseurl : stocker api
  protected readonly endpoint: string;

  constructor(
    endpoint: string,
    baseUrl: string = import.meta.env.VITE_API_BASE_URL ||
      "http://localhost:3000/api",
  ) {
    this.baseUrl = baseUrl;
    this.endpoint = endpoint;
  }

  protected buildUrl(path: string = ""): string {
    return `${this.baseUrl}${this.endpoint}${path}`;
  }

  protected async handleResponse<R = T>(response: Response): Promise<R> {
    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Si pas de JSON, garder le message par défaut
      }

      throw new Error(errorMessage);
    }
    //parser erreurs
    return response.json() as Promise<R>;
  }

  /**
   * @param params paramètres de query optionnels
   * @returns liste d'éléments de type T
   */
  async getAll(params?: QueryParams): Promise<T[]> {
    try {
      const url = new URL(this.buildUrl());

      //ajouter query params s'ils existent
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: getHeaders({
          includeAuth: false,
          contentType: "none",
        }),
      });

      const data = await this.handleResponse<
        T[] | { products?: T[]; data?: T[] }
      >(response);

      //noramalisation requete api
      if (Array.isArray(data)) {
        return data;
      } else if ("products" in data && Array.isArray(data.products)) {
        return data.products;
      } else if ("data" in data && Array.isArray(data.data)) {
        return data.data;
      }

      return [];
    } catch (error) {
      console.error(`Error fetching all from ${this.endpoint}:`, error);
      throw error;
    }
  }

  async getById(id: number | string): Promise<T> {
    try {
      console.log(`Fetching ${this.endpoint}/${id}`);

      const response = await fetch(this.buildUrl(`/${id}`), {
        method: "GET",
        headers: getHeaders({
          includeAuth: false,
          contentType: "none",
        }),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error(`Error fetching ${this.endpoint}/${id}:`, error);
      throw error;
    }
  }

  /**
   * @param data données du nouvel élément
   * @returns élément créé
   */
  async create(data: Partial<T>): Promise<T> {
    try {
      console.log(`Creating new ${this.endpoint}`, data);

      const response = await fetch(this.buildUrl(), {
        method: "POST",
        headers: getHeaders({
          includeAuth: true, //authentification requise pour créer
          contentType: "json",
        }),
        body: JSON.stringify(data),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error(`Error creating ${this.endpoint}:`, error);
      throw error;
    }
  }

  /**
   * @param data données à mettre à jour
   * @returns élément mis à jour
   */
  async update(id: number | string, data: Partial<T>): Promise<T> {
    try {
      console.log(`Updating ${this.endpoint}/${id}`, data);

      const response = await fetch(this.buildUrl(`/${id}`), {
        method: "PUT",
        headers: getHeaders({
          includeAuth: true,
          contentType: "json",
        }),
        body: JSON.stringify(data),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error(`Error updating ${this.endpoint}/${id}:`, error);
      throw error;
    }
  }

  /**
   * @param id identifiant de l'élément
   * @returns succès ou échec
   */
  async delete(id: number | string): Promise<void> {
    try {
      console.log(`Deleting ${this.endpoint}/${id}`);

      const response = await fetch(this.buildUrl(`/${id}`), {
        method: "DELETE",
        headers: getHeaders({
          includeAuth: true,
          contentType: "none",
        }),
      });

      await this.handleResponse<void>(response);
    } catch (error) {
      console.error(`Error deleting ${this.endpoint}/${id}:`, error);
      throw error;
    }
  }
}
