/**
 * SidebarRoutes component contains api route, icon and label for each SidebarItem.
 */

"use client";

import SidebarItem from "./sidebar-item";

import { Compass, Layout, MessagesSquare } from "lucide-react";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
  {
    icon: MessagesSquare,
    label: "Discussions",
    href: "/discussions"
  },
]

const SidebarRoutes = () => {
  const routes = guestRoutes;

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