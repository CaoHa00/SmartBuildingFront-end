import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image
            src="/icon/logo-15yrs.svg"
            alt="EIU Logo"
            width={120}
            height={120}
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">Reset Password</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border text-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
