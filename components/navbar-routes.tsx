"use client";

import { LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "./ui/button";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-2 ml-auto">
      {isAdminPage || isPlayerPage ?  (
        <Link href="/dashboard">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ): (
        <Link href="/admin/courses">
          <Button size="sm" variant="ghost">
            Admin Mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
 
export default NavbarRoutes;