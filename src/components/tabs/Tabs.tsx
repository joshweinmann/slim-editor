import { useEditorContext } from "@context/EditorContext";
import { Tab } from "@components/tabs/Tab";

export function Tabs() {
  const { openedFiles } = useEditorContext();

  return (
    <div className="tabs">
      {openedFiles.map((file, fileIndex) => (
        <Tab key={fileIndex} file={file} fileIndex={fileIndex} />
      ))}
    </div>
  );
}
