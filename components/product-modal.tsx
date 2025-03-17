"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
}

interface DiscountOption {
  id: string
  discountPercentage: number
  discountedPrice: number
  label: string
}

interface ProductVariant {
  id: string
  weight: string
  originalPrice: number
  discountOptions: DiscountOption[]
}

export function ProductModal({ isOpen, onClose }: ProductModalProps) {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState("250g")
  const [selectedDiscounts, setSelectedDiscounts] = useState<Record<string, string>>({
    "250g": "",
    "500g": "",
    "1kg": "",
  })

  if (!isOpen) return null

  const productVariants: ProductVariant[] = [
    {
      id: "fruimix-250g",
      weight: "250g",
      originalPrice: 299,
      discountOptions: [
        {
          id: "250g-discount-1",
          discountPercentage: 10,
          discountedPrice: 269,
          label: "New Customer Offer",
        },
        {
          id: "250g-discount-2",
          discountPercentage: 12,
          discountedPrice: 263,
          label: "Weekend Special",
        },
        {
          id: "250g-discount-3",
          discountPercentage: 15,
          discountedPrice: 254,
          label: "Bulk Purchase",
        },
      ],
    },
    {
      id: "fruimix-500g",
      weight: "500g",
      originalPrice: 549,
      discountOptions: [
        {
          id: "500g-discount-1",
          discountPercentage: 12,
          discountedPrice: 483,
          label: "New Customer Offer",
        },
        {
          id: "500g-discount-2",
          discountPercentage: 15,
          discountedPrice: 467,
          label: "Weekend Special",
        },
        {
          id: "500g-discount-3",
          discountPercentage: 18,
          discountedPrice: 450,
          label: "Bulk Purchase",
        },
      ],
    },
    {
      id: "fruimix-1kg",
      weight: "1kg",
      originalPrice: 999,
      discountOptions: [
        {
          id: "1kg-discount-1",
          discountPercentage: 15,
          discountedPrice: 849,
          label: "New Customer Offer",
        },
        {
          id: "1kg-discount-2",
          discountPercentage: 18,
          discountedPrice: 819,
          label: "Weekend Special",
        },
        {
          id: "1kg-discount-3",
          discountPercentage: 20,
          discountedPrice: 799,
          label: "Bulk Purchase",
        },
      ],
    },
  ]

  const handleSelectDiscount = (weight: string, discountId: string) => {
    setSelectedDiscounts((prev) => ({
      ...prev,
      [weight]: discountId,
    }))
  }

  const handleAddToCart = (variant: ProductVariant) => {
    const selectedDiscountId = selectedDiscounts[variant.weight]

    if (!selectedDiscountId) {
      toast({
        title: "Please select a discount",
        description: "You need to select a discount option before adding to cart.",
        variant: "destructive",
      })
      return
    }

    const selectedDiscount = variant.discountOptions.find((option) => option.id === selectedDiscountId)

    if (!selectedDiscount) return

    addToCart({
      id: `${variant.id}-${selectedDiscountId}`,
      name: `Fruimix Premium Dry Fruits Mix - ${variant.weight}`,
      price: selectedDiscount.discountedPrice,
      originalPrice: variant.originalPrice,
      weight: variant.weight,
      quantity: 1,
      image: "/assets/fruimix_PRODUCT_1.svg",
    })

    toast({
      title: "Added to cart",
      description: `Fruimix Premium Dry Fruits Mix - ${variant.weight} has been added to your cart.`,
    })

    onClose()
  }

  const getVariantByWeight = (weight: string) => {
    return productVariants.find((variant) => variant.weight === weight) || productVariants[0]
  }

  const currentVariant = getVariantByWeight(activeTab)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-4 sm:p-6 shadow-lg my-8">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 sm:mb-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold">Fruimix Premium Dry Fruits Mix</h2>
          <p className="text-sm sm:text-base text-gray-500">Select your preferred package size and discount</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
          <div className="flex items-center justify-center">
            <div className="relative h-[150px] w-[150px] sm:h-[200px] sm:w-[200px]">
              <Image src="/assets/fruimix_HEADER(2).png" alt="Fruimix Dry Fruits" width={300} height={300} className="object-contain" />
            </div>
          </div>

          <div>
            <Tabs defaultValue="250g" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-2">
                <TabsTrigger value="250g">250g</TabsTrigger>
                <TabsTrigger value="500g">500g</TabsTrigger>
                <TabsTrigger value="1kg">1kg</TabsTrigger>
              </TabsList>

              {productVariants.map((variant) => (
                <TabsContent key={variant.id} value={variant.weight}>
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-500 mb-2">Select one discount option:</div>

                    {variant.discountOptions.map((discount) => (
                      <div
                        key={discount.id}
                        className={`rounded-lg border p-2 sm:p-3 cursor-pointer transition-colors ${
                          selectedDiscounts[variant.weight] === discount.id
                            ? "border-amber-600 bg-amber-50"
                            : "border-gray-200 hover:border-amber-300"
                        }`}
                        onClick={() => handleSelectDiscount(variant.weight, discount.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-sm sm:text-base">{discount.label}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-base sm:text-lg font-bold">₹{discount.discountedPrice}</span>
                              <span className="text-xs sm:text-sm text-gray-500 line-through">₹{variant.originalPrice}</span>
                            </div>
                          </div>
                          <div className="rounded-full border border-amber-600 p-1 text-amber-600">
                            {selectedDiscounts[variant.weight] === discount.id && <Check className="h-3 w-3 sm:h-4 sm:w-4" />}
                          </div>
                        </div>
                        <div className="mt-1">
                          <span className="rounded-full bg-amber-600 px-2 py-0.5 text-xs font-semibold text-white">
                            {discount.discountPercentage}% OFF
                          </span>
                        </div>
                      </div>
                    ))}

                    <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={() => handleAddToCart(variant)}>
                      Add to Cart
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

