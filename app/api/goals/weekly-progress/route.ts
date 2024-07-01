import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
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

    const dailyCounts = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const count = completedGoals.filter(
        (goal) => goal.updatedAt.toDateString() === date.toDateString()
      ).length;
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      };
    }).reverse();

    return NextResponse.json(dailyCounts);
  } catch (error) {
    console.error("Error fetching weekly progress:", error);
    return new NextResponse("Error fetching weekly progress", { status: 500 });
  }
}
