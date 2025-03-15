import { LogIn, UserRound } from 'lucide-react';
import React from 'react'

type MoveContainerProps = {
    isLogin: boolean;
    toggleForm: () => void;
}
const MoveContainer = ({ isLogin, toggleForm }: MoveContainerProps) => {
  return (
    <div
      className={`absolute top-0 w-1/2 min-h-full bg-primary-color z-10 flex flex-col justify-center items-center text-white transition-all duration-500 mb-14 max-[750px]:h-[400px] max-[750px]:w-full ${
        isLogin
          ? "left-0 max-[750px]:static" 
          : "left-1/2 max-[750px]:left-0 max-[750px]:static"
      } `}
    >
      <div className="text-xl font-semibold">Welcome to Find Job</div>
      <div className="text-lg mt-2">Unlock your job search with us</div>
      <div className="mt-2">
        <button
          onClick={toggleForm}
          className="px-4 py-2 bg-secondary-color text-white rounded-md flex items-center gap-2"
        >
          {isLogin ? (
            <UserRound className="w-5 h-5" />
          ) : (
            <LogIn className="w-5 h-5" />
          )}
          {isLogin ? "Sign up" : "Login"}
        </button>
      </div>
      <div className="mt-4 text-sm text-center text-gray-300">
        {isLogin ? (
          <>
            Already have an account?{" "}
            <span
              onClick={toggleForm}
              className="cursor-pointer text-white hover:underline"
            >
              Login
            </span>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <span
              onClick={toggleForm}
              className="cursor-pointer text-white hover:underline"
            >
              Sign up
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default MoveContainer