/**
 * SidebarItem component represents each link on sidebar.
 */

"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

// creating interface for props inside sidebar
interface SidebarItemProps {
  icon: LucideIcon,
  label: string,
  href: string,
}

const SidebarItem = ({
  icon: Icon,
  label,
  href
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // checking if a sidebar link is active or not.
  const isActive = 
    (pathname === "/dashboard" && href === "/dashboard") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  // onClick function, pushes api route to router.
  const onClick = () => {
    router.push(href);
  }

  return (
    // Using cn() for using function inside tailwindcss classes, more info on https://ui.shadcn.com/docs
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-sky-700 bg-sky-200/20 hover:text-sky-700 hover:bg-sky-200/20"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon 
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-sky-700"
          )}
          />
        {label}
      </div>
    </button>
  );
}
 
export default SidebarItem;