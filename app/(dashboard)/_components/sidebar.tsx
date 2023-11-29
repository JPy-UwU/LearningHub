import Image from "next/image";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="mx-auto"
        />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
}
 
export default Sidebar;