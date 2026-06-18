import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold">
              E-Commerce
            </Link>
            <nav className="hidden md:flex gap-4 text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">
                Shop
              </Link>
              <Link href="/account/orders" className="hover:text-gray-900">
                Orders
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <input
                aria-label="Search"
                className="border rounded-md px-3 py-1 text-sm"
                placeholder="Search products"
              />
            </div>

            <Link
              href="/cart"
              className="relative inline-flex items-center p-2 rounded-md hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                />
              </svg>
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium leading-none text-white bg-red-600 rounded-full">
                0
              </span>
            </Link>

            <Link
              href="/auth/signin"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
