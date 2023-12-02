"use client";

import { z } from "zod";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import { differenceInSeconds } from "date-fns";
import { Game, Question } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";


import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatTimeDelta } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import OpenEndedPercentage from "../_components/open-ended-percentage";
import BlankAnswerInput from "../_components/blank-answer-input";

const checkAnswerSchema = z.object({
  userInput: z.string(),
  questionId: z.string(),
});

const endGameSchema = z.object({
  gameId: z.string(),
});

const OpenEnded = ({ 
  game 
}: {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
}) => {
  const [hasEnded, setHasEnded] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [blankAnswer, setBlankAnswer] = useState("");
  const [averagePercentage, setAveragePercentage] = useState(0);

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post(`/api/quiz/endGame`, payload);
      return response.data;
    },
  });


  const [now, setNow] = useState(new Date());
  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      let filledAnswer = blankAnswer;
      document.querySelectorAll<HTMLInputElement>("#user-blank-input").forEach((input) => {
        filledAnswer = input.value;
        (input as HTMLInputElement).value = "";
      });
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: filledAnswer,
      };
      const response = await axios.post(`/api/quiz/checkAnswer`, payload);
      return response.data;
    },
  });

  useEffect(() => {
    if (!hasEnded) {
      const interval = setInterval(() => {
        setNow(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasEnded]);

  const handleNext = useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast(`Your answer is ${percentageSimilar}% similar to the correct answer`);
        setAveragePercentage((prev) => {
          return (prev + percentageSimilar) / (questionIndex + 1);
        });

        if (questionIndex === game.questions.length - 1) {
          endGame();
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
      onError: (error) => {
        console.error(error);
        toast.error("Something went wrong");
      },
    });
  }, [checkAnswer, questionIndex, endGame, game.questions.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === "Enter") {
        handleNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  if (hasEnded) {
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          You Completed in{" "}
          {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
        </div>
        <Link
          href={`/quiz/statistics/${game.id}`}
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          View Statistics
          <BarChart className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          {/* topic */}
          <p>
            <span className="text-slate-400">Topic</span> &nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>
        <OpenEndedPercentage percentage={averagePercentage} />
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion?.question}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        <BlankAnswerInput
          setBlankAnswer={setBlankAnswer}
          answer={currentQuestion.answer}
        />
        <Button
          variant="outline"
          className="mt-4"
          disabled={isChecking || hasEnded}
          onClick={() => {
            handleNext();
          }}
        >
          {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OpenEnded;
