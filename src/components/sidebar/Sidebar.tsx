import {
  FaGitAlt,
  FaMagic,
  FaRegFolder,
  FaSearch,
  FaTerminal,
} from "react-icons/fa";
import { FaGears, FaShareNodes } from "react-icons/fa6";
import { SidebarButton } from "@components/sidebar/SidebarButton";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <SidebarButton icon={<FaRegFolder size={24} />} sidebarKey="tree" />
      <SidebarButton icon={<FaSearch size={24} />} sidebarKey="search" />
      <SidebarButton icon={<FaGitAlt size={24} />} sidebarKey="git" />
      <SidebarButton icon={<FaTerminal size={24} />} sidebarKey="terminal" />
      <SidebarButton icon={<FaShareNodes size={24} />} sidebarKey="http" />
      <SidebarButton icon={<FaMagic size={24} />} sidebarKey="ai" />
      <SidebarButton icon={<FaGears size={24} />} sidebarKey="settings" />
    </aside>
  );
}
