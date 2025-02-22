import JSZip from 'jszip';
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { FileTabs } from "./components/FileTabs";
import { HistoryPanel } from "./components/HistoryPanel";
import { SaveDesignModal } from "./components/SaveDesignModal";
import { CommunityDesignsModal } from './components/CommunityDesignsModal';
import { EditorSplitPane } from './components/EditorSplitPane';
import { useFiles } from "./hooks/useFiles";
import { useSavedDesigns } from "./hooks/useSavedDesigns";
import { useDesignHandlers } from "./hooks/useDesignHandlers";
import { useSaveDesign } from "./hooks/useSaveDesign";
import { generateDownloadableContent } from "./utils/downloadUtils";
import { SavedDesign, ImageFile } from "./types/editor";
import { initialFiles } from "./data/initialFiles";
import "./styles/split-pane.css";

export default function App() {
  const {
    files,
    activeFileId,
    activeFile,
    handleFileChange,
    setActiveFileId,
    setFiles
  } = useFiles();

  const {
    savedDesigns,
    currentDesign,
    setCurrentDesign,
    isSaving,
    setIsSaving,
    loadSavedDesigns,
    toggleFavorite,
    deleteDesign
  } = useSavedDesigns();


  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
  const [communityDesigns, setCommunityDesigns] = useState<SavedDesign[]>(
    initialFiles.map((design) => ({
      id: crypto.randomUUID(),
      name: design[4]?.name ?? "Untitled Design",
      description: design[3]?.description ?? "",
      html: design[0].content ?? "",
      css: design[1].content ?? "",
      javascript: design[2].content ?? "",
      images: design[3]?.images ?? [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      favorite: design[4]?.favorite ?? false,
      tags: design[4]?.tags ?? [],
      screenshot: null
    }))
  );

  const { handleSelectDesign } = useDesignHandlers({
    setFiles,
    setCurrentDesign,
    setUploadedImages,
    setIsHistoryOpen
  });

  const { handleSaveDesign } = useSaveDesign({
    files,
    currentDesign,
    uploadedImages,
    setCommunityDesigns,
    loadSavedDesigns,
    setIsSaving,
    setIsSaveModalOpen
  });


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        setIsSaveModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTogglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleSelectCommunityDesign = (design: SavedDesign) => {
    setCurrentDesign(design);
    setUploadedImages(design.images ?? []);
    handleSelectDesign(design);
    setIsCommunityOpen(false);
  };

  const handleDownload = async () => {
    const zip = new JSZip();

    const fileToBase64 = async (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    const extractImagePaths = (htmlContent: string, cssContent: string) => {
      const paths = new Map<string, string>();
      const htmlRegex = /<img[^>]+src=["']([^"']+)["'][^>]*/g;
      const cssRegex = /(?:background-image:|background:)[^;]*?url\(['"]?([^'")\s]+)['"]?\)/g;

      // Extraer rutas del HTML
      let match;
      while ((match = htmlRegex.exec(htmlContent)) !== null) {
        const [, src] = match;
        if (!src.startsWith('http') && !src.startsWith('data:')) {
          const fileName = src.split('/').pop() || '';
          paths.set(fileName, src);
        }
      }

      // Extraer rutas del CSS
      while ((match = cssRegex.exec(cssContent)) !== null) {
        const [, src] = match;
        if (!src.startsWith('http') && !src.startsWith('data:')) {
          const fileName = src.split('/').pop() || '';
          paths.set(fileName, src);
        }
      }

      return paths;
    };

    const { htmlFile, cssFile, page } = generateDownloadableContent(files);
    const imagePaths = extractImagePaths(htmlFile, cssFile);
    let modifiedPage = page;

    for (const [fileName, path] of imagePaths) {
      const image = uploadedImages.find(img => img.originalName === fileName);
      if (image) {
        if (fileName.toLowerCase().endsWith('.svg')) {
          const base64Data = await fileToBase64(image.file);
          modifiedPage = modifiedPage.replace(
            new RegExp(`src=["']${path}["']`, 'g'),
            `src="${base64Data}"`
          );
        } else {
          const folders = path.split('/').slice(0, -1);
          if (folders.length > 0) {
            zip.folder(folders.join('/'));
          }
          zip.file(path, image.file);
        }
      }
    }

    zip.file("index.html", modifiedPage);

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "zephyr-design.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearDesign = () => {
    setCurrentDesign(null);
    setFiles([
      { id: '1', name: 'index.html', language: 'html', content: '' },
      { id: '2', name: 'styles.css', language: 'css', content: '' },
      { id: '3', name: 'script.js', language: 'javascript', content: '' },
      { id: '4', name: 'images', language: 'images', content: '', images: [] },
    ]);
    setUploadedImages([]);
    setActiveFileId('1');
  };


  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <Header
        onSave={() => setIsSaveModalOpen(true)}
        onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
        onToggleCommunity={() => setIsCommunityOpen(true)}
        onTogglePreview={handleTogglePreview}
        isHistoryOpen={isHistoryOpen}
        isPreviewMode={isPreviewMode}
        onDownload={handleDownload}
        onClear={clearDesign}
        isSaving={isSaving}
      />

      <CommunityDesignsModal
        isOpen={isCommunityOpen}
        onClose={() => setIsCommunityOpen(false)}
        designs={communityDesigns}
        onSelect={handleSelectCommunityDesign}
      />

      <FileTabs
        files={files}
        activeFileId={activeFileId}
        onFileSelect={setActiveFileId}
      />

      <EditorSplitPane
        isPreviewMode={isPreviewMode}
        activeFile={activeFile}
        files={files}
        activeFileId={activeFileId}
        handleFileChange={handleFileChange}
        uploadedImages={uploadedImages}
        setUploadedImages={setUploadedImages}
      />

      <HistoryPanel
        designs={savedDesigns}
        onSelect={handleSelectDesign}
        onToggleFavorite={toggleFavorite}
        onDelete={deleteDesign}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      {isSaveModalOpen && (
        <SaveDesignModal
          currentDesign={currentDesign}
          onSave={handleSaveDesign}
          onClose={() => setIsSaveModalOpen(false)}
        />
      )}
    </div>
  );
}
