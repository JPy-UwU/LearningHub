"use client";

import { LogOut } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "./ui/button";
import { isAdmin } from "@/lib/admin";
import { SearchInput } from "./search-input";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  if (!userId) 
    return null;

  const isAdminPage = pathname?.startsWith("/admin");
  const isCoursePage = pathname?.includes("/courses");
  const isBrowsePage = pathname === "/browse";

  return (
    <>
    {isBrowsePage && (
      <div className="hidden md:block">
        <SearchInput />
      </div>
    )}
    <div className="flex gap-2 ml-auto">
      {isAdminPage || isCoursePage ?  (
        <Link href="/dashboard">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ): isAdmin(userId) ? (
        <Link href="/admin/courses">
          <Button size="sm" variant="ghost">
            Admin Mode
          </Button>
        </Link>
      ) : null}
      <UserButton afterSignOutUrl="/" />
    </div>
    </>
  );
}
 
export default NavbarRoutes;