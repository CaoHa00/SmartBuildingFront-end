import { RegisterForm } from "./_components/register-form"

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-900 flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-md px-4">
        <RegisterForm />
      </div>
    </div>
  )
}
