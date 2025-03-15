"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRound, Lock, Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/schemas/loginSchema";
import ErrorAlert from "@/components/moleculles/errorAlert";
import { useState } from "react"; // Add useState for password visibility and error handling

type LoginProps = {
  setForgotPassword: (value: boolean) => void;
};

export default function Login({ setForgotPassword }: LoginProps) {
  const { login, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false); 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await login(data);
      // Handle specific errors from the login function
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex-1 flex items-center relative justify-center min-h-full bg-white max-[500px]:items-start justify-start">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6">
        <h1 className="text-2xl mb-6 text-center text-text-color">Welcome to my application</h1>

        {/* Display ErrorAlert if there's an error */}
        {error && <ErrorAlert />}

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

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-text-color">Mot de passe</label>
          <div className="flex items-center p-2 border rounded-lg focus-within:border-primary-color">
            <Lock className="text-secondary-color mr-2" />
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Password"
              {...register("password")}
              className="w-full outline-none"
            />
            {/* Eye Icon to toggle password visibility */}
            <button
              type="button"
              className="text-secondary-color hover:text-primary-color focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Forgot Password */}
        <div className="mb-4 text-right">
          <span
            className="text-blue-600 text-sm hover:underline cursor-pointer"
            onClick={() => setForgotPassword(true)}
          >
            Forgot password?
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-primary-color text-white p-2 rounded-lg mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}