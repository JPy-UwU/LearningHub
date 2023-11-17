"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

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
    <button>
      <div>
        <Icon />
        {lable}
      </div>
    </button>
  )
}