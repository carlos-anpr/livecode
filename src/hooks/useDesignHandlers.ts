import { Dispatch, SetStateAction } from 'react';
import { EditorFile, SavedDesign, ImageFile } from '../types/editor';

type DesignHandlerProps = {
  setFiles: Dispatch<SetStateAction<EditorFile[]>>;
  setCurrentDesign: Dispatch<SetStateAction<SavedDesign | null>>;
  setUploadedImages: Dispatch<SetStateAction<ImageFile[]>>;
  setIsHistoryOpen: Dispatch<SetStateAction<boolean>>;
};

export const useDesignHandlers = ({
  setFiles,
  setCurrentDesign,
  setUploadedImages,
  setIsHistoryOpen,
}: DesignHandlerProps) => {
  const handleSelectDesign = (design: SavedDesign) => {
    setCurrentDesign(design);
    setUploadedImages(design.images ?? []);
    setFiles([
      { id: '1', name: 'index.html', language: 'html', content: design.html },
      { id: '2', name: 'styles.css', language: 'css', content: design.css },
      {
        id: '3',
        name: 'script.js',
        language: 'javascript',
        content: design.javascript,
      },
      {
        id: '4',
        name: 'images',
        language: 'images',
        content: '',
        images: design.images ?? [],
      },
    ]);
    setIsHistoryOpen(false);
  };

  return { handleSelectDesign };
};
