import { httpClient } from "../lib/httpClient"
import type { Product } from "../types"

export const productService = {
  async getAll(token?: string){
    return httpClient.get<Product[]>("/products", token);
  },

  async getById(id: string, token?: string){
    return httpClient.get<Product>(`/products${id}`, token);
  },

  async create(token: string, product: Omit<Product, 'id'>){
    return httpClient.post<Product>("/products", product, token);
  },

  async update(token: string, id: string, product: Partial<Product>){
    return httpClient.put(`/products/${product}`, product, token);
  }
};