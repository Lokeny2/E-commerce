import { useEffect, useState } from "react";
import { Product } from "../types/product";

export type CartItem = {
  productId: string;
  title: string;
  priceCents: number;
  quantity: number;
  image?: string;
};

const STORAGE_KEY = "cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (err) {
      console.error("Failed to read cart from localStorage", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Failed to write cart to localStorage", err);
    }
  }, [items]);

  function add(item: CartItem) {
    setItems((prev) => {
      const found = prev.find((p) => p.productId === item.productId);
      if (found) {
        return prev.map((p) =>
          p.productId === item.productId
            ? {
                ...p,
                quantity: Math.min((p.quantity || 0) + item.quantity, 9999),
              }
            : p,
        );
      }
      return [...prev, item];
    });
  }

  function remove(productId: string) {
    setItems((prev) => prev.filter((p) => p.productId !== productId));
  }

  function update(productId: string, quantity: number) {
    setItems((prev) =>
      prev.map((p) => (p.productId === productId ? { ...p, quantity } : p)),
    );
  }

  function clear() {
    setItems([]);
  }

  const totalCents = items.reduce((s, i) => s + i.priceCents * i.quantity, 0);

  return { items, add, remove, update, clear, totalCents };
}
