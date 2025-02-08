import React from 'react';
import { EditorFile } from '../types';

interface PreviewProps {
  files: EditorFile[];
}

export function Preview({ files }: PreviewProps) {
  const htmlFile = files.find((f) => f.language === 'html')?.content || '';
  const cssFile = files.find((f) => f.language === 'css')?.content || '';
  const jsFile = files.find((f) => f.language === 'javascript')?.content || '';

  const combinedContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${cssFile}</style>
      </head>
      <body>
        ${htmlFile}
        <script>${jsFile}</script>
      </body>
    </html>
  `;

  return (
    <iframe
      title="preview"
      srcDoc={combinedContent}
      className="w-full h-full bg-white"
      sandbox="allow-scripts"
    />
  );
}