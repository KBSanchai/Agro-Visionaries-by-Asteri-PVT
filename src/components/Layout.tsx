
import React from "react";
import { NavBar } from "./NavBar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, hideNav = false }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <main className="flex-1 pb-16 overflow-auto animate-fade-in">
        {children}
      </main>
      {!hideNav && <NavBar />}
    </div>
  );
};
