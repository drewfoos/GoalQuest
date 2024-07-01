"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const SignOutButton = () => {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut({ redirectUrl: "/" });
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="px-8 py-3 rounded-full text-lg bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
