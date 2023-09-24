/**
 * Route: /sign-up
 * Description: Sign-up authentication added from clerk library. More info on https://clerk.com/docs/references/nextjs/overview.
 */

import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return <SignUp />;
}