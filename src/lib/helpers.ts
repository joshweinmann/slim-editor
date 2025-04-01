import type { DirEntry } from "@tauri-apps/plugin-fs";
import type { DirectoryEntry } from "@type/types";

export function mapEntries(
  entries: DirEntry[],
  parentPath: string
): DirectoryEntry[] {
  return entries
    // filter out hidden files and directories
    .filter((entry) =>
      (entry.isDirectory || entry.isFile) && entry.name.charAt(0) !== "."
    )
    .map((entry) => ({
      name: entry.name,
      path: `${parentPath}/${entry.name}`,
      isDirectory: entry.isDirectory,
      isFile: entry.isFile,
      isSymlink: entry.isSymlink,
      entries: [],
    }))
    // sort alphabetically, directories first, then files
    .sort((a, b) => {
      if (a.isDirectory && b.isFile) {
        return -1;
      }
      if (a.isFile && b.isDirectory) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
}
