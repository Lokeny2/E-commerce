import { Product } from "../types/product";

export const sampleProducts: Product[] = [
  {
    id: "p1",
    title: "Cozy Hoodie",
    slug: "cozy-hoodie",
    description: "A warm, comfortable hoodie.",
    priceCents: 4999,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1520975910053-50d0f0f0b0c0?w=1200&q=80&auto=format&fit=crop",
    ],
    inventory: 120,
  },
  {
    id: "p2",
    title: "Classic Tee",
    slug: "classic-tee",
    description: "Soft cotton t-shirt.",
    priceCents: 1999,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1520975910053-50d0f0f0b0c0?w=1200&q=80&auto=format&fit=crop",
    ],
    inventory: 200,
  },
  {
    id: "p3",
    title: "Denim Jacket",
    slug: "denim-jacket",
    description: "Stylish denim jacket.",
    priceCents: 8999,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80&auto=format&fit=crop",
    ],
    inventory: 50,
  },
];
