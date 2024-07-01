import React from "react";
import { Card } from "@/components/ui/card";
import GoalForm from "@/components/GoalForm";
import GoalList from "@/components/GoalList";
import { Goal } from "@/app/types";
import { useSWRConfig } from "swr";

interface GoalsTabProps {
  goals: Goal[] | undefined;
}

type GoalFormData = {
  title: string;
  description: string;
  points: number;
};

const GoalsTab: React.FC<GoalsTabProps> = ({ goals }) => {
  const { mutate } = useSWRConfig();

  const handleCreateGoal = async (goalData: GoalFormData) => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });
      if (!response.ok) throw new Error("Failed to create goal");
      mutate("/api/dashboard"); // Refetch dashboard data
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  const handleUpdateGoalStatus = async (
    id: string,
    newStatus: Goal["status"]
  ) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update goal");
      mutate("/api/dashboard"); // Refetch dashboard data
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete goal");
      mutate("/api/dashboard"); // Refetch dashboard data
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <>
      <Card className="mb-8">
        <GoalForm onSubmit={handleCreateGoal} />
      </Card>
      <section className="mb-4">
        <h2 className="text-2xl font-semibold">Your Goals</h2>
      </section>
      <GoalList
        goals={goals || []}
        isLoading={!goals}
        updateGoalStatus={handleUpdateGoalStatus}
        deleteGoal={handleDeleteGoal}
      />
    </>
  );
};

export default GoalsTab;
