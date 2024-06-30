import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const id = params.id;
    const body = await request.json();
    const updatedReward = await prisma.reward.update({
      where: { id, userId },
      data: { claimed: body.claimed },
    });
    return NextResponse.json(updatedReward);
  } catch (error) {
    console.error("Error updating reward:", error);
    return new NextResponse("Error updating reward", { status: 500 });
  }
}
