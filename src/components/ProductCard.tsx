import Link from "next/link";
import { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  const price = ((product.priceCents ?? 0) / 100).toFixed(2);
  return (
    <article className="bg-white border rounded-md overflow-hidden shadow-sm">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="h-48 bg-gray-100 flex items-center justify-center">
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
      </Link>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm font-semibold">${price}</div>
          <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
