import { SignupForm } from "@/components/signup-form"
import AuthBanner from "../components/AuthBanner"

const Signup = () => {
  return (
    <div className="flex">
        <div className="w-1/2">
            <AuthBanner />
        </div>
        <div className="w-1/2">
            <div className="text-center flex flex-col justify-center min-h-lvh p-32">
                <SignupForm />
            </div>
        </div>
    </div>
  )
}

export default Signup