import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  points: number;
}

interface GoalCardProps {
  goal: Goal;
  onStatusChange: (id: string, status: Goal["status"]) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onStatusChange,
  onDelete,
}) => {
  const isCompleted = goal.status === "COMPLETED";

  return (
    <Card className={`w-full mb-4 ${isCompleted ? "bg-green-50" : ""}`}>
      <CardHeader>
        <CardTitle
          className={`flex justify-between items-center ${
            isCompleted ? "line-through text-gray-500" : ""
          }`}
        >
          {goal.title}
          <Badge variant={isCompleted ? "secondary" : "default"}>
            {goal.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`mb-2 ${isCompleted ? "text-gray-500" : ""}`}>
          {goal.description}
        </p>
        <p className="font-bold">Points: {goal.points}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isCompleted ? (
          <Button
            onClick={() => onStatusChange(goal.id, "COMPLETED")}
            variant="outline"
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Complete
          </Button>
        ) : (
          <Button
            onClick={() => onStatusChange(goal.id, "IN_PROGRESS")}
            variant="outline"
          >
            Undo Complete
          </Button>
        )}
        <Button onClick={() => onDelete(goal.id)} variant="destructive">
          <XCircle className="mr-2 h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoalCard;
