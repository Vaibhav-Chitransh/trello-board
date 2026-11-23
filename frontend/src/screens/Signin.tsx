import { LoginForm } from "@/components/login-form"
import AuthBanner from "../components/AuthBanner"

const Signin = () => {
  return (
    <div className="flex">
        <div className="w-1/2">
            <AuthBanner />
        </div>
        <div className="w-1/2">
          <div className="text-center flex flex-col justify-center min-h-lvh p-32">
            <LoginForm />
          </div>
        </div>
    </div>
  )
}

export default Signin