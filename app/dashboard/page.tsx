"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import WeeklyGoalProgress from "@/components/WeeklyGoalProgress";
import GoalForm from "@/components/GoalForm";
import RewardForm from "@/components/RewardForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast, Toaster } from "react-hot-toast";
import { CheckCircle, XCircle, Gift, Medal, RotateCcw } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  points: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointCost: number;
  claimed: boolean;
  userId: string | null;
}

export default function Dashboard() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoadingRewards, setIsLoadingRewards] = useState(true);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);
  const [deletingGoalId, setDeletingGoalId] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [activeTab, setActiveTab] = useState("goals");

  useEffect(() => {
    if (isUserLoaded && user) {
      fetchGoals();
      fetchRewards();
    }
  }, [isUserLoaded, user]);

  useEffect(() => {
    const completedPoints = goals
      .filter((goal) => goal.status === "COMPLETED")
      .reduce((sum, goal) => sum + goal.points, 0);
    setTotalPoints(completedPoints);
  }, [goals]);

  const fetchGoals = async () => {
    setIsLoadingGoals(true);
    try {
      const response = await fetch("/api/goals");
      if (!response.ok) throw new Error("Failed to fetch goals");
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Error fetching goals:", error);
      toast.error("Failed to fetch goals");
    } finally {
      setIsLoadingGoals(false);
    }
  };

  const fetchRewards = async () => {
    setIsLoadingRewards(true);
    try {
      const response = await fetch("/api/rewards");
      if (!response.ok) throw new Error("Failed to fetch rewards");
      const data = await response.json();
      setRewards(data);
    } catch (error) {
      console.error("Error fetching rewards:", error);
      toast.error("Failed to fetch rewards");
    } finally {
      setIsLoadingRewards(false);
    }
  };

  const createReward = async (rewardData: {
    title: string;
    description: string;
    pointCost: number;
  }) => {
    try {
      const response = await fetch("/api/rewards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rewardData),
      });

      if (!response.ok) throw new Error("Failed to create reward");

      const newReward = await response.json();
      setRewards([...rewards, newReward]);
      toast.success("Reward created successfully!");
    } catch (error) {
      console.error("Error creating reward:", error);
      toast.error("Failed to create reward");
    }
  };

  const createGoal = async (goalData: {
    title: string;
    description: string;
    points: number;
  }) => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) throw new Error("Failed to create goal");

      const newGoal = await response.json();
      setGoals([...goals, newGoal]);
      toast.success("Goal created successfully!");
    } catch (error) {
      console.error("Error creating goal:", error);
      toast.error("Failed to create goal");
    }
  };

  const updateGoalStatus = async (id: string, newStatus: Goal["status"]) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update goal");

      fetchGoals();
      toast.success("Goal updated successfully!");
    } catch (error) {
      console.error("Error updating goal:", error);
      toast.error("Failed to update goal");
    }
  };

  const deleteGoal = async (id: string) => {
    setDeletingGoalId(id);
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete goal");

      fetchGoals();
      toast.success("Goal deleted successfully!");
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast.error("Failed to delete goal");
    } finally {
      setDeletingGoalId(null);
    }
  };

  const claimReward = async (id: string) => {
    const reward = rewards.find((r) => r.id === id);
    if (!reward || reward.claimed || totalPoints < reward.pointCost) return;

    try {
      const response = await fetch(`/api/rewards/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimed: true }),
      });

      if (!response.ok) throw new Error("Failed to claim reward");

      setRewards(
        rewards.map((r) => (r.id === id ? { ...r, claimed: true } : r))
      );
      setTotalPoints((prevPoints) => prevPoints - reward.pointCost);
      toast.success("Reward claimed successfully!");
    } catch (error) {
      console.error("Error claiming reward:", error);
      toast.error("Failed to claim reward");
    }
  };

  if (!isUserLoaded) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.firstName}!</h1>
        <div className="flex items-center bg-yellow-100 rounded-full px-4 py-2">
          <Medal className="text-yellow-500 mr-2" />
          <span className="font-bold">Total Points: {totalPoints}</span>
        </div>
      </div>

      <Tabs defaultValue="goals" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        {activeTab === "goals" && (
          <Card className="mb-8">
            <GoalForm onSubmit={createGoal} />
          </Card>
        )}

        {activeTab === "rewards" && (
          <Card className="mb-8">
            <RewardForm onSubmit={createReward} />
          </Card>
        )}
        <TabsContent value="goals">
          <section className="mb-4">
            <h2 className="text-2xl font-semibold">Your Goals</h2>
          </section>
          <GoalList
            goals={goals}
            isLoading={isLoadingGoals}
            updateGoalStatus={updateGoalStatus}
            deleteGoal={deleteGoal}
            deletingGoalId={deletingGoalId}
          />
          <section>
            <h2 className="text-2xl font-semibold mb-4 mt-8">
              Weekly Progress
            </h2>
            <WeeklyGoalProgress />
          </section>
        </TabsContent>
        <TabsContent value="rewards">
          <h2 className="text-2xl font-semibold mb-4">Available Rewards</h2>
          <RewardList
            rewards={rewards}
            isLoading={isLoadingRewards}
            totalPoints={totalPoints}
            claimReward={claimReward}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface GoalListProps {
  goals: Goal[];
  isLoading: boolean;
  updateGoalStatus: (id: string, newStatus: Goal["status"]) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  deletingGoalId: string | null;
}

const GoalList: React.FC<GoalListProps> = ({
  goals,
  isLoading,
  updateGoalStatus,
  deleteGoal,
  deletingGoalId,
}) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[200px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (goals.length === 0) {
    return <p>No goals found. Start by creating a new goal!</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal) => (
        <Card key={goal.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {goal.title}
              <Badge
                variant={goal.status === "COMPLETED" ? "secondary" : "default"}
              >
                {goal.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{goal.description}</p>
            <p className="font-bold mt-2">Points: {goal.points}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            {goal.status !== "COMPLETED" && (
              <Button
                onClick={() => updateGoalStatus(goal.id, "COMPLETED")}
                variant="outline"
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Complete
              </Button>
            )}
            {goal.status === "COMPLETED" && (
              <Button
                onClick={() => updateGoalStatus(goal.id, "IN_PROGRESS")}
                variant="outline"
              >
                Reopen
              </Button>
            )}
            <Button
              onClick={() => deleteGoal(goal.id)}
              variant="destructive"
              disabled={deletingGoalId === goal.id}
            >
              {deletingGoalId === goal.id ? (
                <>
                  <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <XCircle className="mr-2 h-4 w-4" /> Delete
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

interface RewardListProps {
  rewards: Reward[];
  isLoading: boolean;
  totalPoints: number;
  claimReward: (id: string) => Promise<void>;
}

const RewardList: React.FC<RewardListProps> = ({
  rewards,
  isLoading,
  totalPoints,
  claimReward,
}) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[200px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (rewards.length === 0) {
    return <p>No rewards available. Check back later!</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rewards.map((reward) => (
        <Card key={reward.id}>
          <CardHeader>
            <CardTitle>{reward.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{reward.description}</p>
            <p className="font-bold mt-2">Cost: {reward.pointCost} points</p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => claimReward(reward.id)}
              disabled={reward.claimed || totalPoints < reward.pointCost}
              variant={reward.claimed ? "secondary" : "default"}
            >
              <Gift className="mr-2 h-4 w-4" />
              {reward.claimed ? "Claimed" : "Claim Reward"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
