import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, RotateCcw } from "lucide-react";

interface GoalFormProps {
  onSubmit: (goal: {
    title: string;
    description: string;
    points: number;
  }) => Promise<void>;
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [pointsError, setPointsError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePoints = (value: string) => {
    const numPoints = Number(value);
    if (isNaN(numPoints) || numPoints <= 0) {
      setPointsError("Points must be a number greater than zero.");
      return false;
    }
    setPointsError("");
    return true;
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPoints(value);
    validatePoints(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePoints(points)) {
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit({
        title,
        description,
        points: Number(points),
      });
      setTitle("");
      setDescription("");
      setPoints("");
      setPointsError("");
    } catch (error) {
      console.error("Error submitting goal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Goal</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} noValidate>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="goal-title" className="text-right">
              Title{" "}
              <span aria-hidden="true" className="text-red-500">
                *
              </span>
            </Label>
            <Input
              id="goal-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter goal title"
              required
              aria-required="true"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="goal-description" className="text-right">
              Description
            </Label>
            <Textarea
              id="goal-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter goal description (optional)"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="goal-points" className="text-right">
              Points{" "}
              <span aria-hidden="true" className="text-red-500">
                *
              </span>
            </Label>
            <Input
              id="goal-points"
              type="number"
              value={points}
              onChange={handlePointsChange}
              placeholder="Enter point value"
              required
              aria-required="true"
              min="1"
              step="1"
              disabled={isSubmitting}
              aria-invalid={!!pointsError}
              aria-describedby="points-error"
            />
            {pointsError && (
              <p
                id="points-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {pointsError}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting || !!pointsError}>
            {isSubmitting ? (
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
        </CardFooter>
      </form>
    </Card>
  );
};

export default GoalForm;
