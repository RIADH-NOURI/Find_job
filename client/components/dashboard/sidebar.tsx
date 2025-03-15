"use client";

import {
  ChevronLeft,
  BriefcaseBusiness,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import dynamic from "next/dynamic";






const ConfirmForm = dynamic(
  () => import("@/components/moleculles/confirmForm")
);

const Sidebar = () => {
  const [showConfirmForm, setShowConfirmForm] = useState<boolean>(false);
  const {logout } = useAuth();
  const pathname = usePathname(); // Get current route
  // Retrieve "close" state from localStorage or default to false
  const id = useParams().id;
  const [isMobile,setIsMobile] = useState<boolean>(false)
  const [close, setClose] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("close")) || false;
    }
    return false;
  });

  // Store "close" state in localStorage on change
  useEffect(() => {
    localStorage.setItem("close", JSON.stringify(close));
  }, [close]);

  const toggleClose = () => {
    setClose((prev) => {
      const newState = !prev;
      localStorage.setItem("close", JSON.stringify(newState));
      return newState;
    });
  };
  const toggleIsMobile = ()=>{
    setIsMobile(true)
  }
  if(showConfirmForm){
    
    return(
    <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={() => setShowConfirmForm(false)}
  > <ConfirmForm onClose={() => setShowConfirmForm(false) } handleConfirmApplication={logout}
  confirmActionMessage="Are you sure you want to logout?"
      confirmAction="Logout"/>
  </div>
  );
  }

  const isActive = (path) => pathname.startsWith(path); // Check if current route is active

  return (
   <>
    {
      isMobile && (
       <div className="fixed bg-black/50 inset-0 z-30" onClick={()=>setIsMobile(false)}></div>
      )
    }  
    <button         className="fixed top-4 left-4 p-2 bg-blue-500 text-white rounded-lg z-40 max-[700px]:block hidden"
      onClick={toggleIsMobile}    >
        <Menu className="w-6 h-6" />
      </button>
    <aside
  className={`bg-white h-screen shadow-lg relative max-[700px]:fixed transition-[width] duration-300 ease-in-out mr-10 z-40 ${
    isMobile ? "max-[700px]:translate-x-0" : "max-[700px]:-translate-x-full"
  } ${
    !close && !isMobile ? "w-16" : "w-64"
  }`}
>
      {/* Collapse Button */}
      <button
        onClick={toggleClose}
        className="absolute top-6 right-[-12px] p-1 rounded-full bg-gray-300 text-gray-800 transition-transform duration-300 max-[700px]:hidden"
      >
        <ChevronLeft
          className={`w-5 h-5 ${!close ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Logo */}
      <div className="p-4 border-b">
        <div className="text-2xl font-semibold text-gray-800 truncate">
          {!close && !isMobile ? "D" : "Dashboard"}
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <ul className="space-y-2">
          {/* Dashboard Link */}
          <li>
            <Link
              href={`/dashboard/${id}`}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-colors ${
                isActive(`/dashboard/${id}`)
                  ? "bg-gray-200 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
               <LayoutDashboard className={`w-5 h-5 absolute left-4 `} />
              <span
                  className={`transition-all duration-300 ease-in-out ml-10 ${
                    !close && !isMobile
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto"
                  }`}
                >
                  dashboard
                </span>           
            </Link>
          </li>

          {/* Jobs Link */}
          <li>
            <Link
              href={`/dashboard/jobs/${id}`}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-colors ${
                isActive(`/dashboard/jobs/${id}`)
                  ? "bg-gray-200 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <BriefcaseBusiness className={`w-5 h-5 absolute left-4 `}/>
              <span
                  className={`transition-all duration-300 ease-in-out ml-10 ${
                    !close && !isMobile
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto"
                  }`}
                >
                  jobs
                </span>            </Link>
          </li>

          {/* Settings Link */}
          <li>
            <Link
              href={`/dashboard/settings/${id}`}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-colors ${
                isActive(`/dashboard/settings/${id}`)
                  ? "bg-gray-200 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
               <Settings className={`w-5 h-5 absolute left-4 `} />
              <span
                  className={`transition-all duration-300 ease-in-out ml-10 ${
                    !close && !isMobile
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto"
                  }`}
                >
                  settings
                </span>           
            </Link>
          </li>

          {/* Logout Link */}
          <li onClick={() => setShowConfirmForm(true)}>
            <Link
              href=""
              className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-colors hover:bg-gray-100`}
            >
              <LogOut className={`w-5 h-5 absolute left-4`}onClick={() => setShowConfirmForm(true)} />
              <span
                  className={`transition-all duration-300 ease-in-out ml-10 ${
                    !close && !isMobile
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto"
                  }`}
                >
                  logout
                </span>           
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;