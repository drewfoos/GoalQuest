import React from "react";
import { Card } from "@/components/ui/card";
import RewardForm from "@/components/RewardForm";
import RewardList from "@/components/RewardList";
import { Reward } from "@/app/types";
import { useSWRConfig } from "swr";

interface RewardsTabProps {
  rewards: Reward[] | undefined;
  totalPoints: number;
}

type RewardFormData = {
  title: string;
  description: string;
  pointCost: number;
};

const RewardsTab: React.FC<RewardsTabProps> = ({ rewards, totalPoints }) => {
  const { mutate } = useSWRConfig();

  const handleCreateReward = async (rewardData: RewardFormData) => {
    try {
      const response = await fetch("/api/rewards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rewardData),
      });
      if (!response.ok) throw new Error("Failed to create reward");
      mutate("/api/dashboard"); // Refetch dashboard data
    } catch (error) {
      console.error("Error creating reward:", error);
    }
  };

  const handleClaimReward = async (id: string) => {
    try {
      const response = await fetch(`/api/rewards/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimed: true }),
      });
      if (!response.ok) throw new Error("Failed to claim reward");
      mutate("/api/dashboard"); // Refetch dashboard data
    } catch (error) {
      console.error("Error claiming reward:", error);
    }
  };

  return (
    <>
      <Card className="mb-8">
        <RewardForm onSubmit={handleCreateReward} />
      </Card>
      <h2 className="text-2xl font-semibold mb-4">Available Rewards</h2>
      <RewardList
        rewards={rewards || []}
        isLoading={!rewards}
        totalPoints={totalPoints}
        claimReward={handleClaimReward}
      />
    </>
  );
};

export default RewardsTab;
