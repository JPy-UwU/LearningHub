// page.tsx

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import NavBar from './NavBar';
import LibraryBanner from './LibraryBanner';
import WhyUs from './WhyUs';
const LandingPage = () => {

  return (
    <div>
      <NavBar />
      <LibraryBanner />
      <WhyUs /> 
      {/* <div className="flex justify-center space-x-4 mt-10">
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
      </div> */}
    </div>
  );
}

export default LandingPage;
