export interface OpenedFile {
  fileName: string;
  path: string;
  modified: boolean;
  lines: string[];
}

export interface Directory {
  name: string;
  path: string;
  entries: DirectoryEntry[];
}

export interface DirectoryEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  isFile: boolean;
  isSymlink: boolean;
  entries: DirectoryEntry[];
}

export interface CursorCoordinates {
  x: number;
  y: number;
}

export type Direction = "left" | "right" | "up" | "down";

export type SidebarState =
  | "tree"
  | "search"
  | "git"
  | "terminal"
  | "http"
  | "ai"
  | "settings"
  | "none";
  