# Database Design: MongoDB Atlas

This document describes the MongoDB collections, document shapes, indexes, and example documents for the E-Commerce Starter app using MongoDB Atlas.

## Design Principles

- Schema flexibility: use a document model for products and orders while keeping clear fields for queries.
- Balance denormalization and references: store essential product snapshot data inside order line items for historical accuracy; reference `productId` for lookups when needed.
- Use indexes for read-heavy queries: product slug, categories, user email, order userId, and createdAt.

## Collections

- `users`
- `products`
- `carts`
- `orders`
- `sessions` (for NextAuth adapter if needed)
- `payments` (optional — or store payment info inside `orders`)

## Collections & Schemas

1. users

- Purpose: store user accounts and roles
- Indexes: `{ email: 1 }` (unique), `{ role: 1 }`
- Fields:
  - `_id`: ObjectId
  - `name`: string
  - `email`: string
  - `image`: string | null
  - `role`: string (e.g., `user` or `admin`)
  - `createdAt`: ISODate
  - `metadata`: object (flexible for OAuth provider info)

- Example:

```
{
  _id: ObjectId("64f1a6..."),
  name: "Alex Learner",
  email: "alex@example.com",
  image: null,
  role: "user",
  createdAt: ISODate("2026-06-17T12:00:00Z"),
  metadata: { provider: "google", providerAccountId: "..." }
}
```

2. products

- Purpose: catalog of sellable products
- Indexes: `{ slug: 1 }` (unique), `{ categories: 1 }`, `{ title: 1 }`
- Fields:
  - `_id`: ObjectId
  - `title`: string
  - `slug`: string (unique, URL-safe)
  - `description`: string
  - `priceCents`: number
  - `currency`: string (e.g., `USD`)
  - `images`: [string] (URLs)
  - `inventory`: number
  - `metadata`: object (tags, vendor info)
  - `createdAt`: ISODate
  - `updatedAt`: ISODate

- Example:

```
{
  _id: ObjectId("64f1a7..."),
  title: "Cozy Hoodie",
  slug: "cozy-hoodie",
  description: "A warm, comfortable hoodie.",
  priceCents: 4999,
  currency: "USD",
  images: ["https://.../hoodie1.jpg"],
  inventory: 120,
  metadata: { sizes: ["S","M","L"], color: "navy" },
  createdAt: ISODate("2026-06-17T12:00:00Z"),
  updatedAt: ISODate("2026-06-17T12:00:00Z")
}
```

3. carts

- Purpose: temporary shopping carts for users or anonymous sessions
- Indexes: `{ userId: 1 }`, `{ sessionId: 1 }`
- Fields:
  - `_id`: ObjectId
  - `userId`: ObjectId | null
  - `sessionId`: string | null
  - `items`: [{ productId: ObjectId, quantity: number, priceCents: number, snapshot: { title, images } }]
  - `updatedAt`: ISODate

- Example:

```
{
  _id: ObjectId("64f1a8..."),
  userId: ObjectId("64f1a6..."),
  sessionId: null,
  items: [ { productId: ObjectId("64f1a7..."), quantity: 2, priceCents: 4999, snapshot: { title: "Cozy Hoodie", images: ["...jpg"] } } ],
  updatedAt: ISODate("2026-06-17T12:10:00Z")
}
```

4. orders

- Purpose: record completed purchases and payment status
- Indexes: `{ userId: 1 }`, `{ status: 1 }`, `{ createdAt: -1 }`
- Fields:
  - `_id`: ObjectId
  - `userId`: ObjectId | null
  - `items`: [{ productId: ObjectId, quantity: number, priceCents: number, snapshot: { title, images } }]
  - `totalCents`: number
  - `currency`: string
  - `status`: string (e.g., `pending`, `paid`, `shipped`, `cancelled`)
  - `payment`: { provider: "stripe", providerPaymentId: string, receiptUrl?: string }
  - `shipping`: { address fields }
  - `createdAt`: ISODate

- Example:

```
{
  _id: ObjectId("64f1a9..."),
  userId: ObjectId("64f1a6..."),
  items: [ { productId: ObjectId("64f1a7..."), quantity: 2, priceCents: 4999, snapshot: { title: "Cozy Hoodie" } } ],
  totalCents: 9998,
  currency: "USD",
  status: "paid",
  payment: { provider: "stripe", providerPaymentId: "cs_test_...", receiptUrl: "https://..." },
  shipping: { name: "Alex Learner", address1: "123 Main St", city: "Town", postalCode: "12345" },
  createdAt: ISODate("2026-06-17T12:15:00Z")
}
```

5. sessions (NextAuth)

- If using NextAuth with MongoDB adapter, follow its expected schema for sessions, accounts, and verification tokens. These collections are usually named `sessions`, `accounts`, and `verificationTokens`.

6. payments (optional)

- Purpose: track raw payment events or webhooks separately from `orders` if you want an event-sourced approach.
- Fields: `provider`, `eventType`, `payload`, `receivedAt`

## Indexes & Performance

- Add unique index on `products.slug` for fast product page lookups.
- Compound index on `products.categories` + `priceCents` for filtered queries.
- TTL index on anonymous `carts.updatedAt` to auto-expire old anonymous carts (e.g., expire after 30 days).
- Ensure `orders.createdAt` has a descending index for fast admin order lists.

## Migrations & Schema Evolution

- MongoDB is schemaless; use Mongoose schemas or application-level validation to enforce shape.
- Track schema changes in migration scripts or code-based migrations. Consider a `migrations` folder with migration scripts executed via npm scripts.

## Adapter Choices

- NextAuth: use `@next-auth/mongodb-adapter` or the Prisma adapter if you prefer Prisma with MongoDB (note Prisma limitations).
- ORM/ODM: prefer `Mongoose` for full MongoDB capabilities; `Prisma` is an option for type-safety but with trade-offs listed in PRD.

## Seed Data

- Provide a `prisma/seed` or `scripts/seed.js` (Mongoose) script to insert sample products and an admin user for local development.

## Security

- Never store raw card data; use Stripe and store only payment references and receipts.
- Use environment variables for connection strings and API keys. Limit Atlas IP access during development, or add your dev IP and use `.env.local`.

## Backup & Production

- Use Atlas automated backups and follow retention policies.
- Monitor indexes and slow queries via Atlas performance insights.

## Notes

This schema is a starting point and should be adapted as you build features. For complex reporting or analytics, consider a separate analytics store or periodic ETL into a SQL warehouse.

# Database Design — MongoDB Atlas

This document describes the database structure for the E-Commerce Starter app using MongoDB Atlas. It covers collections, document schemas, indexes, relationships (denormalization choices), and example documents.

## Design Principles

- Use document models where product and order data can be denormalized for read performance.
- Keep user authentication data minimal in the DB when using NextAuth; store provider IDs and links to user profile info.
- Use referencing for large or frequently updated subdocuments (e.g., inventory tracking) and embed for read-optimized snapshots (e.g., order line items).
- Add indexes on fields used in queries and lookups: `slug`, `email`, `userId`, `createdAt`, and `status`.

## Collections

1. `users`
2. `products`
3. `carts`
4. `orders`
5. `sessions` (optional — NextAuth may manage sessions)
6. `payments` (optional — store Stripe webhooks/records)
7. `categories` (optional)

8. `users`

---

- Purpose: store user profiles and authentication links.
- Indexes: `{ email: 1 }` (unique), `{ createdAt: -1 }`

Sample schema (JSON-style)

```
{
  _id: ObjectId,
  name: string,
  email: string,
  role: "customer" | "admin",
  avatarUrl?: string,
  createdAt: ISODate,
  updatedAt?: ISODate,
  // NextAuth fields (if using MongoDB adapter)
  emailVerified?: ISODate,
  providers?: [
    { provider: 'google' | 'github' | 'email', providerId: string }
  ]
}
```

2. `products`

---

- Purpose: catalog of products
- Indexes: `{ slug: 1 }` (unique), `{ name: "text", description: "text" }` for search

Schema

```
{
  _id: ObjectId,
  name: string,
  slug: string,
  description: string,
  priceCents: number,
  currency: string, // e.g., 'USD'
  images: [string],
  inventory: number,
  categories: [ObjectId], // references to categories
  attributes?: { key: string, value: string }[],
  createdAt: ISODate,
  updatedAt: ISODate,
  isPublished: boolean
}
```

3. `carts`

---

- Purpose: store user's cart (can be session-based or persistent)
- Indexes: `{ userId: 1 }`, `{ sessionId: 1 }`

Schema

```
{
  _id: ObjectId,
  userId?: ObjectId, // nullable for guest carts
  sessionId?: string, // client session identifier
  items: [
    {
      productId: ObjectId,
      name: string, // denormalized snapshot
      priceCents: number, // denormalized
      quantity: number,
      image?: string
    }
  ],
  updatedAt: ISODate,
  createdAt: ISODate
}
```

4. `orders`

---

- Purpose: store completed orders and their snapshots
- Indexes: `{ userId: 1 }`, `{ status: 1 }`, `{ createdAt: -1 }`

Schema (embed line items as snapshot)

```
{
  _id: ObjectId,
  userId: ObjectId,
  status: 'created' | 'paid' | 'fulfilled' | 'cancelled',
  totalCents: number,
  currency: string,
  lineItems: [
    {
      productId: ObjectId,
      name: string,
      priceCents: number,
      quantity: number,
      snapshot: { images: [string], attributes?: [] }
    }
  ],
  shipping: {
    name: string,
    addressLine1: string,
    city: string,
    postalCode: string,
    country: string
  },
  payment: {
    provider: 'stripe',
    providerPaymentId: string,
    paidAt?: ISODate
  },
  createdAt: ISODate,
  updatedAt: ISODate
}
```

5. `payments` (optional)

---

- Purpose: store payment events, Stripe webhooks, and reconciliation info
- Indexes: `{ providerPaymentId: 1 }`

```
{
  _id: ObjectId,
  orderId: ObjectId,
  provider: 'stripe',
  providerPaymentId: string,
  amountCents: number,
  status: 'pending' | 'succeeded' | 'failed',
  rawWebhookPayload: object,
  createdAt: ISODate
}
```

6. `categories` (optional)

---

- Purpose: product categorization
- Indexes: `{ slug: 1 }`

```
{
  _id: ObjectId,
  name: string,
  slug: string,
  description?: string
}
```

## Indexing & Performance Notes

- Add compound indexes for common query patterns (e.g., `{ categories: 1, isPublished: 1 }`).
- Use TTL indexes for ephemeral collections (e.g., password reset tokens).
- For text search, consider MongoDB Atlas Search for better relevance and analyzers.

## Transactions & Consistency

- Use MongoDB transactions when updating multiple documents (e.g., reduce `inventory` and create `order`) and when atomicity matters; ensure the cluster supports transactions (replica set or sharded cluster with proper config).
- For scalability, consider eventual consistency patterns and idempotent webhook handlers.

## Schemas & Validation

- Use MongoDB schema validation rules (`$jsonSchema`) on collections to enforce required fields and types.
- Additionally, validate at the application level with Mongoose schemas or Zod/TypeScript for type-safety.

## Example Documents

- See the sample JSON-like documents above for `users`, `products`, `carts`, and `orders`.

## Migration Strategy

- Use `mongodump`/`mongorestore` for full dumps.
- Maintain small migration scripts (Node.js scripts using the MongoDB driver) for schema changes and data backfills.

## Security

- Use environment variables for Atlas connection string; never commit secrets.
- Restrict Atlas network access to known IPs or use VPC peering.
- Enable encryption at rest and TLS in Atlas by default.

## Backups & Monitoring

- Rely on Atlas automated backups (configure retention accordingly).
- Monitor slow queries and add indexes as needed; use Atlas performance advisor for suggestions.

## Notes on Using Prisma vs Mongoose

- Prisma: supported for MongoDB but some features are limited (see PRD notes). Use Prisma if you want TypeScript-first models and query API; accept limitations around migrations and advanced relations.
- Mongoose: mature ODM with rich schema, middleware, and plugins; recommended if you need full MongoDB feature coverage and flexible schema modeling.

## Next Steps

- Choose whether to use Prisma or Mongoose for implementation.
- I can scaffold models and example seed scripts for either option. Which do you prefer?
