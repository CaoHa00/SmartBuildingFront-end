import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo-15yrs.svg"
            alt="EIU Logo"
            width={60}
            height={60}
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Welcome Back</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center space-y-2">
          <a href="/forgot-password" className="block text-blue-600 hover:text-blue-800">Forgot password?</a>
          <p className="text-gray-600">Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-800">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
