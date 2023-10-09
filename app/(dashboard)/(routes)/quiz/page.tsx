import { Button } from "@/components/ui/button";
import Link from "next/link";


const QuizPage = () => {
    return (
        <div className="p-6">
        <Link href="/quiz/new_quiz">
          <Button>
            Start Quiz        
          </Button>
        </Link>
        <Link href="/quiz/result">
          <Button>
            Quiz result        
          </Button>
        </Link>
      </div>
    );
}
 
export default QuizPage;