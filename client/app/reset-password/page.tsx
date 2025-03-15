"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Lock } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useResetPasswordMutation } from '@/redux/apis/public/auth';

// ✅ Schema Validation
const schema = z
  .object({
    newPassword: z.string().min(6, "Le mot de passe doit avoir au moins 6 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromParams = searchParams.get('token');
    const typeFromParams = searchParams.get('type');

    if (tokenFromParams && typeFromParams) {
      setToken(tokenFromParams);
      setType(typeFromParams);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });


  const [resetPasswordApi] = useResetPasswordMutation();
  const onSubmit = async (data: FormData) => {
    if (!token || !type) {
      alert("Token or type is missing");
      return;
    }

    try {
      await resetPasswordApi({
        token,
        newPassword: data.newPassword,
        type,
      }).unwrap(); 
      alert('Password reset successfully');
      router.push('/');
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Reset Password</h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">New password</label>
          <div className="flex items-center p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500">
            <Lock className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              {...register("newPassword")}
              className="w-full outline-none"
            />
          </div>
          {errors.newPassword && <p className="text-red-500 mt-2 text-sm">{errors.newPassword.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm password</label>
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            {...register("confirmPassword")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          {errors.confirmPassword && <p className="text-red-500 mt-2 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Reset Password'}
        </button>
      </form>
    </main>
  );
}