import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import QuizCard from "./_components/quiz-card";
import RecentQuizCard from "./_components/recent-quiz-card";

const QuizPage = () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }
  
  return (
    <div className="flex mx-auto md:items-center md:justify-center h-full p-6">
      <div className="flex mx-auto p-6 max-w-5xl">
        <QuizCard />
      </div>
      <div className="flex mx-auto max-w-5xl">
        <RecentQuizCard />
      </div>
    </div>
  );
};

export default QuizPage;
