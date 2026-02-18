export interface Product {
  id: number;     
  name: string;     
  price: number;        
  description: string;     
  stock: number;      
  category?: string;      
  images?: ProductImage[];
  origin?: CoffeeOrigin;         
  roastLevel?: RoastLevel;     
  tastingNotes?: string[];       
  processingMethod?: string;      
  altitude?: number;            
  harvestDate?: string;          
  certifications?: string[];     
  intensity?: number;      
}

export interface CoffeeOrigin {
  country: string;               
  region?: string;                
  farm?: string;                 
  farmerId?: string;              
  coordinates?: {               
    latitude: number;
    longitude: number;
  };
}

export type RoastLevel = 
  | 'light'     
  | 'medium' 
  | 'medium-dark' 
  | 'dark';    
  
export interface ProductImage {
  id: number;
  link: string; 
  alt?: string;  
}

//pour réponse api/product
export type ProductsResponse = Product[] | {  //renvoie soit tab product soit metadonnees
  products: Product[];
  total: number;
  page?: number;
  limit?: number;
};

export interface ProductSearchParams {
  search?: string;  
  category?: string;     
  minPrice?: number;  
  maxPrice?: number;
  
  //filtre spécifique
  origin?: string;          
  roastLevel?: RoastLevel;     
  certifications?: string[];   
  minIntensity?: number;       
  maxIntensity?: number;      
}