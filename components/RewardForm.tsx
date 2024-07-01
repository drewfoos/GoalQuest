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

interface RewardFormProps {
  onSubmit: (reward: {
    title: string;
    description: string;
    pointCost: number;
  }) => Promise<void>;
}

const RewardForm: React.FC<RewardFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pointCost, setPointCost] = useState("");
  const [pointCostError, setPointCostError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePointCost = (value: string) => {
    const numPointCost = Number(value);
    if (isNaN(numPointCost) || numPointCost <= 0) {
      setPointCostError("Point cost must be a number greater than zero.");
      return false;
    }
    setPointCostError("");
    return true;
  };

  const handlePointCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPointCost(value);
    validatePointCost(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePointCost(pointCost)) {
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit({
        title,
        description,
        pointCost: Number(pointCost),
      });
      setTitle("");
      setDescription("");
      setPointCost("");
      setPointCostError("");
    } catch (error) {
      console.error("Error submitting reward:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Reward</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} noValidate>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="reward-title" className="text-right">
              Title{" "}
              <span aria-hidden="true" className="text-red-500">
                *
              </span>
            </Label>
            <Input
              id="reward-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter reward title"
              required
              aria-required="true"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="reward-description" className="text-right">
              Description
            </Label>
            <Textarea
              id="reward-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter reward description (optional)"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="reward-point-cost" className="text-right">
              Point Cost{" "}
              <span aria-hidden="true" className="text-red-500">
                *
              </span>
            </Label>
            <Input
              id="reward-point-cost"
              type="number"
              value={pointCost}
              onChange={handlePointCostChange}
              placeholder="Enter point cost"
              required
              aria-required="true"
              min="1"
              step="1"
              disabled={isSubmitting}
              aria-invalid={!!pointCostError}
              aria-describedby="point-cost-error"
            />
            {pointCostError && (
              <p
                id="point-cost-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {pointCostError}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting || !!pointCostError}>
            {isSubmitting ? (
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
        </CardFooter>
      </form>
    </Card>
  );
};

export default RewardForm;
