# AGENTS.md — E-Commerce Next.js Project Guide

AI agents use this file to understand project structure, conventions, and development patterns. Updates here apply to all AI-assisted coding sessions.

---

## 1. Project Overview

**Project**: E-Commerce Platform  
**Tech Stack**:

- Framework: Next.js 14+ (App Router)
- Language: TypeScript (strict mode)
- Database: TBD (Prisma recommended for ORM)
- Styling: TBD (Tailwind CSS recommended)
- State Management: React Context + Server Components
- Testing: Jest + React Testing Library (recommended)

**Key Characteristics**:

- Server-first architecture using Next.js App Router
- Type-safe development with strict TypeScript
- API routes for backend logic
- Full-stack features (authentication, payments, inventory)
- Database integration for products, users, orders, cart

---

## 2. The 5-Phase Development Methodology

Every feature or task should be broken into these 5 phases. When implementing features, follow them sequentially:

### Phase 1: Specification & Schema Design

- Write user stories and acceptance criteria
- Design database schema (Prisma schema updates, migrations)
- Define API contract (request/response shapes)
- Create TypeScript interfaces/types in `types/` directory
- Update `schema.prisma` if adding new entities
- **Deliverable**: Schema file, type definitions, API documentation

### Phase 2: Backend Setup (API Routes & Database)

- Create API routes in `app/api/[feature]/` directory
- Implement database queries/mutations using ORM
- Set up error handling and validation (middleware, try-catch blocks)
- Configure environment variables in `.env.local`
- Test API endpoints with cURL or Postman
- **Deliverable**: Working API routes with full CRUD operations

### Phase 3: Frontend Components & UI

- Create reusable UI components in `components/` directory
- Build layout components in `app/[feature]/` directories
- Implement form components with validation
- Add client-side state management if needed (React Context)
- Use Server Components by default, mark interactive parts with "use client"
- **Deliverable**: Styled, functional UI components

### Phase 4: Integration & State Management

- Connect frontend components to API routes
- Implement data fetching with `fetch()` or client libraries
- Add real-time state updates (optimistic updates for carts, favorites)
- Handle loading, error, and success states
- Implement authentication flow if needed
- **Deliverable**: Full end-to-end feature working

### Phase 5: Testing, Optimization & Deployment

- Write unit tests for utilities, hooks, components
- Write integration tests for API routes
- Performance optimization (image optimization, code splitting)
- Security review (input validation, CORS, CSP headers)
- Staging deployment and final testing
- **Deliverable**: Tested, optimized, production-ready code

---

## 3. Build & Development Commands

```bash
# Development
npm run dev                    # Start dev server on http://localhost:3000

# Building & Production
npm run build                  # Compile TypeScript, optimize for production
npm start                      # Run production server

# Database & Migrations
npx prisma migrate dev         # Create and apply migrations (dev only)
npx prisma generate           # Generate Prisma client after schema changes
npx prisma studio             # Open visual database explorer

# Testing
npm run test                   # Run all tests with Jest
npm run test:watch            # Watch mode for tests
npm run test:coverage         # Generate coverage report

# Linting & Formatting
npm run lint                   # Run ESLint
npm run lint:fix              # Auto-fix linting issues
npm run format                # Format code with Prettier

# Type Checking
npm run type-check            # Run TypeScript compiler in check-only mode
```

---

## 4. Folder Structure & Conventions

```
E-Commerce/
├── app/                      # Next.js App Router
│   ├── api/                  # Backend API routes
│   │   ├── products/         # Product endpoints
│   │   ├── cart/             # Cart endpoints
│   │   ├── orders/           # Order endpoints
│   │   ├── auth/             # Authentication endpoints
│   │   └── users/            # User management endpoints
│   ├── products/             # Product listing/detail pages
│   ├── cart/                 # Cart page
│   ├── checkout/             # Checkout flow
│   ├── account/              # User account pages
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
│
├── components/               # Reusable React components
│   ├── ProductCard.tsx       # Example: Product card component
│   ├── Cart/                 # Cart-related components
│   ├── Checkout/             # Checkout-related components
│   ├── Auth/                 # Auth-related components
│   └── Common/               # Shared UI (Header, Footer, Navigation)
│
├── types/                    # TypeScript type definitions
│   ├── product.ts           # Product types
│   ├── user.ts              # User types
│   ├── order.ts             # Order types
│   ├── cart.ts              # Cart types
│   └── common.ts            # Shared types (API responses, errors)
│
├── lib/                      # Utility functions
│   ├── api.ts               # API client functions
│   ├── auth.ts              # Authentication utilities
│   ├── validation.ts        # Input validation helpers
│   ├── formatting.ts        # String/date formatting utilities
│   └── db.ts                # Database utilities (if not using Prisma directly)
│
├── hooks/                    # Custom React hooks
│   ├── useCart.ts           # Cart state and logic
│   ├── useFetch.ts          # Data fetching hook
│   ├── useAuth.ts           # Authentication hook
│   └── useLocalStorage.ts   # LocalStorage persistence hook
│
├── context/                  # React Context for state management
│   ├── CartContext.tsx       # Cart state provider
│   ├── AuthContext.tsx       # Auth state provider
│   └── index.ts              # Export all contexts
│
├── public/                   # Static assets (images, fonts, etc.)
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── prisma/                   # Database schema and migrations
│   ├── schema.prisma        # Prisma schema definition
│   ├── seed.ts              # Database seed script
│   └── migrations/          # Auto-generated migration files
│
├── styles/                   # Global styles
│   └── globals.css          # Global Tailwind directives
│
├── .env.local               # Local environment variables (DO NOT COMMIT)
├── .env.example             # Example environment variables (commit this)
├── .gitignore               # Git ignore patterns
├── .eslintrc.json           # ESLint configuration
├── .prettierrc               # Prettier configuration
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration (if using)
├── jest.config.js           # Jest testing configuration
├── package.json             # Dependencies and scripts
├── package-lock.json        # Locked dependency versions
├── README.md                # Project documentation
└── AGENTS.md                # This file
```

**Key Rules**:

- **File naming**: Use `camelCase` for components, utilities, and hooks; `UPPER_CASE` for constants
- **Type files**: Each domain (products, users, orders) has its own `.ts` file in `types/`
- **API routes**: Group related endpoints by domain (all product routes under `api/products/`)
- **Components**: Organize by feature/domain when possible (e.g., `components/Cart/`, `components/Auth/`)
- **Server vs. Client**: Use Server Components by default; add `"use client"` only where interactivity is needed

---

## 5. Key Development Patterns

### Server Components (Default)

```typescript
// app/products/page.tsx - Server Component (fetches data server-side)
export default async function ProductsPage() {
  const products = await fetchProducts();
  return <div>{/* render products */}</div>;
}
```

### Client Components (Interactive)

```typescript
// components/AddToCart.tsx - Client Component (needs interactivity)
"use client";
import { useState } from "react";

export default function AddToCart({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  // ... event handlers, state management
}
```

### API Routes with Validation

```typescript
// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Validate input
    if (!body.productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 },
      );
    }
    // Process request
    const result = await addToCart(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### Context for State Management

```typescript
// context/CartContext.tsx
"use client";
import { createContext, useState, useContext, ReactNode } from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
```

### Type-Safe API Calls

```typescript
// lib/api.ts
import { Product, Order } from "@/types";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function createOrder(data: Order): Promise<Order> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}
```

---

## 6. E-Commerce Specific Conventions

### Product Management

- **Products table**: id, name, description, price, stock, category, images, createdAt, updatedAt
- **API endpoints**: `GET /api/products` (list), `GET /api/products/[id]` (detail), `POST /api/products` (admin), `PUT /api/products/[id]` (admin), `DELETE /api/products/[id]` (admin)
- **Inventory**: Track stock in database; prevent overselling with database constraints
- **Images**: Store URLs in database; use Next.js `Image` component for optimization

### Cart & Checkout

- **Cart state**: Store in React Context or database (depends on requirements)
- **Cart persistence**: Use localStorage for anonymous users; database for logged-in users
- **Checkout flow**: Product selection → Cart review → Shipping → Payment → Confirmation
- **Order creation**: Atomic transaction (verify stock, create order, clear cart, send confirmation)

### User Management & Authentication

- **Auth pattern**: JWT tokens or session-based (NextAuth.js recommended)
- **Protected routes**: Use middleware to check authentication before rendering
- **User types**: `User { id, email, password, name, address, createdAt }`
- **Passwords**: Hash with bcrypt before storing; never log plaintext passwords

### Payment Integration

- **Pattern**: Never store credit cards; use third-party providers (Stripe, PayPal)
- **API calls**: Always use server-side to avoid exposing keys
- **Webhooks**: Set up webhook handlers to receive payment confirmations

---

## 7. Common Pitfalls & Troubleshooting

### Pitfall 1: Mixing Server & Client Components Incorrectly

❌ **Wrong**: Fetching data inside a Client Component  
✅ **Right**: Fetch on server, pass data as props to Client Component

### Pitfall 2: Exposing API Keys

❌ **Wrong**: Storing API keys in `.env` without prefix (visible to browser)  
✅ **Right**: Use `NEXT_PUBLIC_` only for client-safe keys; keep sensitive keys server-side

### Pitfall 3: Not Handling Loading/Error States

❌ **Wrong**: Showing undefined data if fetch fails  
✅ **Right**: Always render `loading`, `error`, and `success` states explicitly

### Pitfall 4: Overselling Products

❌ **Wrong**: Checking stock in frontend, hoping backend respects it  
✅ **Right**: Use database constraints and transactions; verify stock again during checkout

### Pitfall 5: Not Revalidating Cache

❌ **Wrong**: Stale product data after updates  
✅ **Right**: Use `revalidatePath()` or `revalidateTag()` after mutations

**Solutions**:

- Reference [Next.js Documentation: Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- Reference [Next.js Documentation: Caching](https://nextjs.org/docs/app/building-your-application/caching)
- Reference [Security Best Practices](https://nextjs.org/docs/app/building-your-application/security)

---

## 8. Environment Variables Template

Create `.env.local` (do not commit; use `.env.example` for documentation):

```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"

# Authentication (if using NextAuth.js or similar)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Payment Provider (e.g., Stripe)
STRIPE_SECRET_KEY="sk_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."

# API Keys (server-side only, no NEXT_PUBLIC_ prefix)
SENDGRID_API_KEY="SG..."

# Public Configuration (safe for browser)
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_NAME="E-Commerce Platform"
```

---

## 9. External References (Do Not Duplicate)

- [Next.js Official Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma ORM Documentation](https://www.prisma.io/docs/)
- [React Best Practices](https://react.dev)
- [Tailwind CSS (if used)](https://tailwindcss.com/docs)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

---

## 10. How AI Agents Should Use This File

When implementing features or fixing issues:

1. **Consult Phase Methodology**: Break tasks into the 5 phases above
2. **Follow Folder Structure**: Place files in appropriate directories as specified
3. **Use Key Patterns**: Reference Section 5 for code examples (Server/Client components, API routes, Context, type-safe calls)
4. **Check E-Commerce Conventions**: Section 6 documents patterns for products, cart, auth, payments
5. **Avoid Pitfalls**: Review Section 7 before implementing features
6. **External Docs**: Link to official docs in Section 9 rather than guessing implementation details

---

## Last Updated

2026-06-16

For questions or updates to this guide, refer to project maintainers or the repository README.
