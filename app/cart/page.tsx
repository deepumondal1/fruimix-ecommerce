"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-6 text-3xl font-bold">Your Cart is Empty</h1>
        <p className="mb-8 text-gray-500">Looks like you haven't added any items to your cart yet.</p>
        <Link href="/">
          <Button className="bg-amber-600 hover:bg-amber-700">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-10 text-3xl font-bold">Your Cart</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-lg border">
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-4 sm:gap-6">
                  <div className="flex items-center sm:col-span-2">
                    <div className="relative mr-4 h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.image || "/assets/fruimix_PRODUCT_1.svg"}
                        alt={item.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.weight}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-center">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-medium">₹{item.price * item.quantity}</div>
                      {item.originalPrice !== item.price && (
                        <div className="text-sm text-gray-500 line-through">₹{item.originalPrice * item.quantity}</div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Items ({totalItems})</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Including all taxes and shipping charges</p>
              </div>
            </div>
            <Button className="mt-6 w-full bg-amber-600 hover:bg-amber-700" onClick={() => router.push("/checkout")}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

