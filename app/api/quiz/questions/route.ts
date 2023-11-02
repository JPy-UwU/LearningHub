import { z } from "zod";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { strict_output } from "@/lib/openai";

const questionsSchema = z.object({
  topic: z.string(),
  amount: z.number().int().positive().min(1).max(10),
  type: z.enum(["mcq", "open_ended"]),
});

const checkAnswerSchema = z.object({
  userInput: z.string(),
  questionId: z.string(),
});

const endGameSchema = z.object({
  gameId: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();

    if (userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { amount, topic, type } = questionsSchema.parse(body);
    let questions: any;

    if (type === "open_ended") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard open-ended questions about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
        }
      );
    } else if (type === "mcq") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard mcq question about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
          option1: "option1 with max length of 15 words",
          option2: "option2 with max length of 15 words",
          option3: "option3 with max length of 15 words",
        }
      );
    }
    return NextResponse.json({ questions: questions }, { status: 200 });
  } catch (error) {
    console.log("[QUIZ/QUESTIONS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}