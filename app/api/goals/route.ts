import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const goals = await prisma.goal.findMany({
      where: {
        OR: [{ userId: userId }, { userId: null }],
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    return new NextResponse("Error fetching goals", { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const goal = await prisma.goal.create({
      data: {
        title: body.title,
        description: body.description,
        points: body.points || 0,
        userId: userId,
      },
    });
    return NextResponse.json(goal);
  } catch (error) {
    console.error("Error creating goal:", error);
    return new NextResponse("Error creating goal", { status: 500 });
  }
}
