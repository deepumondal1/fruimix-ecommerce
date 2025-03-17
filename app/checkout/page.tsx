"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { initiateRazorpayPayment } from "@/lib/razorpay"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      })
      router.push("/")
      return
    }

    try {
      setIsProcessing(true)

      // Create order in your backend
      const orderData = {
        items,
        totalAmount: totalPrice,
        customerInfo: formData,
      }

      // Normally you would send this to your API
      console.log("Order data:", orderData)

      // Initiate Razorpay payment
      const paymentResult = await initiateRazorpayPayment({
        amount: totalPrice,
        currency: "INR",
        name: "Fruimix",
        description: "Purchase of premium dry fruits",
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
      })

      if (paymentResult.success) {
        // Payment successful
        clearCart()
        toast({
          title: "Payment successful",
          description: "Your order has been placed successfully.",
        })
        router.push("/thank-you")
      } else {
        // Payment failed
        toast({
          title: "Payment failed",
          description: paymentResult.error || "Something went wrong with the payment.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout failed",
        description: "An error occurred during checkout. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-10 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-6 text-xl font-semibold">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
              </div>

              <Button type="submit" className="mt-6 w-full bg-amber-600 hover:bg-amber-700" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Proceed to Payment"}
              </Button>
            </form>
          </div>
        </div>

        <div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between py-3">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                    {item.originalPrice !== item.price && (
                      <p className="text-sm text-gray-500 line-through">₹{item.originalPrice * item.quantity}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="mt-2 flex justify-between border-t pt-2 text-lg font-bold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h3 className="font-semibold text-amber-800">Secure Payment</h3>
            <p className="mt-1 text-sm text-amber-700">
              All transactions are secure and encrypted. We use Razorpay for secure payment processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

