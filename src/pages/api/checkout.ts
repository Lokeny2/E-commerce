import type { NextApiRequest, NextApiResponse } from "next";
import { readJson, writeJson } from "../../lib/data";

const ORDERS_FILE = "orders.json";
const CART_FILE = "cart.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const { items } = req.body;
  if (!items || !Array.isArray(items))
    return res.status(400).json({ error: "invalid items" });

  const orders = await readJson(ORDERS_FILE, []);
  const id = `ord_${Date.now()}`;
  const order = {
    id,
    items,
    totalCents: items.reduce(
      (s: number, i: any) => s + i.priceCents * i.quantity,
      0,
    ),
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  await writeJson(ORDERS_FILE, orders);

  // clear cart
  await writeJson(CART_FILE, { items: [] });

  return res.status(200).json({ ok: true, orderId: id });
}
