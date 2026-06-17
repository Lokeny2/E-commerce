# Product Requirements Document (PRD)

Project: E-Commerce Starter (Next.js Full-Stack App)

## Purpose

Build a simple, production-ready e-commerce starter application using Next.js to help you learn full-stack web development. The app will demonstrate modern best practices including TypeScript, Tailwind CSS, server-side rendering, API routes, database integration, authentication, and deployment to Vercel.

## Goals

- Teach end-to-end Next.js development by example.
- Provide a minimal but complete e-commerce flow: product listing, product detail, cart, checkout, user accounts.
- Use industry-relevant tools: TypeScript, Prisma ORM, PostgreSQL (or SQLite for local dev), NextAuth for authentication, and Stripe for payments.

## Non-Goals

- Not intended as a fully-featured enterprise platform. Focus on clarity and learnability.

## Scope

MVP features:

- Public product catalog (list & detail pages)
- User accounts: sign up / sign in / passwordless or OAuth (Google/GitHub) via NextAuth
- Shopping cart persisted in session or database
- Checkout flow using Stripe (test mode)
- Admin dashboard (basic) to add/edit products (protected by auth)
- REST/GraphQL-like API routes (Next.js API routes) for cart, orders, and products

## User Stories

1. As a shopper, I can view a list of products so I can decide what to buy.
   - Acceptance: Product list shows name, price, thumbnail, and short description.
2. As a shopper, I can view product details so I can evaluate a product.
   - Acceptance: Product page shows images, full description, price, and add-to-cart button.
3. As a shopper, I can add/remove products to a cart and see the cart total.
   - Acceptance: Cart persists across pages and refreshes (session/local/db).
4. As a shopper, I can sign up or sign in to manage orders.
   - Acceptance: Users can authenticate using NextAuth and view past orders.
5. As a shopper, I can complete checkout using Stripe (test mode).
   - Acceptance: Checkout creates an order record and redirects to confirmation.
6. As an admin, I can create and edit products.
   - Acceptance: Admin-only pages where product CRUD works.

## Technical Requirements

- Framework: Next.js (latest stable)
- Language: TypeScript
- Styling: Tailwind CSS
- Database: PostgreSQL (production), SQLite for local dev
- ORM: Prisma
- Database (optional): MongoDB Atlas (managed) — alternative to Postgres for a document model
  - Notes: If you choose Atlas you can use either Mongoose (recommended for full MongoDB feature usage) or Prisma (MongoDB support available with some limitations).
- Authentication: NextAuth (email/passwordless + OAuth providers)
- Payments: Stripe (test mode)
- Deployment: Vercel
- Payment & Secrets: Use environment variables and `.env.local` for local dev

## MongoDB Atlas (optional) — Trade-offs

- Pros:
  - Flexible, schema-less document model for rapid iteration and denormalized data.
  - Managed, production-ready hosting with a free tier, backups, and monitoring.
  - Easy horizontal scaling and replica sets for high availability.

- Cons:
  - Less natural fit for strongly relational data (complex joins across orders, inventory, and users).
  - Transactions and multi-document consistency are more limited and can be more complex to design for.
  - Modeling highly relational operations may require denormalization or more application-side logic.

- Prisma-specific limitations (if using Prisma with MongoDB):
  - `prisma migrate` is not supported for MongoDB; use `prisma db push` or manage migrations manually.
  - Some advanced Prisma features (certain aggregations, groupBy, and complex relational queries) are restricted or behave differently.
  - Expect fewer first-class relational conveniences than with SQL providers.

- Recommendation:
  - Choose PostgreSQL + Prisma if you want strong relational guarantees, mature migrations, and full Prisma feature support (recommended for typical e-commerce flows).
  - Choose MongoDB Atlas if you prefer a document-oriented model, need flexible schemas, or want a managed DB quickly; use Mongoose for full MongoDB capabilities or Prisma if you accept the trade-offs.

## API Endpoints (examples)

- `GET /api/products` - list products
- `GET /api/products/[id]` - product details
- `POST /api/cart` - add item to cart
- `GET /api/cart` - get cart
- `POST /api/checkout` - create Stripe checkout session
- `GET /api/orders` - get user orders (auth required)

## Data Model (high-level)

- User: id, name, email, role
- Product: id, name, slug, description, priceCents, images, inventory
- CartItem: id, userId (nullable), productId, quantity
- Order: id, userId, totalCents, status, lineItems

## UX & Design

- Responsive layout (mobile-first)
- Clear CTAs for add-to-cart and checkout
- Accessible markup and semantic HTML

## Acceptance Criteria

- Able to run the app locally with `pnpm install` and `pnpm dev` (or `npm`/`yarn` equivalents)
- Developer guide in README with setup steps for local DB and Stripe test keys
- Basic test coverage for API routes and core utilities (optional but recommended)

## Milestones

1. Scaffold Next.js project with TypeScript & Tailwind
2. Implement product catalog & product pages
3. Add Prisma models and seed sample data
4. Implement auth with NextAuth
5. Implement cart and checkout with Stripe
6. Admin CRUD and deployment to Vercel

## Open Questions

- Do you prefer passwordless email sign-in or full email/password?
- Use SQLite for local dev only, or do you want a Dockerized PostgreSQL?

## Next Steps

- Confirm auth preference and local DB setup.
- Scaffold the Next.js app with the chosen stack.

Created by: GitHub Copilot
Date: 2026-06-17
