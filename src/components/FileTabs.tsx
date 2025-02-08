import React from 'react';
import { FileTab } from './FileTab';
import { EditorFile } from '../types/editor';

interface FileTabsProps {
  files: EditorFile[];
  activeFileId: string;
  onFileSelect: (fileId: string) => void;
}

export function FileTabs({ files, activeFileId, onFileSelect }: FileTabsProps) {
  return (
    <div className="flex bg-gray-800 border-b border-gray-700">
      {files.map((file) => (
        <FileTab
          key={file.id}
          file={file}
          isActive={file.id === activeFileId}
          onClick={() => onFileSelect(file.id)}
        />
      ))}
    </div>
  );
}