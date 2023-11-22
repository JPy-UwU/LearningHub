import Link from "next/link";

import { Button } from "@/components/ui/button";

const LandingPage = () => {

  return (
    <div>
      <Link href="/sign-up">
        <Button>Sign up</Button>
      </Link>
      <Link href="/sign-in">
        <Button>Sign in</Button>
      </Link>
    </div>
  );
}

export default LandingPage;
