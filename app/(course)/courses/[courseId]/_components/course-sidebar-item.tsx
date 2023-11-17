"use client";


import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface CoureSidebarIteamProps {
  lable: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export const CourseSidebarIteam = ({
  lable,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CoureSidebarIteamProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle)
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push('/courses/${courseId}/chapters/${id}');
  }

  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20", 
      )}
    >
      <div>
        <Icon />
        {lable}
      </div>
    </button>
  )
}