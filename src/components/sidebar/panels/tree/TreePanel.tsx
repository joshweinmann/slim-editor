import { useEditorContext } from "@context/EditorContext";
import { openDirectoryFromDialog } from "@lib/fileSystem";
import { mapEntries } from "@lib/helpers";
import { renderTreeItem } from "@components/sidebar/panels/tree/renderTreeItem";

import type { DirectoryEntry } from "@type/types";

export function TreePanel() {
  const { directory, setDirectory, setCurrentFile, expandDirectory } =
    useEditorContext();

  async function selectDirectory() {
    try {
      const { name, dirPath, entries } = await openDirectoryFromDialog();

      setDirectory({
        name,
        path: dirPath,
        entries: mapEntries(entries, dirPath),
      });
    } catch (error) {
      console.error("Error selecting directory:", error);
    }
  }

  function selectTreeItem(entry: DirectoryEntry) {
    // if entry is a directory and has not been expanded yet
    if (entry.isDirectory && entry.entries.length === 0) {
      expandDirectory(entry.path);
      return;
    }

    if (entry.isFile) {
      setCurrentFile(entry.path);
    }
  }

  // just show open directory button if no directory is selected
  if (!directory) {
    return (
      <button className="open-directory-button" onClick={selectDirectory}>
        Open Directory...
      </button>
    );
  }

  return (
    <>
      <div className="sidebar-header">{directory.name}</div>

      <div className="sidebar-content">
        {directory.entries.map((entry) =>
          renderTreeItem({ entry, selectTreeItem })
        )}
      </div>
    </>
  );
}
