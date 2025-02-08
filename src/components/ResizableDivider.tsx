import React from 'react';

interface ResizableDividerProps {
  onResize: (newWidth: number) => void;
}

export function ResizableDivider({ onResize }: ResizableDividerProps) {
  const handleDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const startX = e.pageX;
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.pageX - startX;
      const editorContainer = document.getElementById('editor-container');
      if (editorContainer) {
        const newWidth = editorContainer.offsetWidth + deltaX;
        const containerWidth = editorContainer.parentElement?.offsetWidth || 0;
        // Ensure the width stays between 20% and 80% of the container
        const clampedWidth = Math.min(Math.max(newWidth, containerWidth * 0.2), containerWidth * 0.8);
        onResize(clampedWidth);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div
      className="w-1 bg-gray-700 hover:bg-blue-500 cursor-ew-resize transition-colors"
      onMouseDown={handleDrag}
    />
  );
}