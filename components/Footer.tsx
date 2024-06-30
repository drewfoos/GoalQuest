import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 py-6 flex justify-center items-center">
        <p className="flex items-center">
          Made with <Heart size={16} className="mx-1 text-red-500" /> by
          GoalQuest Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;
