"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, CopyCheck } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {useMutation} from "@tanstack/react-query"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingQuestions from "../_components/loading-questions";

const quizCreationSchema = z.object({
  topic: z.string().min(4, {
      message: "Topic must be at least 4 characters long",
    }).max(50, {
      message: "Topic must be at most 50 characters long",
    }),
    type: z.enum(["mcq", "open_ended"]),
    amount: z.number().min(1).max(10),
  });

  type Props = {
    topic: string;
  };
  
  interface inputProps {
    topic: string;
    type: ["mcq", "open_ended"];
    amount: number;
  }

  const CreatePage = ({ 
    topic: topicParam,
  }: {
    topic: string;
  }) => {
    const router = useRouter();
    const [showLoader, setShowLoader] = useState(false);
    const [finishedLoading, setFinishedLoading] = useState(false);
    const { mutate: getQuestions, isPending } = useMutation({
      mutationFn: async ({ amount, topic, type }: inputProps) => {
        const response = await axios.post("/api/game", { amount, topic, type });
        return response.data;
      },
    });
  const form = useForm<z.infer<typeof quizCreationSchema>>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      topic: topicParam,
      type: "mcq",
      amount: 3,
    },
  });

  const onSubmit = async (values: z.infer<typeof quizCreationSchema>) => {
    setShowLoader(true);

    try {
      const response = await axios.post("/api/game", values);
      setFinishedLoading(true);
      setTimeout(() => {
        if (form.getValues("type") === "mcq") {
          router.push(`/play/mcq/${response.data.gameId}`);
        } else if (form.getValues("type") === "open_ended") {
          router.push(`/play/open-ended/${response.data.gameId}`);
        }
      }, 2000);
    } catch (error) {
      setShowLoader(false);
      toast.error("Something went wrong.");
    }
  };
  form.watch();

  if (showLoader) {
    return <LoadingQuestions finished={finishedLoading} />;
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please provide any topic you would like to be quizzed on
                      here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="How many questions?"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          form.setValue("amount", parseInt(e.target.value));
                        }}
                        min={1}
                        max={10}
                      />
                    </FormControl>
                    <FormDescription>
                      You can choose how many questions you would like to be
                      quizzed on here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button
                  variant={
                    form.getValues("type") === "mcq" ? "default" : "secondary"
                  }
                  className="w-1/2 rounded-none rounded-l-lg"
                  onClick={() => {
                    form.setValue("type", "mcq");
                  }}
                  type="button"
                >
                  <CopyCheck className="w-4 h-4 mr-2" /> Multiple Choice
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant={
                    form.getValues("type") === "open_ended"
                      ? "default"
                      : "secondary"
                  }
                  className="w-1/2 rounded-none rounded-r-lg"
                  onClick={() => form.setValue("type", "open_ended")}
                  type="button"
                >
                  <BookOpen className="w-4 h-4 mr-2" /> Open Ended
                </Button>
              </div>
              <Button disabled={showLoader} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePage;