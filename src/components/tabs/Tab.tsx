import { FaXmark } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { useEditorContext } from "@context/EditorContext";

import type { OpenedFile } from "@type/types";

interface TabProps {
  file: OpenedFile;
  fileIndex: number;
}

export function Tab({ file, fileIndex }: TabProps) {
  const { openedFileIndex, setOpenedFileIndex, setOpenedFiles } =
    useEditorContext();

  const active = openedFileIndex === fileIndex;

  function handleTabClick() {
    setOpenedFileIndex(fileIndex);
  }

  function handleClose() {
    setOpenedFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(fileIndex, 1);
      return newFiles;
    });

    setOpenedFileIndex((prev) => {
      if (prev === fileIndex) {
        return undefined;
      } else if (prev !== undefined && prev > fileIndex) {
        return prev - 1;
      }
      return prev;
    });
  }

  return (
    <button
      className={`tab ${active ? "tab-active" : ""}`}
      onClick={handleTabClick}
    >
      {file.modified && <FaCircle size={8} />}

      <span>{file.fileName}</span>

      <span
        className="tab-close-button"
        onClick={(event) => {
          event.stopPropagation();
          handleClose();
        }}
      >
        <FaXmark />
      </span>
    </button>
  );
}
