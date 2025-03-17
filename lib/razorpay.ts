"use client"

interface RazorpayPaymentOptions {
  amount: number
  currency: string
  name: string
  description: string
  customerName: string
  customerEmail: string
  customerPhone: string
}

interface RazorpayResponse {
  success: boolean
  error?: string
  paymentId?: string
  orderId?: string
}

// Load Razorpay script dynamically
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      return resolve(true)
    }
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export const initiateRazorpayPayment = async (options: RazorpayPaymentOptions): Promise<RazorpayResponse> => {
  const scriptLoaded = await loadRazorpayScript()

  if (!scriptLoaded) {
    return {
      success: false,
      error: "Failed to load Razorpay SDK",
    }
  }

  // In a real application, you would make an API call to your backend to create an order
  // For demo purposes, we're simulating this process
  const orderId = `order_${Date.now()}`

  return new Promise((resolve) => {
    const rzp = new (window as any).Razorpay({
      key: "rzp_test_YOUR_KEY_ID", // Replace with your actual test key in production
      amount: options.amount * 100, // Razorpay expects amount in paise
      currency: options.currency,
      name: options.name,
      description: options.description,
      order_id: orderId,
      handler: (response: any) => {
        resolve({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
        })
      },
      prefill: {
        name: options.customerName,
        email: options.customerEmail,
        contact: options.customerPhone,
      },
      theme: {
        color: "#d97706", // amber-600
      },
      modal: {
        ondismiss: () => {
          resolve({
            success: false,
            error: "Payment cancelled by user",
          })
        },
      },
    })

    rzp.open()
  })
}

