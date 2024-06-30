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
import { Gift } from "lucide-react"; // Make sure to install lucide-react

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointCost: number;
  claimed: boolean;
}

interface RewardCardProps {
  reward: Reward;
  onClaim: (id: string) => void;
  userPoints: number;
}

const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  onClaim,
  userPoints,
}) => {
  const canClaim = userPoints >= reward.pointCost && !reward.claimed;

  return (
    <Card className={`w-full mb-4 ${reward.claimed ? "bg-gray-100" : ""}`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="flex items-center">
            <Gift className="mr-2" size={20} />
            {reward.title}
          </span>
          <Badge variant="secondary">{reward.pointCost} points</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {reward.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => onClaim(reward.id)}
          disabled={!canClaim}
          variant={reward.claimed ? "outline" : "default"}
        >
          {reward.claimed
            ? "Claimed"
            : canClaim
            ? "Claim Reward"
            : "Not Enough Points"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RewardCard;
