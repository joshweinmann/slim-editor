import { useUserInterfaceContext } from "@context/UserInterfaceContext";
import { useGlobalKeymaps } from "@hooks/useGlobalKeymaps";
import { Tabs } from "@components/tabs/Tabs";
import { EditorWindow } from "@components/text/EditorWindow";
import { Sidebar } from "@components/sidebar/Sidebar";
import { SidebarPanel } from "@components/sidebar/panels/SidebarPanel";
import { StatusBar } from "@components/statusBar/StatusBar";

export function Editor() {
  useGlobalKeymaps();
  const { sidebarState } = useUserInterfaceContext();

  return (
    <main>
      <div
        className={`main-container ${
          sidebarState === "none" ? "" : "sidebar-open"
        }`}
      >
        <div className="editor-container">
          <Tabs />
          <EditorWindow />
        </div>

        {sidebarState !== "none" && <SidebarPanel />}

        <Sidebar />
      </div>

      <StatusBar />
    </main>
  );
}
