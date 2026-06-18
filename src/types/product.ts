export type Product = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  priceCents: number;
  currency?: string;
  images?: string[];
  inventory?: number;
};
