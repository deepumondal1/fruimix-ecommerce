import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Fruimix</h3>
            <p className="text-sm text-gray-500">
              Premium quality dry fruits, handpicked and packed with care for maximum freshness and nutrition.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-amber-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-500 hover:text-amber-600">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Email: support@fruimix.com</li>
              <li>Phone: +91 9876543210</li>
              <li>Address: 123 Fruit Street, Nutville, India</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Security</h3>
            <p className="text-sm text-gray-500">
              We use industry-standard encryption and secure payment processing to protect your data and transactions.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Fruimix. All rights reserved.</p>
          <p className="mt-2">
            <Link href="#" className="hover:text-amber-600">
              Privacy Policy
            </Link>{" "}
            •{" "}
            <Link href="#" className="hover:text-amber-600">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

