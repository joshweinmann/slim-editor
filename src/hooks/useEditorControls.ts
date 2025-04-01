import { useCallback, type KeyboardEvent } from "react";
import { moveCursor, moveCursorAfterEdit } from "@lib/cursor";
import { insertTextAtPosition, updateLines, editLine } from "@lib/text";

import type { CursorCoordinates, OpenedFile } from "@type/types";

export function useEditorControls(
  lines: string[],
  cursor: CursorCoordinates,
  setCursor: (cursor: CursorCoordinates | ((prev: CursorCoordinates) => CursorCoordinates)) => void,
  setOpenedFiles: (files: OpenedFile[] | ((prev: OpenedFile[]) => OpenedFile[])) => void,
  openedFileIndex?: number
) {
  const handleBackspace = useCallback(() => {
    if (cursor.x === 0 && cursor.y === 0) return;

    setOpenedFiles((prev) => {
      const editedFiles = [...prev];
      const editedLines = [...editedFiles[openedFileIndex!].lines];

      if (cursor.x === 0) {
        const newLine = editedLines[cursor.y - 1] + editedLines[cursor.y];
        editedLines.splice(cursor.y - 1, 2, newLine);
      } else {
        editedLines[cursor.y] =
          editedLines[cursor.y].slice(0, cursor.x - 1) +
          editedLines[cursor.y].slice(cursor.x);
      }

      editedFiles[openedFileIndex!].lines = editedLines;
      editedFiles[openedFileIndex!].modified = true;
      
      return editedFiles;
    });

    setCursor((prev) => moveCursor(prev, "left", lines));
  }, [cursor, lines, openedFileIndex, setCursor, setOpenedFiles]);

  const handleEnter = useCallback(() => {
    setOpenedFiles((prev) => {
      const editedLines = [...prev[openedFileIndex!].lines];
      const line = editedLines[cursor.y];
      const newLine = line.slice(0, cursor.x);
      editedLines.splice(cursor.y, 1, newLine, line.slice(cursor.x));
      return updateLines(prev, openedFileIndex!, editedLines);
    });

    setCursor((prev) => moveCursorAfterEdit(prev, 0, true));
  }, [cursor, openedFileIndex, setCursor, setOpenedFiles]);

  const handleTab = useCallback(() => {
    setOpenedFiles((prev) => {
      const editedLines = editLine(
        prev[openedFileIndex!].lines,
        cursor.y,
        (line) => insertTextAtPosition(line, cursor.x, "  ")
      );
      return updateLines(prev, openedFileIndex!, editedLines);
    });

    setCursor((prev) => moveCursorAfterEdit(prev, 2));
  }, [cursor, openedFileIndex, setCursor, setOpenedFiles]);

  const handleCharacterInput = useCallback((key: string) => {
    if (key.length !== 1) return;

    setOpenedFiles((prev) => {
      const editedLines = editLine(
        prev[openedFileIndex!].lines,
        cursor.y,
        (line) => insertTextAtPosition(line, cursor.x, key)
      );
      return updateLines(prev, openedFileIndex!, editedLines);
    });

    setCursor((prev) => moveCursorAfterEdit(prev));
  }, [cursor, openedFileIndex, setCursor, setOpenedFiles]);

  const handleMoveLineUp = useCallback(() => {
    if (cursor.y === 0) return;

    setOpenedFiles((prev) => {
      const editedFiles = [...prev];
      const editedLines = [...editedFiles[openedFileIndex!].lines];
      const currentLine = editedLines[cursor.y];
      editedLines[cursor.y] = editedLines[cursor.y - 1];
      editedLines[cursor.y - 1] = currentLine;
      editedFiles[openedFileIndex!].lines = editedLines;
      editedFiles[openedFileIndex!].modified = true;
      return editedFiles;
    });

    setCursor((prev) => ({ ...prev, y: prev.y - 1 }));
  }, [cursor, openedFileIndex, setCursor, setOpenedFiles]);

  const handleMoveLineDown = useCallback(() => {
    if (cursor.y === lines.length - 1) return;

    setOpenedFiles((prev) => {
      const editedFiles = [...prev];
      const editedLines = [...editedFiles[openedFileIndex!].lines];
      const currentLine = editedLines[cursor.y];
      editedLines[cursor.y] = editedLines[cursor.y + 1];
      editedLines[cursor.y + 1] = currentLine;
      editedFiles[openedFileIndex!].lines = editedLines;
      editedFiles[openedFileIndex!].modified = true;
      return editedFiles;
    });

    setCursor((prev) => ({ ...prev, y: prev.y + 1 }));
  }, [cursor, lines, openedFileIndex, setCursor, setOpenedFiles]);

  const handleDeleteLine = useCallback(() => {
    if (lines.length === 1 && lines[0] === "") return;

    setOpenedFiles((prev) => {
      const editedFiles = [...prev];
      const editedLines = [...editedFiles[openedFileIndex!].lines];
      editedLines.splice(cursor.y, 1);
      if (editedLines.length === 0) {
        editedLines.push("");
      }
      editedFiles[openedFileIndex!].lines = editedLines;
      editedFiles[openedFileIndex!].modified = true;
      return editedFiles;
    });

    setCursor((prev) => ({
      x: 0,
      y: Math.min(prev.y, lines.length === 1 ? 0 : lines.length - 2)
    }));
  }, [cursor, lines, openedFileIndex, setCursor, setOpenedFiles]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault();

    if (event.ctrlKey) return;

    if (event.metaKey) {
      switch (event.key) {
        case "ArrowLeft":
          setCursor((prev) => ({ x: 0, y: prev.y }));
          break;
        case "ArrowRight":
          setCursor((prev) => ({ x: lines[prev.y].length, y: prev.y }));
          break;
        case "ArrowUp":
          setCursor({ x: 0, y: 0 });
          break;
        case "ArrowDown":
          setCursor({ x: 0, y: lines.length - 1 });
          break;
        case "x":
          handleDeleteLine();
          break;
      }
      return;
    }

    if (event.altKey) {
      switch (event.key) {
        case "ArrowUp":
          handleMoveLineUp();
          break;
        case "ArrowDown":
          handleMoveLineDown();
          break;
      }
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
        setCursor((prev) => moveCursor(prev, "left", lines));
        break;
      case "ArrowRight":
        setCursor((prev) => moveCursor(prev, "right", lines));
        break;
      case "ArrowUp":
        setCursor((prev) => moveCursor(prev, "up", lines));
        break;
      case "ArrowDown":
        setCursor((prev) => moveCursor(prev, "down", lines));
        break;
      case "Backspace":
        handleBackspace();
        break;
      case "Enter":
        handleEnter();
        break;
      case "Tab":
        handleTab();
        break;
      default:
        handleCharacterInput(event.key);
        break;
    }
  }, [
    lines,
    cursor,
    setCursor,
    setOpenedFiles,
    openedFileIndex,
    handleBackspace,
    handleEnter,
    handleTab,
    handleCharacterInput,
    handleMoveLineUp,
    handleMoveLineDown,
    handleDeleteLine
  ]);

  return { handleKeyDown };
}