import { useStore } from '@nanostores/react'
import { isCartOpen } from '../lib/atoms/cartStore'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
export default function Header({ children }: Props) {
  const $isCartOpen = useStore(isCartOpen)

  return (
    <header className="">
      <button
        onClick={() => isCartOpen.set(!$isCartOpen)}
        className="absolute top-4 right-4 z-50 rounded-full bg-violet-600 p-3 text-xl transition hover:bg-violet-800"
      >
        {children}
      </button>
    </header>
  )
}
