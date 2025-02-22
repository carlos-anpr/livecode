import Split from "react-split";
import { EditorPane } from "./EditorPane";
import { PreviewPane } from "./PreviewPane";
import { ImageTab } from "./ImageTab";
import { EditorFile, ImageFile } from "../types/editor";

interface SplitPaneProps {
    isPreviewMode: boolean;
    splitSizes: number[];
    setSplitSizes: (sizes: number[]) => void;
    activeFile: EditorFile;
    files: EditorFile[];
    activeFileId: string;
    handleFileChange: (content: string) => void;
    uploadedImages: ImageFile[];
    setUploadedImages: (images: ImageFile[]) => void;
}

export const EditorSplitPane = ({
    isPreviewMode,
    splitSizes,
    setSplitSizes,
    activeFile,
    files,
    activeFileId,
    handleFileChange,
    uploadedImages,
    setUploadedImages
}: SplitPaneProps) => {
    return (
        <Split
            className="flex-1 flex"
            sizes={isPreviewMode ? [0, 100] : splitSizes}
            minSize={isPreviewMode ? [0, 100] : [300, 300]}
            maxSize={isPreviewMode ? [0, Infinity] : [960, Infinity]}
            expandToMin={false}
            gutterSize={isPreviewMode ? 0 : 6}
            gutterAlign="center"
            snapOffset={30}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
            onDragEnd={(newSizes) => setSplitSizes(newSizes)}
        >
            <div className="editor-container">
                {activeFile.language === 'images' ? (
                    <ImageTab
                        images={uploadedImages}
                        setImages={setUploadedImages}
                    />
                ) : (
                    <EditorPane
                        files={files}
                        activeFileId={activeFileId}
                        onChange={(content) => handleFileChange(content)}
                    />
                )}
            </div>
            <PreviewPane files={files} images={uploadedImages} />
        </Split>
    );
};
