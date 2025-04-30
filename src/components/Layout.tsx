
import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, hideNav = false }) => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const isHomePage = location.pathname === "/";

  // Add a small delay for page transition
  useEffect(() => {
    setMounted(false);
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <main 
        className={`flex-1 pb-16 overflow-auto ${
          mounted 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        } transition-all duration-500 ease-out`}
      >
        {children}
      </main>
      {!hideNav && <NavBar />}
    </div>
  );
};
