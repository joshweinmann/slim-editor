import { FaRegFolder, FaRegFolderOpen, FaRegFile } from "react-icons/fa";

import type { DirectoryEntry } from "@type/types";

export function renderTreeItem({
  entry,
  selectTreeItem,
  level = 0,
}: {
  entry: DirectoryEntry;
  selectTreeItem: (entry: DirectoryEntry) => void;
  level?: number;
}) {
  const icon = entry.isDirectory ? (
    entry.entries.length > 0 ? (
      <FaRegFolderOpen />
    ) : (
      <FaRegFolder />
    )
  ) : (
    <FaRegFile />
  );

  return (
    <div key={entry.name} className="tree-item-container">
      <button
        className="tree-item"
        onClick={(event) => {
          event.stopPropagation();

          selectTreeItem(entry);
        }}
        style={{ paddingLeft: level === 0 ? 0 : `${level * 16}px` }}
      >
        <div>{icon}</div>
        <div>{entry.name}</div>
      </button>

      {entry.entries.map((childEntry) =>
        renderTreeItem({ entry: childEntry, selectTreeItem, level: level + 1 })
      )}
    </div>
  );
}
