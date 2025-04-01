import { useEditorContext } from "@context/EditorContext";

interface LineNumberProps {
  lineIndex: number;
  isCurrentLine?: boolean;
}

export function LineNumber({
  lineIndex,
  isCurrentLine = false,
}: LineNumberProps) {
  const { currentFile } = useEditorContext();

  const { lines = [] } = currentFile || {};

  return (
    <div className={`line-number ${isCurrentLine ? " current-line" : ""}`}>
      {`${lineIndex + 1}`.padStart(lines.length.toString().length, " ")}
    </div>
  );
}
