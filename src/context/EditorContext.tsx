import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { openDirectory, openFile, saveFile } from "@lib/fileSystem";
import { mapEntries } from "@lib/helpers";

import type {
  CursorCoordinates,
  Directory,
  DirectoryEntry,
  OpenedFile,
} from "@type/types";

interface EditorState {
  directory?: Directory;
  setDirectory: Dispatch<SetStateAction<Directory | undefined>>;
  openedFiles: OpenedFile[];
  setOpenedFiles: Dispatch<SetStateAction<OpenedFile[]>>;
  openedFileIndex?: number;
  setOpenedFileIndex: Dispatch<SetStateAction<number | undefined>>;
  currentFile?: OpenedFile;
  setCurrentFile: (path: string) => Promise<void>;
  cursor: CursorCoordinates;
  setCursor: Dispatch<SetStateAction<CursorCoordinates>>;
  saveCurrentFile: () => Promise<void>;
  expandDirectory: (path: string) => Promise<void>;
}

interface EditorContextProviderProps {
  children: React.ReactNode;
}

const EditorContext = createContext<EditorState | undefined>(undefined);

export function EditorContextProvider({
  children,
}: EditorContextProviderProps) {
  const [directory, setDirectory] = useState<Directory>();
  const [openedFiles, setOpenedFiles] = useState<OpenedFile[]>([]);
  const [openedFileIndex, setOpenedFileIndex] = useState<number>();
  const [cursor, setCursor] = useState<CursorCoordinates>({
    x: 0,
    y: 0,
  });

  const currentFile =
    openedFileIndex !== undefined ? openedFiles[openedFileIndex] : undefined;

  // reset cursor when opened file changes
  useEffect(() => setCursor({ x: 0, y: 0 }), [currentFile?.path]);

  async function expandDirectory(path: string) {
    try {
      const { entries } = await openDirectory(path);

      const newEntries = mapEntries(entries, path);

      setDirectory((prev) => {
        if (!prev) return prev;

        // Recursively update the directory structure
        const updateEntries = (entries: DirectoryEntry[]): DirectoryEntry[] => {
          return entries.map((entry) => {
            if (entry.path === path) {
              // Found the matching directory, update its entries
              return {
                ...entry,
                entries: newEntries,
              };
            }
            if (entry.isDirectory && entry.entries.length > 0) {
              // Recursively update subdirectories
              return {
                ...entry,
                entries: updateEntries(entry.entries),
              };
            }
            return entry;
          });
        };

        return {
          ...prev,
          entries: updateEntries(prev.entries),
        };
      });
    } catch (error) {
      console.error("Error expanding directory:", error);
    }
  }

  async function setCurrentFile(path: string) {
    try {
      // check if file is already opened
      if (openedFiles.some((f) => f.path === path)) {
        const index = openedFiles.findIndex((f) => f.path === path);

        setOpenedFileIndex(index);
      }

      // open file and set as current file
      else {
        const { fileName, lines } = await openFile(path);

        setOpenedFiles((prev) => [
          ...prev,
          {
            fileName,
            path,
            modified: false,
            lines,
          },
        ]);

        setOpenedFileIndex(openedFiles.length);
      }
    } catch (error) {
      console.error("Error setting current file:", error);
    }
  }

  async function saveCurrentFile() {
    try {
      if (currentFile) {
        await saveFile(currentFile.path, currentFile.lines.join("\n"));

        // update file modified status to false
        setOpenedFiles((prev) =>
          prev.map((file) =>
            file.path === currentFile.path ? { ...file, modified: false } : file
          )
        );
      }
    } catch (error) {
      console.error("Error saving file:", error);
    }
  }

  return (
    <EditorContext.Provider
      value={{
        directory,
        setDirectory,
        openedFiles,
        setOpenedFiles,
        openedFileIndex,
        setOpenedFileIndex,
        currentFile,
        setCurrentFile,
        cursor,
        setCursor,
        saveCurrentFile,
        expandDirectory,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  const context = useContext(EditorContext);

  if (context === undefined) {
    throw new Error(
      "useEditorContext must be used within a EditorContextProvider"
    );
  }

  return context;
}
