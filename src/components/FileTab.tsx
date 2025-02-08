import React from 'react';
import { FileIcon, FileJson, FileType2 } from 'lucide-react';
import { EditorFile } from '../types';

interface FileTabProps {
  file: EditorFile;
  isActive: boolean;
  onClick: () => void;
}

export function FileTab({ file, isActive, onClick }: FileTabProps) {
  const getIcon = () => {
    switch (file.language) {
      case 'html':
        return <FileType2 className="w-4 h-4" />;
      case 'css':
        return <FileIcon className="w-4 h-4" />;
      case 'javascript':
        return <FileJson className="w-4 h-4" />;
      default:
        return <FileIcon className="w-4 h-4" />;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm ${
        isActive
          ? 'bg-gray-800 text-white'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {getIcon()}
      {file.name}
    </button>
  );
}