import { useEditorContext } from "@context/EditorContext";

export function StatusBar() {
  const { currentFile, cursor, directory } = useEditorContext();

  return (
    <div className="status-bar">
      {currentFile !== undefined && (
        <>
          <span className="value">
            {currentFile.path.replace(`${directory?.path}/`, "")}
          </span>

          <span>
            {"Line: "}
            <span className="value">{cursor.y + 1}</span>
            {" of "}
            {currentFile.lines.length}
            {", Col: "}
            <span className="value">{cursor.x + 1}</span>
            {" of "}
            {currentFile.lines[cursor.y].length + 1}
          </span>
        </>
      )}
    </div>
  );
}
