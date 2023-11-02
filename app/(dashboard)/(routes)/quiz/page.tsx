import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const QuizPage = () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }
  
  return (
    <div>
      <h1>Quiz</h1>
    </div>
  );
};

export default QuizPage;
