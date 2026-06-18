import Link from "next/link";
import { useState } from "react";
import { useCart } from "../hooks/useCart";

export default function CartDrawer() {
  const { items, remove, update, totalCents } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center p-2 rounded-md hover:bg-gray-100"
      >
        Cart ({items.length})
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute right-0 top-0 w-full sm:w-96 h-full bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium">Your cart</h3>
            <div className="mt-4 space-y-4">
              {items.length === 0 && (
                <div className="text-sm text-gray-500">Cart is empty</div>
              )}
              {items.map((it) => (
                <div key={it.productId} className="flex items-center gap-3">
                  <img
                    src={it.image}
                    className="w-16 h-16 object-cover"
                    alt={it.title}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{it.title}</div>
                    <div className="text-sm text-gray-500">
                      ${(it.priceCents / 100).toFixed(2)}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        className="w-12 text-center"
                        value={String(it.quantity)}
                        onChange={(e) =>
                          update(
                            it.productId,
                            Math.max(1, Number(e.target.value || 1)),
                          )
                        }
                      />
                      <button
                        className="text-sm text-red-600"
                        onClick={() => remove(it.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm font-semibold">
                Subtotal <span>${(totalCents / 100).toFixed(2)}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href="/cart"
                  className="flex-1 text-center bg-gray-200 px-4 py-2 rounded-md"
                >
                  View cart
                </Link>
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
