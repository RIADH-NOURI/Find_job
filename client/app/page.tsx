"use client";

import { useState, useEffect } from "react";
import Login from "@/components/templates/auth/login";
import Signup from "@/components/templates/auth/signup";
import MoveContainer from "@/components/templates/auth/moveContainer";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import ForgotPassword from "@/components/templates/auth/forgotPassword";
import Loader from "@/components/moleculles/loader"; 

const Page = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [forgetPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(true); 
  const { isAuthenticated, id,user } = useAuth();

  useEffect(() => {
    const role = localStorage.getItem("role");

    setTimeout(() => {
      if (isAuthenticated) {
        if (role === "USER") {
          router.replace(`/${user}`);
        } else if (role === "RECRUITER") {
          router.replace(`/dashboard/${id}`);
        }
      } else {
        setLoading(false); 
      }
    }, 1000); 
  }, [isAuthenticated, id, router]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex min-w-full relative min-h-full overflow-hidden bg-white max-[750px]:flex-col">
      <MoveContainer isLogin={isLogin} toggleForm={toggleForm} />

      <div className="hidden max-[750px]:w-full max-[750px]:block">
        {isLogin ? forgetPassword ? <ForgotPassword setForgotPassword={setForgotPassword}/> : <Login setForgotPassword={setForgotPassword} /> : <Signup setIsLogin={setIsLogin} />}
      </div>

      <div className="max-[750px]:hidden flex w-full h-full">
      <Signup setIsLogin={setIsLogin} />
        {forgetPassword ? <ForgotPassword setForgotPassword={setForgotPassword}/> : <Login setForgotPassword={setForgotPassword} />}
      </div>
    </div>
  );
};

export default Page;