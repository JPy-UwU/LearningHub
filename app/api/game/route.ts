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

    // const { data } = await axios.post(
    //   `/api/questions`,
    //   {
    //     amount,
    //     topic,
    //     type,
    //   }
    // );

    // if (type === "mcq") {
    //   type mcqQuestion = {
    //     question: string;
    //     answer: string;
    //     option1: string;
    //     option2: string;
    //     option3: string;
    //   };

    //   const manyData = data.questions.map((question: mcqQuestion) => {
    //     // mix up the options lol
    //     const options = [
    //       question.option1,
    //       question.option2,
    //       question.option3,
    //       question.answer,
    //     ].sort(() => Math.random() - 0.5);
    //     return {
    //       question: question.question,
    //       answer: question.answer,
    //       options: JSON.stringify(options),
    //       gameId: game.id,
    //       questionType: "mcq",
    //     };
    //   });

    //   await prisma.question.createMany({
    //     data: manyData,
    //   });
    // } else if (type === "open_ended") {
    //   type openQuestion = {
    //     question: string;
    //     answer: string;
    //   };
    //   await prisma.question.createMany({
    //     data: data.questions.map((question: openQuestion) => {
    //       return {
    //         question: question.question,
    //         answer: question.answer,
    //         gameId: game.id,
    //         questionType: "open_ended",
    //       };
    //     }),
    //   });
    // }

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