export interface UserDataRegister {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string,
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface LoginCredentials {
  email: string;
  password: string;
}


export interface LoginResponse {
  token: string;
  user: User;
}

export interface VerifyTokenResponse {
  valid: boolean;
  user: User;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}