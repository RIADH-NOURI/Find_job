import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import { useForgotPasswordMutation } from "@/redux/apis/public/auth";


 const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email invalide"),
});


type LoginProps = {
  setForgotPassword: (value: boolean) => void,
}
export default function ForgotPassword({setForgotPassword}: LoginProps) {
    const [forgotPasswordMutation] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: { email: string}) => {
    try {
      const response = await forgotPasswordMutation(data);
      console.log(response);
      
      if (response.error?.status === 404) {
        alert("email is invalid."); 
        return;
      }
      alert("Check your email for further instructions.");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-white max-[500px]:items-start justify-start">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6">
        <h1 className="text-2xl mb-6 text-center text-text-color">Forgot Password</h1>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-text-color">Email</label>
          <div className="flex items-center p-2 border rounded-lg focus-within:border-primary-color">
            <UserRound className="text-secondary-color mr-2" />
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full outline-none"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
         {/* Forgot Password */}
         <div className="mb-4 text-right">
          <span className="text-blue-600 text-sm hover:underline cursor-pointer" onClick={() => setForgotPassword(false)}>
            go back to login?
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-primary-color text-white p-2 rounded-lg mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}