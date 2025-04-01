import type { Direction, CursorCoordinates } from "@type/types";

export function moveCursor(
  prev: CursorCoordinates,
  direction: Direction,
  lines: string[]
) {
  switch (direction) {
    case "left": {
      if (prev.x === 0 && prev.y === 0) {
        return prev;
      }

      if (prev.x === 0) {
        return {
          x: lines[Math.max(0, prev.y - 1)].length,
          y: Math.max(0, prev.y - 1),
        };
      }
      
      return { x: prev.x - 1, y: prev.y };
    }
    case "right":{
      const lineLength = lines[prev.y].length;

      if (prev.x === lineLength && prev.y === lines.length - 1) {
        return prev;
      }

      if (prev.x === lineLength) {
        return {
          x: 0,
          y: Math.min(lines.length - 1, prev.y + 1),
        };
      }
      
      return { x: prev.x + 1, y: prev.y };
    }
    case "up":{
      if (prev.y === 0) {
        return prev;
      }

      return {
        x: Math.min(lines[prev.y - 1].length, prev.x),
        y: prev.y - 1,
      };
    }
    case "down":{
      if (prev.y === lines.length - 1) {
        return prev;
      }

      return {
        x: Math.min(lines[prev.y + 1].length, prev.x),
        y: prev.y + 1,
      };
    }
  }
}

export function moveCursorAfterEdit(
  prev: CursorCoordinates,
  offset: number = 1,
  newLine: boolean = false
) {
  return {
    x: newLine ? 0 : prev.x + offset,
    y: newLine ? prev.y + 1 : prev.y,
  }
}
