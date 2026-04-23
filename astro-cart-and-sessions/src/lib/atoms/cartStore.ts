import { atom, map } from "nanostores";
import type { CartItem, Product } from "../../types/Cart";

export const isCartOpen = atom(false);
export const cartItems = map<Record<string, CartItem>>({});

//Funciones para manejar los stores

export function addCartItem(productItem: Product) {
  const existingEntry = cartItems.get()[productItem.id];
  if (existingEntry) {
    cartItems.setKey(productItem.id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    cartItems.setKey(productItem.id, { ...productItem, quantity: 1 });
  }
}

export function removeCartItem(productId: string) {
  const existingEntry = cartItems.get()[productId];
  if (existingEntry) {
    if (existingEntry.quantity > 1) {
      cartItems.setKey(productId, {
        ...existingEntry,
        quantity: existingEntry.quantity - 1,
      });
    } else {
      cartItems.setKey(productId, undefined);
    }
  }
}
