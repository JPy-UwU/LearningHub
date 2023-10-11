"use client";

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormLabel,
  FormDescription,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title:z.string().min(1,{
    message: "A topic is required", }),
    numberOfQuestions:z.number().int().min(1,{
      message: "number of questions is required",}),
});


const StartQuizPage = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),

      defaultValues: {
        title: "",
        
        numberOfQuestions: 0,
      },
    });
    
    const { isSubmitting, isValid } = form.formState;
  
    const onSubmit = async (values: z.infer<typeof formSchema>) => { 
      try {
        const response = await axios.post("/quiz/new_quiz/quiz_ai", values);
        router.push(`/quiz/new_quiz/quiz_ai/${response.data.id}`);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    console.log("isvalid", isValid);
    return (
      <div className="flex mx-auto max-w-5x md:items-center md:justify-center h-full p-6">
        <div>
          <h1 className="text-5xl">Quiz Yourself !!</h1>
          <p className="text-sm text-slate-600">Enter any topic to generate quiz questions and test your knowledge. </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}className="space-y-8 mt-8">
              <FormField
                control={form.control}
                name="title"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Quiz topic</FormLabel>
                      <FormControl>
                      <Input disabled={isSubmitting} placeholder="e.g. 'basic Python'"{...field}/>
                      </FormControl>
                  </FormItem>)}/>
                  <FormField
                  control={form.control}
                  name="numberOfQuestions"
                  render={({ field }) => (
                        <FormItem>
                        <FormLabel>Number of Questions</FormLabel>
                        <FormControl>
                        <Input type="number" disabled={isSubmitting} placeholder="e.g. '20'"{...field}/>
                        </FormControl>
                        </FormItem>)}/>
              <FormDescription>Do not worry!</FormDescription>
              <FormDescription>This is not for marks ;)</FormDescription>
              <FormMessage />
                <div className="flex items-center gap-x-2">
                  <Link href="/quiz/new_quiz/Quiz">
                    <Button
                    type="button"
                    variant="ghost"
                    >Cancel
                   </Button>
                </Link>
                  <Button
                  type="submit" 
                  // disabled= {isSubmitting || !isValid}
                  >
                  Continue
                  </Button>
              </div>
              </form>
          </Form>
          </div>
      </div>
    );
  }
   
export default StartQuizPage;

