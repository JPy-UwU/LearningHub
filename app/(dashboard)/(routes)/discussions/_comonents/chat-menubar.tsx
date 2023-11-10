import { Users } from "lucide-react";
import React from "react";

interface MenuBarProps{
  onUserMenuClick: () => void,
}

export default function ({onUserMenuClick}: MenuBarProps) {
  return (
    <div className="p-3 flex items-center justify-between bg-white border-e border-e-[#DBDDE1]">
      <div className="flex gap-6">
        <span title="Show users">
          <Users className="cursor-pointer" onClick={onUserMenuClick}/>
        </span>
      </div>
    </div>
  );
}
