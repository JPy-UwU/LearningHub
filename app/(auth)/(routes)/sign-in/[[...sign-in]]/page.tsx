/**
 * Route: /sign-in
 * Description: Sign-in authentication added from clerk library. More info on https://clerk.com/docs/references/nextjs/overview.
 */

import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return <SignIn />;
}