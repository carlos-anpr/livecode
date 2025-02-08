import React from 'react';
import { Editor } from './Editor';
import { EditorFile } from '../types/editor';

interface EditorPaneProps {
  file: EditorFile;
  onChange: (content: string) => void;
}

export function EditorPane({ file, onChange }: EditorPaneProps) {
  return (
    <div className="h-full">
      <Editor file={file} onChange={onChange} />
    </div>
  );
}