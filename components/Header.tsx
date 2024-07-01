"use client";

import React from "react";
import Link from "next/link";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null; // or a loading spinner
  }

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
        <nav>
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
                <li>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-10 h-10 border-2 border-primary-foreground hover:border-primary-foreground/80 transition-colors",
                        userButtonPopoverCard: "bg-primary shadow-lg",
                        userButtonPopoverActions: "text-primary-foreground",
                        userButtonPopoverActionButton:
                          "hover:bg-primary-foreground/10 transition-colors",
                      },
                    }}
                  />
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
