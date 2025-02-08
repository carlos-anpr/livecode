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
import { manual } from "./data/manual"
import "./styles/split-pane.css";

// In a real app, this would be fetched from Supabase
const mockSavedDesigns: SavedDesign[] = []

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
  const [savedDesigns, setSavedDesigns] =
    useState<SavedDesign[]>(mockSavedDesigns);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [communityDesigns, setCommunityDesigns] = useState<SavedDesign[]>(
    initialFiles.map((design, index) => ({
      id: String(index),
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


  const handleTogglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };


  const handleSelectCommunityDesign = (design: SavedDesign) => {
    handleSelectDesign(design);
    setIsCommunityOpen(false);
  };

  const handleFileChange = (content: string) => {
    setFiles(files.map((f) => (f.id === activeFileId ? { ...f, content } : f)));
  };

  const handleClearDesign = () => {
    setFiles([
      { id: "1", name: "index.html", language: "html", content: "" },
      { id: "2", name: "styles.css", language: "css", content: "" },
      { id: "3", name: "script.js", language: "javascript", content: "" }
    ]);
  };


  const captureScreenshot = async () => {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px"; // Ocultar fuera de la pantalla
    container.style.width = "800px"; // Ajustar al tamaño deseado
    container.style.height = "600px";
    container.style.backgroundColor = "#ffffff"; // Fondo blanco para la captura

    // Obtener los contenidos del editor
    const htmlContent = files.find((f) => f.language === "html")?.content || "";
    const cssContent = files.find((f) => f.language === "css")?.content || "";

    // Renderizar el contenido dentro del contenedor temporal
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
      // Capturar el contenedor con html2canvas
      const canvas = await html2canvas(container, {
        width: 800,
        height: 600,
        scale: 2, // Aumentar resolución
        useCORS: true,
        allowTaint: true,
      });

      // Convertir el canvas a una imagen en formato base64
      const screenshot = canvas.toDataURL("image/png", 1.0);

      // Limpiar el contenedor temporal
      document.body.removeChild(container);

      return screenshot;
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      document.body.removeChild(container); // Limpiar incluso en caso de error
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

      const newDesign: SavedDesign = {
        id: Date.now().toString(),
        name,
        description,
        html: htmlFile,
        css: cssFile,
        javascript: jsFile,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        favorite: false,
        tags,
        screenshot,
      };

      // Guardar en el historial personal
      setSavedDesigns([newDesign, ...savedDesigns]);

      // Si se marca para compartir, también guardar en la comunidad
      if (shareWithCommunity) {
        setCommunityDesigns([newDesign, ...communityDesigns]);
      }


    } catch (error) {
      console.error("Error saving design:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectDesign = (design: SavedDesign) => {
    setFiles([
      { id: "1", name: "index.html", language: "html", content: design.html },
      { id: "2", name: "styles.css", language: "css", content: design.css },
      {
        id: "3",
        name: "script.js",
        language: "javascript",
        content: design.javascript,
      },
    ]);
    setIsHistoryOpen(false);
  };

  const handleToggleFavorite = (id: string) => {
    setSavedDesigns(
      savedDesigns.map((design) =>
        design.id === id ? { ...design, favorite: !design.favorite } : design
      )
    );
  };

  const handleDeleteDesign = (id: string) => {
    setSavedDesigns(savedDesigns.filter((design) => design.id !== id));
  };

  // Handle keyboard shortcuts
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
          onSave={handleSaveDesign}
          onClose={() => setIsSaveModalOpen(false)}
        />
      )}
    </div>
  );
}
