import { useStore } from "@nanostores/react";
import { cartItems, isCartOpen } from "../lib/atoms/cartStore";
import { Icon } from "astro-icon/components";

export default function Cart() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);

  return (
    <div
      className={`fixed z-999 w-100 rounded-2xl bg-slate-600 ${$isCartOpen ? "block" : "hidden"} top-20 right-8 p-4 transition-all duration-300 h-80 max-h-80 flex flex-col justify-between`}
    >
      {Object.values($cartItems).length ? (


        <ul className="space-y-4">


          {Object.values($cartItems).map(
            ({ id, image, name, price, currency, quantity }) => (
              <li key={id} className="flex gap-4">
                <div>
                  <div className="w-16 h-auto">
                    <img
                      src={image}
                      alt={`Cover del juego ${name}`}
                      className="w-16 h-auto object-cover"
                    />
                  </div>


                  <div   >
                    <h3 className="font-bold">{name}</h3>
                    <div className="flex justify-between">
                      <p>Quantity: {quantity} </p>
                      <span className="text-sm font-medium">
                        ${price} {currency}
                      </span>
                    </div>
                  </div>
                  <button>
                    <Icon name="ri:close-large-fill" />
                  </button>
                </div>
              </li>
            ),
          )}
        </ul>
      ) : (
        <p className="text-center flex items-center justify-center h-full">
          ¡No hay productos en su carrito!
        </p>
      )}

      <div className="flex justify-around mt-4">
        <a
          href="/login"
          className="rounded-lg bg-violet-600 px-4 py-2 transition hover:bg-violet-800"
        >
          Iniciar sesión
        </a>
        <a
          href="/finalizar-compra"
          className="rounded-lg bg-violet-600 px-4 py-2 transition hover:bg-violet-800"
        >
          Finalizar compra
        </a>
      </div>
    </div>
  );
}
