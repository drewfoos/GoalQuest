"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";
import { Dumbbell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const userButtonAppearance = {
    elements: {
      avatarBox:
        "w-12 h-12 border-2 border-primary-foreground hover:border-primary-foreground/80 transition-colors",
      userButtonPopoverCard: "bg-primary shadow-lg",
      userButtonPopoverActions: "text-primary-foreground",
      userButtonPopoverActionButton:
        "hover:bg-primary-foreground/10 transition-colors",
    },
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <Dumbbell size={36} className="text-primary-foreground" />
          <span className="text-2xl font-bold tracking-tight">GoalQuest</span>
        </Link>

        {/* Hamburger menu button for mobile */}
        <button
          className="lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <ul className="flex items-center space-x-6">
            {isSignedIn && (
              <>
                <li>
                  <Link
                    href="/"
                    className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="flex items-center justify-center">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={userButtonAppearance}
                  />
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden mt-4 pb-4">
          <ul className="flex flex-col space-y-4 items-center">
            <li>
              <Link
                href="/"
                className="block py-2 hover:underline"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            {isSignedIn && (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="block py-2 hover:underline"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="py-2 flex items-center justify-center">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={userButtonAppearance}
                  />
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
