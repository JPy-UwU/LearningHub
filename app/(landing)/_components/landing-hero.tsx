"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Start Learning With</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
          <TypewriterComponent
            options={{
              strings: [
                "Unique Courses.",
                "AI Quizzes.",
                "Discussion Board.",
                "Great Community."
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Learn using AI 10x faster.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="default" className="md:text-lg p-4 md:p-6 rounded-lg font-semibold">
            Start Learning For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>
  );
};