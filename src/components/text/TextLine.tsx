import { useEditorContext } from "@context/EditorContext";
import { Cursor } from "@components/text/Cursor";
import { LineNumber } from "@components/text/LineNumber";

interface TextLineProps {
  line: string;
  lineIndex: number;
}

export function TextLine({ line, lineIndex }: TextLineProps) {
  const { cursor } = useEditorContext();

  const isCurrentLine = lineIndex === cursor.y;

  const textLine = isCurrentLine ? (
    <>
      {line.slice(0, cursor.x)}
      <Cursor />
      {line.slice(cursor.x)}
    </>
  ) : (
    line
  );

  return (
    <div
      className={`text-line-container ${isCurrentLine ? "current-line" : ""}`}
    >
      <LineNumber lineIndex={lineIndex} isCurrentLine={isCurrentLine} />

      <div className="text-line">{textLine}</div>
    </div>
  );
}
