import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Goal } from "@/app/types";

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
            {goal.status !== "COMPLETED" ? (
              <Button
                onClick={() => updateGoalStatus(goal.id, "COMPLETED")}
                variant="outline"
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Complete
              </Button>
            ) : (
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

export default GoalList;
