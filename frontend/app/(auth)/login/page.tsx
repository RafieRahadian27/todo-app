import Link from "next/link";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Login
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          Silakan masuk ke akun Anda
        </p>

        {/* Form Komponen */}
        <LoginForm />

        <div className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline"
          >
            Daftar di sini
          </Link>
        </div>
      </div>
    </main>
  );
}