"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-3">
          Terjadi Kesalahan
        </h1>

        <p className="text-gray-600 mb-6">
          Maaf, terjadi kesalahan saat memuat halaman.
        </p>

        <button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition"
        >
          Coba Lagi
        </button>
      </div>
    </main>
  );
}