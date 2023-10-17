"use client";

import { useRouter } from "next/router";
import { Card ,CardContent ,CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Props = {};

const QuizNow = (props:Props) => {
    // const router = useRouter();
    return (
      <Link href="/quiz/new_quiz">
      <Card
      className="hover:course-pointer hover;opecity-75"
      onClick={() =>{
        // router.push("/new_quiz");
        }} 
        > 
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
