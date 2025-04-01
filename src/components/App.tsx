import { EditorContextProvider } from "@context/EditorContext";
import { UserInterfaceContextProvider } from "@context/UserInterfaceContext";
import { Editor } from "@components/Editor";

import "@styles/cursor.css";
import "@styles/editor.css";
import "@styles/main.css";
import "@styles/sidebar.css";
import "@styles/status-bar.css";
import "@styles/tabs.css";
import "@styles/variables.css";

export function App() {
  return (
    <EditorContextProvider>
      <UserInterfaceContextProvider>
        <Editor />
      </UserInterfaceContextProvider>
    </EditorContextProvider>
  );
}
