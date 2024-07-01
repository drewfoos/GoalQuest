import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Gift } from "lucide-react";
import { Reward } from "@/app/types";

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

export default RewardList;
