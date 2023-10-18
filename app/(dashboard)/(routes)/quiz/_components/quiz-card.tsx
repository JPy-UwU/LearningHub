import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuizNow = () => {
  return (
    <Link href="/quiz/create">
      <Card className="hover:course-pointer hover;opecity-75">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold">Quiz Yourself !!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            It is your topic and your Quiz ....
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default QuizNow;
