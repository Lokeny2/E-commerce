import Head from "next/head";
import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const { items, update, remove, totalCents, clear } = useCart();

  async function handleCheckout() {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Order created: " + data.orderId);
        clear();
      } else {
        alert("Checkout failed");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout error");
    }
  }

  return (
    <>
      <Head>
        <title>Your Cart</title>
      </Head>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Your cart</h1>
        {items.length === 0 && (
          <div className="text-gray-500">Your cart is empty.</div>
        )}

        <div className="space-y-4">
          {items.map((it) => (
            <div
              key={it.productId}
              className="flex items-center gap-4 border rounded p-3"
            >
              <img
                src={it.image}
                className="w-20 h-20 object-cover"
                alt={it.title}
              />
              <div className="flex-1">
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-gray-500">
                  ${(it.priceCents / 100).toFixed(2)}
                </div>
              </div>
              <input
                className="w-16 text-center"
                value={String(it.quantity)}
                onChange={(e) =>
                  update(it.productId, Math.max(1, Number(e.target.value || 1)))
                }
              />
              <button
                className="text-red-600"
                onClick={() => remove(it.productId)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-lg font-semibold">
            Total: ${(totalCents / 100).toFixed(2)}
          </div>
          <div className="flex gap-2">
            <button
              className="bg-gray-200 px-4 py-2 rounded"
              onClick={() => clear()}
            >
              Clear
            </button>
            <button
              className="bg-blue-600 px-4 py-2 text-white rounded"
              onClick={handleCheckout}
            >
              Checkout (mock)
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
