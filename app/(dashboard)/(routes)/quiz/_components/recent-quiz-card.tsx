import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RecentQuiz = () => {
  return (
    <Link href="/quiz/history">
      <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Recent Activity
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
