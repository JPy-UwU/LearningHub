
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import QuizNow from "./new_quiz/QuizNow";
import RecentQuiz from "./new_quiz/RecentQuiz";

type Props = {};

export const metadata = {
  title: "Quiz page",
  description: "Quiz yourself on anything!",
};

const Dasboard = async (props: Props) => {

  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Quiz Page</h2>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizNow />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
      <RecentQuiz />

      </div>
    </main>
  );
};

export default Dasboard;
