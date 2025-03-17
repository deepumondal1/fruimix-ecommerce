import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 rounded-full bg-green-100 p-3">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h1 className="mb-4 text-3xl font-bold">Thank You for Your Order!</h1>
      <p className="mb-8 max-w-md text-gray-600">
        Your order has been placed successfully. We've sent a confirmation email with your order details.
      </p>
      <p className="mb-8 text-lg font-medium">
        Order ID:{" "}
        <span className="font-bold">{`FRX${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`}</span>
      </p>
      <Link href="/">
        <Button className="bg-amber-600 hover:bg-amber-700">Continue Shopping</Button>
      </Link>
    </div>
  )
}

