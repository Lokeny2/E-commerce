import type { NextApiRequest, NextApiResponse } from "next";
import { readJson, writeJson } from "../../lib/data";

const CART_FILE = "cart.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const cart = await readJson(CART_FILE, { items: [] });
    return res.status(200).json(cart);
  }

  if (req.method === "POST") {
    const payload = req.body;
    await writeJson(CART_FILE, payload);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
}
