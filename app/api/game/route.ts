import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

import { prisma } from "@/lib/db";

const quizCreationSchema = z.object({
  topic: z.string().min(4, {
      message: "Topic must be at least 4 characters long",
    }).max(50, {
      message: "Topic must be at most 50 characters long",
    }),
    type: z.enum(["mcq", "open_ended"]),
    amount: z.number().min(1).max(10),
  });

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { topic, type, amount } = quizCreationSchema.parse(body);
    const game = await prisma.game.create({
      data: {
        topic,
        userId,
        gameType: type,
        timeStarted: new Date(),
      },
    });

    await prisma.topic_count.upsert({
      where: {
        topic,
      },
      create: {
        topic,
        count: 1,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });

    ///

    return NextResponse.json({ gameId: game.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json("An unexpected error occurred.", { status: 500 });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const url = new URL(req.url);
    const gameId = url.searchParams.get("gameId");
    if (!gameId) {
      return NextResponse.json("You must provide a game id.", { status: 400 });
    }

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        questions: true,
      },
    });
    if (!game) {
      return NextResponse.json("Game not found.", { status: 404 });
    }

    return NextResponse.json(game, { status: 400 });
  } catch (error) {
    return NextResponse.json("An unexpected error occurred.", { status: 500});
  }
}