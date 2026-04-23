import { useStore } from "@nanostores/react";
import { cartItems, isCartOpen } from "../lib/atoms/cartStore";

export default function Cart() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);

  return (
    <div
      className={`fixed w-100  rounded-2xl z-999 bg-slate-600 ${$isCartOpen ? "block" : "hidden"} right-8 top-20 transition-all duration-300 p-4`}
    >
      {Object.values($cartItems).length ? (
        <ul>
          {Object.values($cartItems).map(
            ({ id, image, name, price, currency, quantity }) => (
              <li key={id} className="flex">
                <img
                  src={image}
                  alt={`Cover del juego ${name}`}
                  className="w-10 h-auto object-contain mx-auto"
                />
                <div>
                  <h3 className="text-lg font-bold">{name}</h3>
                  <span>
                    {price} {currency}
                  </span>
                  <p>Quantity: {quantity} </p>
                </div>
              </li>
            ),
          )}
        </ul>
      ) : (
        <p>
          ¡No hay productos en su carrito!
        </p>
      )}

      <a
        href="/login"
        className="bg-violet-600 px-4 py-2 rounded-lg transition hover:bg-violet-800"
      >
        Iniciar sesión
      </a>
    </div>
  );
}
