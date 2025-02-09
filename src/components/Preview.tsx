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
      <script>
        // Interceptar todos los clics en enlaces
        document.addEventListener('click', function(e) {
          const anchor = e.target.closest('a');
          if (anchor) {
            e.preventDefault();
            const href = anchor.getAttribute('href');
            
            // Manejar scroll suave para hashes
            if (href && href.startsWith('#')) {
              const section = document.querySelector(href);
              if (section) {
                window.scrollTo({
                  top: section.offsetTop - 80,
                  behavior: 'smooth'
                });
              }
            }
            else if (href) {
              console.warn('Navegación bloqueada:', href);
              window.open(href, '_blank');
            }
          }
        });
      </script>
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
      sandbox="allow-scripts allow-same-origin"
    />


  );
}