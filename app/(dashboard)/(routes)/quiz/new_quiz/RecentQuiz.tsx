"use client";

import { useRouter } from "next/router";
import { Card ,CardContent , CardDescription,CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

type Props = {};

const RecentQuiz = (props:Props) => {
    // const router = useRouter();
    return (
      <Link href="/quiz/new_quiz">
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">Recent Activity</Link>
        </CardTitle>
        <CardDescription>
          {/* You have played a total of {games_count} quizzes. */}
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll">
        {/* <HistoryComponent limit={10} userId={session.user.id} /> */}
      </CardContent>
    </Card>
      </Link>


    );
  };
  export default RecentQuiz;
