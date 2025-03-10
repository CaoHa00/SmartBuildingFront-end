import Image from "next/image"
import { RegisterForm } from "./_components/register-form"

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 w-full max-w-md px-4">
        <Image
          src="/logo-15yrs.svg"
          alt="EIU Logo"
          width={60}
          height={60}
        />
        <RegisterForm />
      </div>
    </div>
  )
}
