import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import Head from "next/head";
import { sampleProducts } from "../../lib/sample-products";
import { Product } from "../../types/product";

type Props = {
  product: Product;
};

export default function ProductPage({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const price = ((product.priceCents ?? 0) / 100).toFixed(2);

  function addToCart() {
    try {
      const raw = localStorage.getItem("cart");
      const cart = raw ? JSON.parse(raw) : [];
      const existing = cart.find((i: any) => i.productId === product.id);
      if (existing) {
        existing.quantity = Math.min(
          (existing.quantity || 0) + quantity,
          product.inventory ?? 9999,
        );
      } else {
        cart.push({
          productId: product.id,
          title: product.title,
          priceCents: product.priceCents,
          quantity,
          image: product.images?.[0],
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  }

  return (
    <>
      <Head>
        <title>{product.title} — E-Commerce</title>
      </Head>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="h-96 bg-gray-100 flex items-center justify-center overflow-hidden">
              {product.images && product.images.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-gray-400">No image</div>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p className="text-gray-600 mt-2">${price}</p>
            <p className="mt-4 text-gray-700">{product.description}</p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  className="px-3 py-1"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <input
                  className="w-12 text-center"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value || 1)))
                  }
                />
                <button
                  className="px-3 py-1"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={addToCart}
              >
                Add to cart
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              {product.inventory} in stock
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = sampleProducts.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const product = sampleProducts.find((p) => p.slug === slug) || null;
  if (!product) return { notFound: true };
  return { props: { product } };
};
