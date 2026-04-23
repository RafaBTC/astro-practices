import { addCartItem, isCartOpen } from '../lib/atoms/cartStore'
import { products } from '../mocks/products.json'
import type { Product } from '../types/Cart'

export default function Products() {
  const addToCart = (product: Product) => {
    isCartOpen.set(true)
    addCartItem(product)
  }

  return products.map((product) => {
    const { id, image, name, price, currency, description } = product
    return (
      <article key={id} className="rounded-2xl bg-slate-700 p-4">
        <img
          src={image}
          alt={`Cover del juego ${name}`}
          className="mx-auto h-100 w-full object-contain"
        />
        <div className="mt-4 flex flex-col">
          <div className="min-h-96">
            <h4 className="text-2xl font-bold">{name}</h4>
            <span className="text-xl font-medium text-indigo-300">
              ${price} {currency}
            </span>
            <p className="my-4 text-sm">{description}</p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => addToCart(product)}
              className="w-fit rounded-lg bg-violet-600 px-4 py-2 transition hover:bg-violet-800"
            >
              ¡Añadir al carrito!
            </button>
          </div>
        </div>
      </article>
    )
  })
}
