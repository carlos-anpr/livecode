import { useEffect, useState, useRef, useMemo } from 'react';
import { EditorFile, ImageFile } from '../types/editor';
import debounce from 'lodash/debounce';

interface PreviewProps {
  files: EditorFile[];
  images: ImageFile[];
}

const replaceImageSources = (content: string, blobUrls: Map<string, string>, isCSS: boolean = false) => {
  const htmlRegex = /<img[^>]+src=["']([^"']+)["'][^>]*/g;
  const cssRegex = /(?:background-image:|background:)[^;]*?url\(['"]?([^'")\s]+)['"]?\)/g;

  const processUrl = (match: string, src: string) => {
    if (src.startsWith('http') || src.startsWith('https') || src.startsWith('data:image')) {
      return match;
    }
    const fileName = src.split('/').pop();
    const blobUrl = blobUrls.get(fileName || '');
    return blobUrl ? match.replace(src, blobUrl) : match;
  };

  return content.replace(isCSS ? cssRegex : htmlRegex, processUrl);
};

export function Preview({ files, images }: PreviewProps) {
  const [blobUrls, setBlobUrls] = useState<Map<string, string>>(new Map());
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const jsInitialized = useRef(false);
  const previousFiles = useRef<string>('');

  useEffect(() => {
    const newBlobUrls = new Map<string, string>();
    images.forEach(img => {
      if (img.file) {
        newBlobUrls.set(img.originalName, URL.createObjectURL(img.file));
      }
    });
    setBlobUrls(newBlobUrls);

    return () => {
      newBlobUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  const { htmlContent, cssContent, jsContent } = useMemo(() => {
    const htmlFile = files.find((f) => f.language === 'html')?.content || '';
    const cssFile = files.find((f) => f.language === 'css')?.content || '';
    const jsFile = files.find((f) => f.language === 'javascript')?.content || '';

    return {
      htmlContent: replaceImageSources(htmlFile, blobUrls),
      cssContent: replaceImageSources(cssFile, blobUrls, true),
      jsContent: jsFile
    };
  }, [files, blobUrls]);

  const updateContent = useMemo(
    () =>
      debounce(() => {
        const iframe = iframeRef.current;
        if (!iframe || !iframe.contentWindow || !iframe.contentDocument) return;

        const doc = iframe.contentDocument;

        // Actualizar CSS manteniendo el estilo existente o creando uno nuevo
        let styleEl = doc.querySelector('style');
        if (!styleEl) {
          styleEl = doc.createElement('style');
          doc.head.appendChild(styleEl);
        }
        styleEl.textContent = cssContent;

        // Actualizar HTML sin tocar los scripts
        const tempDiv = doc.createElement('div');
        tempDiv.innerHTML = htmlContent;

        // Reemplazar solo el contenido del body manteniendo los scripts
        const scripts = Array.from(doc.body.getElementsByTagName('script'));
        doc.body.innerHTML = tempDiv.innerHTML;
        scripts.forEach(script => doc.body.appendChild(script));

      }, 100),
    [htmlContent, cssContent]
  );

  const performFullRefresh = (images: ImageFile[]) => {
    jsInitialized.current = false;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const newBlobUrls = new Map<string, string>();
    images.forEach(img => {
      if (img.file) {
        newBlobUrls.set(img.originalName, URL.createObjectURL(img.file));
      }
    });

    const htmlFile = files.find((f) => f.language === 'html')?.content || '';
    const cssFile = files.find((f) => f.language === 'css')?.content || '';
    const jsFile = files.find((f) => f.language === 'javascript')?.content || '';

    const localHtmlContent = replaceImageSources(htmlFile, newBlobUrls);
    const localCssContent = replaceImageSources(cssFile, newBlobUrls, true);

    iframe.srcdoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; }
            ${localCssContent}
          </style>
          <script>
            document.addEventListener('click', function(e) {
              const anchor = e.target.closest('a');
              if (anchor) {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                
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
          ${localHtmlContent}
          <script>${jsFile}</script>
        </body>
      </html>
    `;
    iframe.onload = () => {
      jsInitialized.current = true;
    };
  };

  // Detectar cambios completos de diseño vs ediciones normales
  useEffect(() => {
    const currentFiles = JSON.stringify(files.map(f => ({ content: f.content, language: f.language })));

    // Si es la primera carga o hay un cambio significativo en los archivos
    if (!previousFiles.current ||
      (previousFiles.current !== currentFiles && Math.abs(previousFiles.current.length - currentFiles.length) > 50)) {
      performFullRefresh(images);
    } else if (jsInitialized.current) {
      updateContent();
    }

    previousFiles.current = currentFiles;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, images, htmlContent, cssContent, jsContent, updateContent]);

  return (
    <div className="relative w-full h-full">
      <button
        className="absolute top-2 left-2 z-10 p-2 backdrop-blur-sm bg-white/20 dark:bg-black/20 text-black dark:text-white border border-gray-500/20 hover:bg-white/30 dark:hover:bg-black/30 rounded-md transition-all duration-200 shadow-sm text-lg font-bold"
        onClick={() => performFullRefresh(images)}
      >
        ↻
      </button>
      <iframe
        ref={iframeRef}
        title="preview"
        className="w-full h-full bg-white"
        style={{ position: 'relative', zIndex: 1 }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
