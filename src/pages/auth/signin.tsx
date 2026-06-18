import { useState } from "react";
import Head from "next/head";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

export default function SignIn() {
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    await signin(email, name);
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-xl font-semibold mb-4">Sign in</h1>
        <form onSubmit={handle} className="space-y-3">
          <div>
            <label className="block text-sm">Email</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm">Name (optional)</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
