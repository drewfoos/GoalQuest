"use client";

import React from "react";
import useSWR from "swr";
import { useUser } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/DashboardHeader";
import GoalsTab from "@/components/GoalsTab";
import RewardsTab from "@/components/RewardsTab";
import WeeklyGoalProgress from "@/components/WeeklyGoalProgress";
import { Goal, Reward } from "@/app/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface DashboardData {
  goals: Goal[];
  rewards: Reward[];
  weeklyProgress: { day: string; count: number }[];
}

export default function Dashboard() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { data, error } = useSWR<DashboardData>("/api/dashboard", fetcher);

  if (!isUserLoaded) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error loading dashboard data</div>;
  }

  if (!data) {
    return <div>Loading dashboard data...</div>;
  }

  const { goals, rewards, weeklyProgress } = data;
  const totalPoints = calculateTotalPoints(goals);

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right" />
      <DashboardHeader userName={user?.firstName} totalPoints={totalPoints} />
      <Tabs defaultValue="goals">
        <TabsList className="mb-4">
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>
        <TabsContent value="goals">
          <GoalsTab goals={goals} />
          <div className="mt-8">
            <WeeklyGoalProgress data={weeklyProgress} />
          </div>
        </TabsContent>
        <TabsContent value="rewards">
          <RewardsTab rewards={rewards} totalPoints={totalPoints} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function calculateTotalPoints(goals: Goal[]): number {
  return goals
    .filter((goal) => goal.status === "COMPLETED")
    .reduce((sum, goal) => sum + goal.points, 0);
}
