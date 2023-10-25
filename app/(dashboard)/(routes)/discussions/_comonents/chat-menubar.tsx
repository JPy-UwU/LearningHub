import { Users } from "lucide-react";
import React from "react";

export default function () {
  return (
    <div className="p-3 flex items-center justify-between bg-white border-e border-e-[#DBDDE1]">
      <div className="flex gap-6">
        <span title="Show users">
          <Users className="cursor-pointer" />
        </span>
      </div>
    </div>
  );
}
