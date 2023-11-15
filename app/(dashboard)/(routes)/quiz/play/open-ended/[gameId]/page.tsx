import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import OpenEnded from "../../_components/open-ended";

const OpenEndedPage = async ({ 
  params: { gameId } 
}: {
  params: {
    gameId: string;
  };
}) => {
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
          answer: true,
        },
      },
    },
  });

  if (!game || game.gameType === "mcq") {
    return redirect("/quiz");
  }
  
  return <OpenEnded game={game} />;
};

export default OpenEndedPage;