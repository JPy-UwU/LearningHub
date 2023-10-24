import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode
} 
) => {
  const { userId } = auth();

  if (isAdmin(userId)) {
    return redirect("/dashboard");
  }

  return <>{children}</>
}
 
export default DashboardLayout;