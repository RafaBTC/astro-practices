import { httpClient } from "../lib/httpClient";
import type {
  LoginCredentials,
  LoginResponse,
  UserDataRegister,
  VerifyTokenResponse,
} from "../types";

export const authService = {
  async login(credentials: LoginCredentials) {
    return httpClient.post<LoginResponse>("/auth/login", credentials);
  },

  async register(userData: UserDataRegister) {
    return httpClient.post<LoginResponse>("/auth/register", userData);
  },

  async verifyToken(token: string) {
    return httpClient.get<VerifyTokenResponse>("/auth/verify", token);
  },

  async refreshToken(token: string) {
    return httpClient.post<{ token: string }>("/auth/refresh", token);
  }
};