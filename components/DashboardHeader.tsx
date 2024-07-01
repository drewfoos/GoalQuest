import React from "react";
import { Medal } from "lucide-react";

interface DashboardHeaderProps {
  userName: string | null | undefined;
  totalPoints: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  totalPoints,
}) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold">Welcome, {userName || "User"}!</h1>
    <div className="flex items-center bg-yellow-100 rounded-full px-4 py-2">
      <Medal className="text-yellow-500 mr-2" />
      <span className="font-bold">Total Points: {totalPoints}</span>
    </div>
  </div>
);

export default DashboardHeader;
