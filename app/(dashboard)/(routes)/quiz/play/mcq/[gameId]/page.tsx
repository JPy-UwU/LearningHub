import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import MCQ from "../../_components/mcq";

type Props = {
  params: {
    gameId: string;
  };
};

const MCQPage = async ({ params: { gameId } }: Props) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });

  if (!game || game.gameType === "open_ended") {
    return redirect("/quiz");
  }
  return <MCQ game={game} />;
};

export default MCQPage;