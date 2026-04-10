import type { AstroCookies } from "astro";
import type { CartItem } from "../types";

const CART_COOKIE_NAME = "shoppingg_cart";

const CART_OPTIONS = {
  path: "/",
  httpOnly: false,
  secure: import.meta.env.PROD,
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 30,
};

export class CartManager {
  private cookies: AstroCookies;

  constructor(cookies: AstroCookies) {
    this.cookies = cookies;
  }

  getCart(): CartItem[] {
    const cartData = this.cookies.get(CART_COOKIE_NAME)?.value;
    if (!cartData) return [];

    try {
      return JSON.parse(cartData) as CartItem[];
    } catch {
      return [];
    }
  }

  setCart(items: CartItem[]): void {
    this.cookies.set(CART_COOKIE_NAME, JSON.stringify(items), CART_OPTIONS);
  }

  addItem(item: CartItem): void {
    const cart = this.getCart();
    const existingIndex = cart.findIndex((i) => i.productId === item.productId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    this.setCart(cart);
  }

  removeItem(productId: string): void {
    const cart = this.getCart().filter((item) => item.productId === productId);
    this.setCart(cart);
  }

  getTotal(): number {
    return this.getCart().reduce((total, item) => (total += item.price), 0);
  }
}

export function getCartManager(cookies: AstroCookies): CartManager {
  return new CartManager(cookies)
}
