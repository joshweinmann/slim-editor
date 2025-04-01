import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { readDir } from "@tauri-apps/plugin-fs";

interface FileResult {
  file_name: string;
  lines: string[];
}

export async function openDirectoryFromDialog() {
  const dirPath = await open({
    multiple: false,
    directory: true,
  });

  if (dirPath === null) {
    throw new Error("No directory selected");
  }

  const entries = await readDir(dirPath);

  return {
    name: dirPath.split("/").pop() || "",
    dirPath,
    entries,
  };
}

export async function openDirectory(dirPath: string) {
  const entries = await readDir(dirPath);

  return { entries };
}

export async function openFile(filePath: string) {
  try {
    const result = await invoke<FileResult>("open_file", { filePath });

    return {
      fileName: result.file_name,
      lines: result.lines,
    };
  } catch (error) {
    throw new Error(error as string || "Failed to open file");
  }
}

export async function saveFile(filePath: string, contents: string) {
  try {
    await invoke("save_file", { filePath, contents });
  } catch (error) {
    throw new Error(error as string || "Failed to save file");
  }
}
