import { useStore } from '@nanostores/react'
import type { ReactNode } from 'react'

import { isAuthStore } from '../lib/stores/authStores'
import { isCartOpen } from '../lib/stores/cartStore'

interface Props {
  children: ReactNode
}

export default function Header({ children }: Props) {
  const $isCartOpen = useStore(isCartOpen)
  const $isAuthStore = useStore(isAuthStore)

  return (
    <header className='fixed top-0 flex h-16 w-full items-center justify-center bg-indigo-900'>
      <a href='/' className='text-center text-4xl font-bold'>
        Retro Store
      </a>
      {$isAuthStore ? (
        <a
          href='/dashboard'
          className='absolute right-16 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 pb-1 text-center text-xl transition hover:bg-violet-800'
        >
          u
        </a>
      ) : (
        <a
          href='/login'
          className='right-18 absolute rounded-full bg-violet-600 px-4 py-2 transition hover:bg-violet-800'
        >
          Iniciar sesión
        </a>
      )}
      <button
        onClick={() => isCartOpen.set(!$isCartOpen)}
        className='absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-violet-600 p-3 text-xl transition hover:bg-violet-800'
      >
        {children}
      </button>
    </header>
  )
}
