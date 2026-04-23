import { addCartItem, isCartOpen } from "../lib/atoms/cartStore";
import { products } from "../mocks/products.json";
import type { Product } from "../types/Cart";

export default function Products() {

  const addToCart = (product: Product) => {
    isCartOpen.set(true);
    addCartItem(product);
  };

  return products.map((product) => {
    const { id, image, name, price, currency, description } = product;
    return (
      <article key={id} className="bg-slate-700 rounded-2xl p-4">
        <img
          src={image}
          alt={`Cover del juego ${name}`}
          className="mx-auto w-full h-100 object-contain"
        />
        <div className="mt-4 flex flex-col">
          <div className="min-h-96">
            <h4 className="font-bold text-2xl">{name}</h4>
            <span className="font-medium text-xl text-indigo-300">
              ${price} {currency}
            </span>
            <p className="text-sm my-4">{description}</p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => addToCart(product)}
              className="bg-violet-600 px-4 py-2 rounded-lg transition hover:bg-violet-800 w-fit"
            >
              ¡Añadir al carrito!
            </button>
          </div>
        </div>
      </article>
    );
  });
}
