import Image from "next/image";
import { LoginForm } from "./_components/login-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
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
        <div className="flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="text-sm text-gray-300">
              Enter your credentials to sign in to your account
            </p>
          </div>
          <div className="grid gap-6">
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label className="text-white" htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className="text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-white" htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    className="text-white"
                  />
                </div>
                <Button className="text-white">Sign In</Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-blue-950 px-2 text-gray-300">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="text-white">
                GitHub
              </Button>
              <Button variant="outline" className="text-white">
                Google
              </Button>
            </div>
          </div>
          <p className="px-8 text-center text-sm text-gray-300">
            <Link href="/register" className="hover:text-white underline underline-offset-4">
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
