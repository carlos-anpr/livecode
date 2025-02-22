import { EditorFile } from '../types/editor';

export const generateDownloadableContent = (files: EditorFile[]) => {
  const htmlContent = files.find((f) => f.language === 'html')?.content || '';
  const cssContent = files.find((f) => f.language === 'css')?.content || '';
  const jsContent =
    files.find((f) => f.language === 'javascript')?.content || '';

  return {
    htmlFile: htmlContent,
    cssFile: cssContent,
    page: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          ${cssContent}
        </style>
      </head>
      <body>
        ${htmlContent}
        <script>
          ${jsContent}
        </script>
      </body>
      </html>`,
  };
};
