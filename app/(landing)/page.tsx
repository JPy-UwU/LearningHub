/**
 * Route: /
 * Description: A landing page for the website, contanins sign-up and sign-in links
 */


import Link from "next/link";

import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div>
      Landing Page
      <div>
        <Link href="/sign-up">
          <Button>
            Sign Up
          </Button>
        </Link>
        <Link href="/sign-in">
          <Button>
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}
 
export default LandingPage;