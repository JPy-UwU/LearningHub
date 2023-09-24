/**
 * Route: /dashboard
 * Description: a dashboard page, where everything comes togather
 */

import { UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
 
export default Home;