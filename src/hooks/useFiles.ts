import { useState } from 'react';
import { EditorFile } from '../types/editor';
import { manualFiles } from '../config/constants';

export const useFiles = () => {
  const [files, setFiles] = useState<EditorFile[]>(manualFiles);
  const [activeFileId, setActiveFileId] = useState(files[0].id);

  const activeFile = files.find((f) => f.id === activeFileId)!;

  const handleFileChange = (content: string) => {
    setFiles(files.map((f) => (f.id === activeFileId ? { ...f, content } : f)));
  };

  const clearDesign = () => {
    setFiles([
      { id: '1', name: 'index.html', language: 'html', content: '' },
      { id: '2', name: 'styles.css', language: 'css', content: '' },
      { id: '3', name: 'script.js', language: 'javascript', content: '' },
      { id: '4', name: 'images', language: 'images', content: '', images: [] },
    ]);
  };

  return {
    files,
    setFiles,
    activeFileId,
    setActiveFileId,
    activeFile,
    handleFileChange,
    clearDesign,
  };
};
