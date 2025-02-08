import { Preview } from "./Preview";
import { EditorFile } from "../types/editor";

interface PreviewPaneProps {
  files: EditorFile[];
}

export function PreviewPane({ files }: PreviewPaneProps) {
  return (
    <div className="h-full">
      <Preview files={files} />
    </div>
  );
}
