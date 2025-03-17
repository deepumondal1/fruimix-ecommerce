"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export function Header() {
  const { totalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {isMobile ? (
          <>
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="./assets/fruimix_LOGO.png" alt="Fruimix Logo" width={100} height={100}/>
            </Link>
          </div>

            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </Button>

            {isMenuOpen && (
              <div className="fixed inset-0 z-50 bg-background">
                <div className="container flex h-16 items-center justify-between px-4">
                  <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                    {/* <span className="text-xl font-bold text-amber-600">Fruimix</span> */}
                    <Image src="./assets/fruimix_LOGO.png" alt="Fruimix Logo" width={100} height={100}/>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={toggleMenu}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="container px-4 py-4">
                  <ul className="space-y-4">
                    <li>
                      <Link href="/" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/cart" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                        Cart
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        ) : (
          <>
          
          <div className="flex items-center">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              {/* <span className="text-xl font-bold text-amber-600">Fruimix</span> */}
              <Image src="./assets/fruimix_LOGO.png" alt="Fruimix Logo" width={100} height={100}/>
            </Link>
          </nav>
          </>
        )}

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

