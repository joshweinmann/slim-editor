import { useUserInterfaceContext } from "@context/UserInterfaceContext";
import { TreePanel } from "@components/sidebar/panels/tree/TreePanel";

export function SidebarPanel() {
  const { sidebarState } = useUserInterfaceContext();

  return (
    <div className="sidebar-panel">
      {(() => {
        switch (sidebarState) {
          case "tree":
            return <TreePanel />;
          case "search":
            return <div>Search View</div>;
          case "git":
            return <div>Git View</div>;
          case "terminal":
            return <div>Terminal View</div>;
          case "http":
            return <div>HTTP Request View</div>;
          case "ai":
            return <div>AI View</div>;
          case "settings":
            return <div>Settings View</div>;
          default:
            undefined;
        }
      })()}
    </div>
  );
}
