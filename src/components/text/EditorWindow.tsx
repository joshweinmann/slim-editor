import { useEditorContext } from "@context/EditorContext";
import { useEditorControls } from "@hooks/useEditorControls";
import { TextLine } from "@components/text/TextLine";

export function EditorWindow() {
  const { currentFile, setOpenedFiles, openedFileIndex, cursor, setCursor } =
    useEditorContext();

  const { lines = [] } = currentFile || {};

  const { handleKeyDown } = useEditorControls(
    lines,
    cursor,
    setCursor,
    setOpenedFiles,
    openedFileIndex
  );

  return (
    <div className="editor-window" tabIndex={0} onKeyDown={handleKeyDown}>
      {lines.map((line, idx) => (
        <TextLine key={idx} line={line} lineIndex={idx} />
      ))}
    </div>
  );
}
