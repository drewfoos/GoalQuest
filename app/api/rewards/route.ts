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
    const rewards = await prisma.reward.findMany({
      where: {
        OR: [{ userId: userId }, { userId: null }],
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(rewards);
  } catch (error) {
    console.error("Error fetching rewards:", error);
    return new NextResponse("Error fetching rewards", { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const reward = await prisma.reward.create({
      data: {
        title: body.title,
        description: body.description,
        pointCost: body.pointCost,
        userId: userId,
      },
    });
    return NextResponse.json(reward);
  } catch (error) {
    console.error("Error creating reward:", error);
    return new NextResponse("Error creating reward", { status: 500 });
  }
}
