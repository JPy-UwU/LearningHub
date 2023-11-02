import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import QuizMeCard from "./_components/quiz-me-card";
import HistoryCard from "./_components/history-card";
import HotTopicsCard from "./_components/hot-topics-card";
import RecentActivityCard from "./_components/recent-activity-card";

const QuizPage = () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }
  
  return (
    <div className="h-full">
      <main className="p-8 mx-auto max-w-7xl">
      {/* <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
        <DetailsDialog />
      </div> */}

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicsCard />
        <RecentActivityCard />
      </div>
    </main>
    </div>
  );
};

export default QuizPage;
