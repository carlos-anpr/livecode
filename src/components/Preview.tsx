import { EditorFile, ImageFile } from '../types/editor';

interface PreviewProps {
  files: EditorFile[];
  images: ImageFile[];
}

export function Preview({ files, images }: PreviewProps) {
  const htmlFile = files.find((f) => f.language === 'html')?.content || '';
  const cssFile = files.find((f) => f.language === 'css')?.content || '';
  const jsFile = files.find((f) => f.language === 'javascript')?.content || '';

  const replaceImageSources = (content: string, isCSS: boolean = false) => {
    const htmlRegex = /<img[^>]+src=["']([^"']+)["'][^>]*/g;
    const cssRegex = /(?:background-image:|background:)[^;]*?url\(['"]?([^'")\s]+)['"]?\)/g;

    const processUrl = (match: string, src: string) => {
      if (src.startsWith('http') || src.startsWith('https') || src.startsWith('data:image')) {
        return match;
      }
      const fileName = src.split('/').pop();
      const imageFile = images.find(img => img.originalName === fileName);

      if (imageFile) {
        if (isCSS) {
          return match.replace(src, imageFile.preview);
        }
        return match.replace(src, imageFile.preview);
      }

      return match;
    };

    return content.replace(isCSS ? cssRegex : htmlRegex, processUrl);
  };

  // Procesar tanto HTML como CSS
  const processedHtml = replaceImageSources(htmlFile);
  const processedCss = replaceImageSources(cssFile, true);

  const combinedContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${processedCss}</style>
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
        ${processedHtml}
        <script>${jsFile}</script>
      </body>
    </html>
  `;


  return (
    <div className="relative w-full h-full">
      <button
        className="absolute top-2 left-2 z-10 p-2 backdrop-blur-sm bg-white/20 dark:bg-black/20 text-black dark:text-white border border-gray-500/20 hover:bg-white/30 dark:hover:bg-black/30 rounded-md transition-all duration-200 shadow-sm text-lg font-bold"
        onClick={() => document.querySelector('iframe')?.contentWindow?.location.reload()}
      >
        ↻
      </button>
      <iframe
        title="preview"
        srcDoc={combinedContent}
        className="w-full h-full bg-white"
        style={{ position: 'relative', zIndex: 1 }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
