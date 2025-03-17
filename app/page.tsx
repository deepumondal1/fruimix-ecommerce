import Image from "next/image"
import { ShopNowButton } from "@/components/shop-now-button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-amber-50 to-amber-100 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Premium Dry Fruits for a Healthier You
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Discover the perfect blend of nature's finest dry fruits. Handpicked and packed with care for maximum
                  freshness and nutrition.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <ShopNowButton />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[450px] w-[100%] md:h-[500px] md:w-[500px]">
                <Image src="/assets/fruimix_HEADER(2).png" alt="Fruimix Dry Fruits" fill className="object-contain" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Fruimix?</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our commitment to quality and freshness sets us apart
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-amber-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-amber-600"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Premium Quality</h3>
              <p className="text-center text-gray-500">Sourced from the finest orchards around the world</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-amber-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-amber-600"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Packed with Love</h3>
              <p className="text-center text-gray-500">Carefully selected and packed to preserve freshness</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-amber-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-amber-600"
                >
                  <path d="M12 22V8" />
                  <path d="m5 12-2 2 2 2" />
                  <path d="m19 12 2 2-2 2" />
                  <path d="M5 14h14" />
                  <path d="M7 4h10" />
                  <path d="M9 4v4" />
                  <path d="M15 4v4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Fast Delivery</h3>
              <p className="text-center text-gray-500">Secure packaging and prompt delivery to your doorstep</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

