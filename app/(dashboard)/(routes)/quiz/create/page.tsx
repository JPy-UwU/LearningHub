import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import QuizCreation from "./_components/quiz-creation";

const Quiz = ({ 
  searchParams 
}: {
  searchParams: {
    topic?: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  return <QuizCreation topic={searchParams.topic ?? ""} />;
};

export default Quiz;