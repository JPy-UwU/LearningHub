"use client";

import { usePathname } from "next/navigation";
import { BarChart, Compass, Layout, List, MessagesSquare, ClipboardList } from "lucide-react";

import SidebarItem from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/browse",
  },
  {
    icon: MessagesSquare,
    label: "Discussions",
    href: "/discussions"
  },
  {
    icon: ClipboardList,
    label: "Quiz",
    href: "/quiz"
  },
];

const adminRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/admin/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/admin/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  const routes = isAdminPage ? adminRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem 
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}
 
export default SidebarRoutes;