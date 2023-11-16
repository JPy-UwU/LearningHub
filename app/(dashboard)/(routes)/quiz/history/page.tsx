import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { LucideLayoutDashboard } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HistoryComponent from "./_components/history";

type Props = {};

const History = async (props: Props) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[400px]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              History
            </CardTitle>
            <Link className={buttonVariants()} href="/quiz">
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-scroll">
          <HistoryComponent limit={100} userId={userId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default History;