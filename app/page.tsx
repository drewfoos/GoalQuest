"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  PlusCircle,
  CheckCircle,
  XCircle,
  Gift,
  Medal,
  RotateCcw,
} from "lucide-react";

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
  const [newRewardTitle, setNewRewardTitle] = useState("");
  const [newRewardDescription, setNewRewardDescription] = useState("");
  const [newRewardPointCost, setNewRewardPointCost] = useState(0);
  const [isLoadingRewards, setIsLoadingRewards] = useState(true);
  const [isSubmittingReward, setIsSubmittingReward] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [newGoalPoints, setNewGoalPoints] = useState(0);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);
  const [isSubmittingGoal, setIsSubmittingGoal] = useState(false);
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

  const createReward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRewardTitle.trim() || newRewardPointCost <= 0) return;
    setIsSubmittingReward(true);

    try {
      const response = await fetch("/api/rewards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newRewardTitle,
          description: newRewardDescription,
          pointCost: newRewardPointCost,
        }),
      });

      if (!response.ok) throw new Error("Failed to create reward");

      setNewRewardTitle("");
      setNewRewardDescription("");
      setNewRewardPointCost(0);
      fetchRewards();
      toast.success("Reward created successfully!");
    } catch (error) {
      console.error("Error creating reward:", error);
      toast.error("Failed to create reward");
    } finally {
      setIsSubmittingReward(false);
    }
  };

  const createGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim() || newGoalPoints <= 0) return;
    setIsSubmittingGoal(true);

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newGoalTitle,
          description: newGoalDescription,
          points: newGoalPoints,
        }),
      });

      if (!response.ok) throw new Error("Failed to create goal");

      setNewGoalTitle("");
      setNewGoalDescription("");
      setNewGoalPoints(0);
      fetchGoals();
      toast.success("Goal created successfully!");
    } catch (error) {
      console.error("Error creating goal:", error);
      toast.error("Failed to create goal");
    } finally {
      setIsSubmittingGoal(false);
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
            <CardHeader>
              <CardTitle>Create New Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={createGoal} className="space-y-4">
                <Input
                  type="text"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="Enter goal title"
                  disabled={isSubmittingGoal}
                />
                <Input
                  type="text"
                  value={newGoalDescription}
                  onChange={(e) => setNewGoalDescription(e.target.value)}
                  placeholder="Enter goal description (optional)"
                  disabled={isSubmittingGoal}
                />
                <Input
                  type="number"
                  value={newGoalPoints}
                  onChange={(e) => setNewGoalPoints(parseInt(e.target.value))}
                  placeholder="Enter point value"
                  disabled={isSubmittingGoal}
                />
                <Button type="submit" disabled={isSubmittingGoal}>
                  {isSubmittingGoal ? (
                    <>
                      <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === "rewards" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Reward</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={createReward} className="space-y-4">
                <Input
                  type="text"
                  value={newRewardTitle}
                  onChange={(e) => setNewRewardTitle(e.target.value)}
                  placeholder="Enter reward title"
                  disabled={isSubmittingReward}
                />
                <Input
                  type="text"
                  value={newRewardDescription}
                  onChange={(e) => setNewRewardDescription(e.target.value)}
                  placeholder="Enter reward description (optional)"
                  disabled={isSubmittingReward}
                />
                <Input
                  type="number"
                  value={newRewardPointCost}
                  onChange={(e) =>
                    setNewRewardPointCost(parseInt(e.target.value))
                  }
                  placeholder="Enter point cost"
                  disabled={isSubmittingReward}
                />
                <Button type="submit" disabled={isSubmittingReward}>
                  {isSubmittingReward ? (
                    <>
                      <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Reward
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <TabsContent value="goals">
          <GoalList
            goals={goals}
            isLoading={isLoadingGoals}
            updateGoalStatus={updateGoalStatus}
            deleteGoal={deleteGoal}
          />
        </TabsContent>
        <TabsContent value="rewards">
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
}

const GoalList: React.FC<GoalListProps> = ({
  goals,
  isLoading,
  updateGoalStatus,
  deleteGoal,
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
            <Button onClick={() => deleteGoal(goal.id)} variant="destructive">
              <XCircle className="mr-2 h-4 w-4" /> Delete
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
