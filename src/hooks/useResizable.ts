import { useState, useCallback } from 'react';

export function useResizable(initialWidth: number) {
  const [width, setWidth] = useState(initialWidth);

  const handleResize = useCallback((newWidth: number) => {
    setWidth(newWidth);
  }, []);

  return {
    width,
    handleResize
  };
}