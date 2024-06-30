"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast, Toaster } from "react-hot-toast";
import { PlusCircle, CheckCircle, XCircle } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

export default function Dashboard() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isUserLoaded && user) {
      fetchGoals();
    }
  }, [isUserLoaded, user]);

  const fetchGoals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/goals");
      if (!response.ok) throw new Error("Failed to fetch goals");
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Error fetching goals:", error);
      toast.error("Failed to fetch goals");
    } finally {
      setIsLoading(false);
    }
  };

  const createGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newGoalTitle,
          description: newGoalDescription,
        }),
      });

      if (!response.ok) throw new Error("Failed to create goal");

      setNewGoalTitle("");
      setNewGoalDescription("");
      fetchGoals();
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

  if (!isUserLoaded) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.firstName}!</h1>

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
            />
            <Input
              type="text"
              value={newGoalDescription}
              onChange={(e) => setNewGoalDescription(e.target.value)}
              placeholder="Enter goal description (optional)"
            />
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
            </Button>
          </form>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Goals</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <GoalList
            goals={goals}
            isLoading={isLoading}
            updateGoalStatus={updateGoalStatus}
            deleteGoal={deleteGoal}
          />
        </TabsContent>
        <TabsContent value="in-progress">
          <GoalList
            goals={goals.filter((goal) => goal.status === "IN_PROGRESS")}
            isLoading={isLoading}
            updateGoalStatus={updateGoalStatus}
            deleteGoal={deleteGoal}
          />
        </TabsContent>
        <TabsContent value="completed">
          <GoalList
            goals={goals.filter((goal) => goal.status === "COMPLETED")}
            isLoading={isLoading}
            updateGoalStatus={updateGoalStatus}
            deleteGoal={deleteGoal}
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
