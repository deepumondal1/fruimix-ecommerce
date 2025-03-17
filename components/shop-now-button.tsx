"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { ProductModal } from "@/components/product-modal"

export function ShopNowButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
        <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        Shop Now
      </Button>
      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

