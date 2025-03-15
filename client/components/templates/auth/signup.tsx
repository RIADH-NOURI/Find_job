"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/apis/public/auth";
import { UserRound, Lock, EyeOff, Eye } from "lucide-react";
import { schema, FormData } from "@/schemas/signupSchema";
import countries from "@/public/countries.json";

// Fetch countries data

type SignupProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Signup({ setIsLogin }: SignupProps) {
  const [registerMutation] = useRegisterMutation();
  const [selectedRole, setSelectedRole] = useState<"USER" | "RECRUITER">(
    "USER"
  );
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);

    try {
      const formattedData = {
        name: data.name,
        email: data.email,
        password: data.password,
        country: data.country,
        dateOfBirth: data.dateOfBirth,
        status: data.role === "USER" ? data.status : undefined,
        role: data.role,
        company: data.role === "RECRUITER" ? data.company : undefined,
        companyType: data.role === "RECRUITER" ? data.companyType : undefined,
        companySize: data.role === "RECRUITER" ? data.companySize : undefined,
        city: data.city,
      };
      await registerMutation(formattedData).unwrap();
      setIsLogin(true);
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  return (
    <div
      className={`flex-1 flex items-center justify-center min-h-screen bg-white overflow-y-auto`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6 ">
        <h1 className="text-2xl mb-6 text-center text-text-color">
          Créer un compte
        </h1>

        {/* Name & Status */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm mb-1 text-text-color">Nom</label>
            <input
              type="text"
              placeholder="Votre nom"
              {...register("name")}
              className="w-full p-2 border rounded-lg outline-none focus:border-primary-color"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          {selectedRole === "USER" && (
            <div className="flex-1">
              <label className="block text-sm mb-1 text-text-color">
                Statut de vie
              </label>
              <input
                type="text"
                placeholder="Ex: Étudiant, Employé"
                {...register("status")}
                className="w-full p-2 border rounded-lg outline-none focus:border-primary-color"
              />
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-text-color">Email</label>
          <div className="flex items-center p-2 border rounded-lg focus:border-primary-color">
            <UserRound className="text-secondary-color mr-2" />
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full outline-none focus:border-primary-color"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password & Confirm Password */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-text-color">password</label>
          <div className="flex items-center p-2 border rounded-lg">
            <Lock className="text-secondary-color mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full outline-none focus:border-primary-color"
            />
            {/* Eye Icon to toggle password visibility */}
            <button
              type="button"
              className="text-secondary-color hover:text-primary-color focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-text-color">
            Confirm password
          </label>

          <div className="flex rounded-lg border">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirme password"
              {...register("confirmPassword")}
              className="w-full p-2 outline-none focus:border-primary-color"
            />
            <button
              type="button"
              className="text-secondary-color pr-3 hover:text-primary-color focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1 text-text-color">city</label>
          <input
            type="text"
            placeholder="city"
            {...register("city")}
            className="w-full p-2 border rounded-lg outline-none focus:border-primary-color"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-text-color">
            Date de naissance
          </label>
          <input
            type="date"
            {...register("dateOfBirth")}
            className="w-full p-2 border rounded-lg outline-none focus:border-primary-color"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
          )}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-text-color">Pays</label>
          <select
            {...register("country")}
            className="w-full p-2 border rounded-lg outline-none focus:border-primary-color"
          >
            <option value="">Choisissez un pays</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-text-color">
            Choisissez un rôle :
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                value="USER"
                {...register("role")}
                onChange={() => setSelectedRole("USER")}
              />{" "}
              User
            </label>
            <label>
              <input
                type="radio"
                value="RECRUITER"
                {...register("role")}
                onChange={() => setSelectedRole("RECRUITER")}
              />{" "}
              Recruiter
            </label>
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Conditionally render Company and Company Type fields */}
        {selectedRole === "RECRUITER" && (
          <>
            <div className="mb-4">
              <label className="block text-sm mb-1 text-text-color">
                Company
              </label>
              <input
                type="text"
                placeholder="Company"
                {...register("company")}
                className="w-full p-2 border rounded-lg outline-none focus:border-primary-color"
              />
              {errors.company && (
                <p className="text-red-500 text-sm">{errors.company.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1 text-text-color">
                Company Type
              </label>
              <select
                {...register("companyType")}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Choose Company Type</option>
                <option value="STARTUP">Startup</option>
                <option value="ENTERPRISE">Enterprise</option>
                <option value="SMALLBUSINESS">Small Business</option>
                <option value="GOVERNMENT">Government</option>
              </select>
              {errors.companyType && (
                <p className="text-red-500 text-sm">
                  {errors.companyType.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1 text-text-color">
                Company Type
              </label>
              <select
                {...register("companySize")}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Choose Company Type</option>
                <option value="1-10">1-10 employees</option>
                <option value="10-50">10-50 employees</option>
                <option value="50-100">50-100 employees</option>
                <option value="+250">250+ employees</option>
              </select>
              {errors.companyType && (
                <p className="text-red-500 text-sm">
                  {errors.companyType.message}
                </p>
              )}
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary-color text-white p-2 rounded-lg mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Connexion en cours..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
