import { useStore } from "@nanostores/react";
import { isCartOpen } from "../lib/atoms/cartStore";
import { Icon } from "astro-icon/components";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode
}
export default function Header({ children } : Props) {
  const $isCartOpen = useStore(isCartOpen)

  return (
    <header className="">
      <button onClick={() => isCartOpen.set(!$isCartOpen)} className="p-3 text-xl absolute right-4 top-4 z-50 bg-violet-600 hover:bg-violet-800 transition rounded-full">
       {children}
      </button>
    </header>
  );
}
