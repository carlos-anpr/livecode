import { Editor } from './Editor';
import { EditorFile } from '../types/editor';

interface EditorPaneProps {
  files: EditorFile[];
  activeFileId: string;
  onChange: (content: string) => void;
}

export function EditorPane({ files, activeFileId, onChange }: EditorPaneProps) {
  return (
    <div className="h-full relative">
      {files.map(file => (
        <div
          key={file.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: file.id === activeFileId ? 'block' : 'none'
          }}
        >
          <Editor
            file={file}
            onChange={(content) => onChange(content)}
          />
        </div>
      ))}
    </div>
  );
}
