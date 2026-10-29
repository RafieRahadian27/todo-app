import Link from "next/link";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Register
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          Buat akun baru
        </p>

        {/* Form Komponen */}
        <RegisterForm />

        <div className="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Login di sini
          </Link>
        </div>
      </div>
    </main>
  );
}