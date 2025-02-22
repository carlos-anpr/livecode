import html2canvas from 'html2canvas';
import { EditorFile } from '../types/editor';

export const captureScreenshot = async (files: EditorFile[]) => {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '800px';
  container.style.height = '600px';
  container.style.backgroundColor = '#ffffff';

  const htmlContent = files.find((f) => f.language === 'html')?.content || '';
  const cssContent = files.find((f) => f.language === 'css')?.content || '';

  const cssSafe = cssContent
    .split('\n')
    .filter((line: string) => !line.match('linear-gradient.*to right'))
    .join('\n');

  container.innerHTML = `
      <html>
        <head>
          <style>${cssSafe}</style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      width: 800,
      height: 600,
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    const screenshot = canvas.toDataURL('image/png', 1.0);
    document.body.removeChild(container);
    return screenshot;
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    document.body.removeChild(container);
    return null;
  }
};
