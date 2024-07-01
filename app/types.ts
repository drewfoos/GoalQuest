export interface Goal {
  id: string;
  title: string;
  description: string;
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  points: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointCost: number;
  claimed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
