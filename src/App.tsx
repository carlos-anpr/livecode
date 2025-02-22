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
import { INITIAL_SPLIT_SIZES } from "./config/constants";
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
    clearDesign,
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

  const [splitSizes, setSplitSizes] = useState(INITIAL_SPLIT_SIZES);
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
    loadSavedDesigns();
  }, []);

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

  const handleDownload = () => {
    const content = generateDownloadableContent(files);
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "zephyr-design.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        splitSizes={splitSizes}
        setSplitSizes={setSplitSizes}
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
