import Head from "next/head";
import ProductGrid from "../components/ProductGrid";
import { sampleProducts } from "../lib/sample-products";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tanite Sales</title>
      </Head>
      <main className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Tanite Sales</h1>
          <ProductGrid products={sampleProducts} />
        </div>
      </main>
    </>
  );
}
