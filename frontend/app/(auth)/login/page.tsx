import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./_components/login-form";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo-15yrs.svg"
            alt="EIU Logo"
            width={120}
            height={120}
          />
        </div>
        <LoginForm/>
      </div>
    </div>
  );
}
