import { Editor as MonacoEditor } from '@monaco-editor/react';
import { EditorFile } from '../types';
import { useCallback } from 'react';

interface EditorProps {
  file: EditorFile;
  onChange: (content: string) => void;
}

export function Editor({ file, onChange }: EditorProps) {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const validExtensions = {
      html: 'html',
      css: 'css',
      js: 'javascript'
    } as const;

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    const fileExtension = droppedFile.name.split('.').pop()?.toLowerCase();

    if (fileExtension &&
      fileExtension in validExtensions &&
      validExtensions[fileExtension as keyof typeof validExtensions] === file.language) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onChange(content);
      };
      reader.readAsText(droppedFile);
    }
  }, [file.language, onChange]);

  return (
    <div
      style={{ height: '99%' }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
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
    </div>
  );
}
