import { Preview } from "./Preview";
import { EditorFile, ImageFile } from "../types/editor";

interface PreviewPaneProps {
  files: EditorFile[];
  images: ImageFile[];
}

export function PreviewPane({ files, images }: PreviewPaneProps) {
  return (
    <div className="h-full">
      <Preview files={files} images={images} />
    </div>
  );
}
