import React from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Dumbbell size={32} />
          <span className="text-2xl font-bold">GoalQuest</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/goals" className="hover:underline">
                Goals
              </Link>
            </li>
            <li>
              <Link href="/rewards" className="hover:underline">
                Rewards
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
