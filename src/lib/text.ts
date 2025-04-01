export function updateLines(
  prevFiles: any[],
  index: number,
  newLines: string[]
) {
  const editedFiles = [...prevFiles];

  editedFiles[index].lines = newLines;
  editedFiles[index].modified = true;
  
  return editedFiles;
};

export function editLine(
  lines: string[],
  lineIndex: number,
  transform: (line: string) => string
) {
  const newLines = [...lines];
  newLines[lineIndex] = transform(newLines[lineIndex]);
  return newLines;
}

export function insertTextAtPosition(line: string, x: number, value: string) {
  return line.slice(0, x) + value + line.slice(x);
}
