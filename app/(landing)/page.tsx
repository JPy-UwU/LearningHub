/**
 * Route: /
 * Description: A landing page for the website, contanins sign-up and sign-in links
 */

"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <div>
      Landing Page
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button>
            Sign Up
          </Button>
        </Link>
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button>
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}
 
export default LandingPage;