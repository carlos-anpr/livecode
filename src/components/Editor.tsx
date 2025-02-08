import { Editor as MonacoEditor } from '@monaco-editor/react';
import { EditorFile } from '../types';

interface EditorProps {
  file: EditorFile;
  onChange: (content: string) => void;
}

export function Editor({ file, onChange }: EditorProps) {
  return (
    <MonacoEditor
      height="100%"
      language={file.language}
      value={file.content}
      theme="vs-dark"
      onChange={(value) => onChange(value || '')}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}