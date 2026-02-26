export interface SignUpRequest {
  firstName: string;      
  lastName: string;      
  emailAddress: string;   
  password: string; 
}

export interface SignInRequest {
  emailAddress: string; 
  password: string;      
}

export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  password?: string;
}

export interface SignInResponse {
  token: string; 
  user: AuthUser;
}
