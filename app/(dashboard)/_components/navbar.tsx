import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";

const font = Montserrat({ weight: '600', subsets: ['latin'] });


const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm pl-6">
      <Link href="/dashboard" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/logo.png" />
        </div>
        <h1 className={cn("text-2xl font-bold text-[#2C2D2E]", font.className)}>
          Learning Hub
        </h1>
      </Link>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
}
 
export default Navbar;