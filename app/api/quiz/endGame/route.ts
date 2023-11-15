import { z } from "zod";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

const endGameSchema = z.object({
  gameId: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { gameId } = endGameSchema.parse(body);

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      return NextResponse.json("Game not found", { status: 404 });
    }

    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        timeEnded: new Date(),
      },
    });

    return NextResponse.json("Game ended");
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}