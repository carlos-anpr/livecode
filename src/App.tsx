import { useState, useEffect } from "react";
import Split from "react-split";
import html2canvas from "html2canvas";
import { EditorPane } from "./components/EditorPane";
import { PreviewPane } from "./components/PreviewPane";
import { FileTabs } from "./components/FileTabs";
import { Header } from "./components/Header";
import { HistoryPanel } from "./components/HistoryPanel";
import { SaveDesignModal } from "./components/SaveDesignModal";
import { CommunityDesignsModal } from './components/CommunityDesignsModal'
import { EditorFile } from "./types";
import { SavedDesign } from "./types/editor";
import { initialFiles } from "./data/initialFiles";
import { manual } from "./data/manual";
import { designsDB } from "./DB/designsDB";
import "./styles/split-pane.css";

const manualFiles: EditorFile[] = [
  { id: "1", name: "index.html", language: "html", content: manual[0].content },
  { id: "2", name: "styles.css", language: "css", content: manual[1].content },
  { id: "3", name: "script.js", language: "javascript", content: manual[2].content }
];

export default function App() {
  const [files, setFiles] = useState<EditorFile[]>(manualFiles);
  const [activeFileId, setActiveFileId] = useState(files[0].id);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [currentDesign, setCurrentDesign] = useState<SavedDesign | null>(null);
  const [communityDesigns, setCommunityDesigns] = useState<SavedDesign[]>(
    initialFiles.map((design) => ({
      id: crypto.randomUUID(),
      name: design[3]?.name ?? "Untitled Design",
      description: design[3]?.description ?? "",
      html: design[0].content ?? "",
      css: design[1].content ?? "",
      javascript: design[2].content ?? "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      favorite: design[3]?.favorite ?? false,
      tags: design[3]?.tags ?? [],
      screenshot: null
    }))
  );

  const activeFile = files.find((f) => f.id === activeFileId)!;

  useEffect(() => {
    loadSavedDesigns();
  }, []);

  const loadSavedDesigns = async () => {
    try {
      const designs = await designsDB.getAllDesigns();
      setSavedDesigns(designs);
    } catch (error) {
      console.error('Error loading designs:', error);
    }
  };

  const handleTogglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleSelectCommunityDesign = (design: SavedDesign) => {
    setCurrentDesign(design);
    handleSelectDesign(design);
    setIsCommunityOpen(false);
  };

  const handleFileChange = (content: string) => {
    setFiles(files.map((f) => (f.id === activeFileId ? { ...f, content } : f)));
  };

  const handleClearDesign = () => {
    setCurrentDesign(null)
    setFiles([
      { id: "1", name: "index.html", language: "html", content: "" },
      { id: "2", name: "styles.css", language: "css", content: "" },
      { id: "3", name: "script.js", language: "javascript", content: "" }
    ]);
  };

  const captureScreenshot = async () => {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.width = "800px";
    container.style.height = "600px";
    container.style.backgroundColor = "#ffffff";

    const htmlContent = files.find((f) => f.language === "html")?.content || "";
    const cssContent = files.find((f) => f.language === "css")?.content || "";

    container.innerHTML = `
      <html>
        <head>
          <style>${cssContent}</style>
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
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const screenshot = canvas.toDataURL("image/png", 1.0);
      document.body.removeChild(container);
      return screenshot;
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      document.body.removeChild(container);
      return null;
    }
  };

  const handleSaveDesign = async (
    name: string,
    description: string,
    tags: string[],
    shareWithCommunity: boolean
  ) => {
    setIsSaving(true);
    try {
      const htmlFile = files.find((f) => f.language === "html")?.content || "";
      const cssFile = files.find((f) => f.language === "css")?.content || "";
      const jsFile = files.find((f) => f.language === "javascript")?.content || "";

      setIsSaveModalOpen(false);

      const screenshot = await captureScreenshot();

      const designData = {
        id: currentDesign?.id || crypto.randomUUID(),
        name,
        description,
        html: htmlFile,
        css: cssFile,
        javascript: jsFile,
        updated_at: new Date().toISOString(),
        favorite: currentDesign?.favorite || false,
        tags,
        screenshot,
        shareWithCommunity
      };

      if (currentDesign?.id) {
        await designsDB.updateDesign(currentDesign?.id, {
          ...designData,
          created_at: currentDesign?.created_at
        });

        if (shareWithCommunity) {
          setCommunityDesigns(prevDesigns => {
            const designExists = prevDesigns.some(design => design.id === currentDesign?.id);

            if (designExists) {
              return prevDesigns.map(design =>
                design.id === currentDesign?.id
                  ? {
                    ...design,
                    ...designData,
                    created_at: currentDesign.created_at
                  }
                  : design
              );
            } else {
              return [{
                ...designData,
                created_at: new Date().toISOString()
              }, ...prevDesigns];
            }
          });
        }
      } else {
        const newDesign = {
          ...designData,
          created_at: new Date().toISOString()
        };

        await designsDB.saveDesign(newDesign);

        if (shareWithCommunity) {
          setCommunityDesigns(prevDesigns => [newDesign, ...prevDesigns]);
        }
      }

      await loadSavedDesigns();

    } catch (error) {
      console.error("Error saving design:", error);
    } finally {
      setIsSaving(false);
    }
  };



  const handleSelectDesign = (design: SavedDesign) => {
    setCurrentDesign(design)
    setFiles([
      { id: "1", name: "index.html", language: "html", content: design.html },
      { id: "2", name: "styles.css", language: "css", content: design.css },
      { id: "3", name: "script.js", language: "javascript", content: design.javascript },
    ]);
    setIsHistoryOpen(false);
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const design = savedDesigns.find(d => d.id === id);
      if (design) {
        const updatedDesign = { ...design, favorite: !design.favorite };
        await designsDB.updateDesign(id, updatedDesign);
        await loadSavedDesigns();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleDeleteDesign = async (id: string) => {
    try {
      await designsDB.deleteDesign(id);
      await loadSavedDesigns();
    } catch (error) {
      console.error("Error deleting design:", error);
    }
  };

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

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <Header
        onSave={() => setIsSaveModalOpen(true)}
        onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
        onToggleCommunity={() => setIsCommunityOpen(true)}
        onTogglePreview={handleTogglePreview}
        isHistoryOpen={isHistoryOpen}
        isPreviewMode={isPreviewMode}
        onClear={handleClearDesign}
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
      <Split
        className="flex-1 flex"
        sizes={isPreviewMode ? [0, 100] : [35, 65]}
        minSize={isPreviewMode ? [0, 100] : [300, 300]}
        maxSize={isPreviewMode ? [0, Infinity] : [960, Infinity]}
        expandToMin={false}
        gutterSize={isPreviewMode ? 0 : 6}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        style={{ transition: "all 0.2s ease" }}
      >
        <EditorPane
          file={activeFile}
          onChange={handleFileChange}
        />
        <PreviewPane files={files} />
      </Split>

      <HistoryPanel
        designs={savedDesigns}
        onSelect={handleSelectDesign}
        onToggleFavorite={handleToggleFavorite}
        onDelete={handleDeleteDesign}
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
