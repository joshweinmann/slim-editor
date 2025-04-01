import { useUserInterfaceContext } from "@context/UserInterfaceContext";

import type { ReactNode } from "react";
import type { SidebarState } from "@type/types";

interface SidebarButtonProps {
  icon: ReactNode;
  sidebarKey: SidebarState;
}

export function SidebarButton({ icon, sidebarKey }: SidebarButtonProps) {
  const { sidebarState, setSidebarState } = useUserInterfaceContext();

  const active = sidebarKey === sidebarState;

  function toggleSidebar() {
    setSidebarState((prev) => (prev === sidebarKey ? "none" : sidebarKey));
  }

  return (
    <div
      className={`sidebar-icon ${active ? "open" : ""}`}
      onClick={toggleSidebar}
    >
      {icon}
    </div>
  );
}
