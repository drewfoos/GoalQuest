import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const [goals, rewards, weeklyProgress] = await Promise.all([
      fetchGoals(userId),
      fetchRewards(userId),
      fetchWeeklyProgress(userId),
    ]);

    return NextResponse.json({ goals, rewards, weeklyProgress });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return new NextResponse("Error fetching dashboard data", { status: 500 });
  }
}

async function fetchGoals(userId: string) {
  return prisma.goal.findMany({
    where: {
      OR: [{ userId: userId }, { userId: null }],
    },
    orderBy: { createdAt: "desc" },
  });
}

async function fetchRewards(userId: string) {
  return prisma.reward.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });
}

async function fetchWeeklyProgress(userId: string) {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const completedGoals = await prisma.goal.findMany({
    where: {
      userId: userId,
      status: "COMPLETED",
      updatedAt: {
        gte: sevenDaysAgo,
        lte: today,
      },
    },
  });

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const count = completedGoals.filter(
      (goal) => goal.updatedAt.toDateString() === date.toDateString()
    ).length;
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      count,
    };
  }).reverse();
}
