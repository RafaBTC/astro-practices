import { httpClient } from "../lib/httpClient";
import type { User } from "../types";

export const userService = {
  async getProfile(token: string) {
    return httpClient.get<User>("/users/profile", token);
  },

  async updateProfile(token: string, data: Partial<User>) {
    return httpClient.put<User>("/users/profile", data, token);
  },

  async getUsers(token: string) {
    return httpClient.get<User[]>("/users", token);
  },

  async deleteUser(token: string, userId: string) {
    return httpClient.delete(`/users/${userId}`, token);
  },
};
