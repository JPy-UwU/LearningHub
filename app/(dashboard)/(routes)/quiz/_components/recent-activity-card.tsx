import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import History from "./history";

type Props = {};

const RecentActivityCard = async (props: Props) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const games_count = await prisma.game.count({
    where: {
      userId,
    },
  });

  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/quiz/history">Recent Activity</Link>
        </CardTitle>
        <CardDescription>
          You have played a total of {games_count} quizzes.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll">
        <History limit={10} userId={userId} />
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;