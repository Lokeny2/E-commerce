# UI Components & Pages — E-Commerce Starter

Design reference: https://pin.it/5lFaRQOCd

## Purpose

Break down the Pinterest design into concrete pages and React/Tailwind components we will implement for the frontend.

## Pages (top-level)

- `/` — Home / Product gallery (grid)
- `/product/[slug]` — Product detail
- `/cart` — Cart page (and cart drawer on all pages)
- `/checkout` — Checkout (mock payments)
- `/auth/signin` and `/auth/signup` — Authentication
- `/account/orders` — Order history & tracking
- `/admin` — Admin dashboard
  - `/admin/products` — Product list + CRUD
  - `/admin/products/new` and `/admin/products/[id]/edit` — Product form (Cloudinary upload)
  - `/admin/orders` — Orders list + status updates
  - `/admin/users` — Admin user management (promote/remove admins)

## Shared/Layout Components

- `Layout` — global layout wrapper (header, footer, meta)
- `Header` — logo, search, nav links, cart icon (badge), auth menu
- `Footer` — links and copyright
- `Container` — responsive page container

## Product UI Components

- `ProductCard` — shows image, title, price, quick add button
  - Props: `{ product: Product }`
- `ProductGrid` — grid of `ProductCard`
  - Props: `{ products: Product[] }`
- `ProductGallery` — carousel/thumbnails for product images
  - Props: `{ images: string[] }`
- `ProductDetails` — title, price, description, attributes, add-to-cart
  - Props: `{ product: Product }`

## Cart & Checkout Components

- `CartDrawer` / `CartPage` — list items, quantity selector, remove item
  - Cart item shape: `{ productId, title, priceCents, quantity, image }`
- `CartItem` — single line with quantity controls
- `QuantitySelector` — +/- buttons or input
- `OrderSummary` — subtotal, taxes mock, shipping, total
- `CheckoutForm` — shipping address and contact fields
- `MockPayment` — fake payment button that returns success

## Auth Components

- `AuthForm` — sign-in and sign-up variants
- `OAuthButtons` — Google/GitHub sign-in buttons
- `ProtectedRoute` HOC / middleware for pages requiring auth

## Admin Components

- `AdminLayout` — admin sidebar and topnav
- `AdminProductList` — table/grid of products with edit/delete
- `AdminProductForm` — form to create/edit product with Cloudinary image uploader
  - Fields: title, slug, description, price, currency, inventory, categories, images
- `AdminOrders` — orders table with status dropdown and view details
- `AdminUsers` — list of users with promote/demote to admin

## Utilities & UI Primitives

- `Button`, `IconButton`
- `Input`, `Select`, `Textarea`, `Label`, `FormRow`
- `Modal` and `ConfirmDialog`
- `Toast` / `Notification` system
- `Spinner` / `Skeleton` components for loading states

## Hooks & Client Logic

- `useCart()` — add/remove/update, persisted to backend or localStorage
- `useAuth()` — helper for client auth state (wraps NextAuth)
- `useProducts()` — product listing & search
- `useAdmin()` — admin-only helpers

## API & Integration Points (frontend)

- `GET /api/products` — fetch product list
- `GET /api/products/[id]` — fetch a product
- `POST /api/cart` — add/update cart
- `GET /api/cart` — fetch cart
- `POST /api/checkout` — create order (mock payment)
- `POST /api/admin/products` — admin create product (server will upload to Cloudinary)
- `PUT /api/admin/products/[id]` — admin edit product
- `DELETE /api/admin/products/[id]` — admin delete product
- `POST /api/auth/*` — NextAuth endpoints (handled by NextAuth)

## File Structure Suggestions

- `src/pages/*` — Next.js pages
- `src/components/*` — reusable components
- `src/components/admin/*` — admin components
- `src/lib/*` — helpers (api clients, cloudinary, currency helpers)
- `src/hooks/*` — react hooks
- `src/styles/*` — Tailwind config and global styles
- `src/types/*` — TypeScript types (Product, CartItem, Order, User)

## Accessibility & Responsiveness

- Use semantic HTML for lists, forms, headings.
- Keyboard focus states for interactive controls.
- Ensure color contrast meets WCAG 2.1 AA.
- Mobile-first responsive breakpoints matching the design grid.

## Cloudinary & Image Uploads

- Use a server-side signed upload (API route) to accept and forward images to Cloudinary.
- Store Cloudinary URLs in `products.images`.

## Styling Notes

- Build with Tailwind CSS using design tokens for spacing and colors.
- Create component variants for primary/secondary CTAs and product badges.

## Next Steps

- I can scaffold the Next.js app with TypeScript and Tailwind and generate component files for the items above.
- Which would you like first: scaffold the project or generate the key components (`Layout`, `Header`, `ProductCard`, `CartDrawer`)?
