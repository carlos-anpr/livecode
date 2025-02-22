import { Dispatch, SetStateAction } from 'react';
import { EditorFile, SavedDesign, ImageFile } from '../types/editor';
import { designsDB } from '../DB/designsDB';
import { captureScreenshot } from '../utils/screenshotUtils';

type SaveDesignProps = {
  files: EditorFile[];
  currentDesign: SavedDesign | null;
  uploadedImages: ImageFile[];
  setCommunityDesigns: Dispatch<SetStateAction<SavedDesign[]>>;
  loadSavedDesigns: () => Promise<void>;
  setIsSaving: Dispatch<SetStateAction<boolean>>;
  setIsSaveModalOpen: Dispatch<SetStateAction<boolean>>;
};

type SaveDesignParams = {
  name: string;
  description: string;
  tags: string[];
  shareWithCommunity: boolean;
};

export const useSaveDesign = ({
  files,
  currentDesign,
  uploadedImages,
  setCommunityDesigns,
  loadSavedDesigns,
  setIsSaving,
  setIsSaveModalOpen,
}: SaveDesignProps) => {
  const handleSaveDesign = async ({
    name,
    description,
    tags,
    shareWithCommunity,
  }: SaveDesignParams) => {
    setIsSaving(true);
    try {
      const htmlFile = files.find((f) => f.language === 'html')?.content || '';
      const cssFile = files.find((f) => f.language === 'css')?.content || '';
      const jsFile =
        files.find((f) => f.language === 'javascript')?.content || '';

      setIsSaveModalOpen(false);

      const screenshot = await captureScreenshot(files);

      const designData: Omit<SavedDesign, 'created_at'> = {
        id: currentDesign?.id || crypto.randomUUID(),
        name,
        description,
        html: htmlFile,
        css: cssFile,
        javascript: jsFile,
        images: uploadedImages,
        updated_at: new Date().toISOString(),
        favorite: currentDesign?.favorite || false,
        tags,
        screenshot,
        shareWithCommunity,
      };

      const existingDesignLocal = await designsDB.getDesignById(designData.id);

      if (existingDesignLocal) {
        await designsDB.updateDesign(designData.id, {
          ...designData,
          created_at: currentDesign?.created_at as string,
        });

        if (shareWithCommunity) {
          setCommunityDesigns((prevDesigns) => {
            const designExistsCommunity = prevDesigns.some(
              (design) => design.id === currentDesign?.id
            );

            if (designExistsCommunity) {
              return prevDesigns.map((design) =>
                design.id === currentDesign?.id
                  ? {
                      ...design,
                      ...designData,
                      created_at: currentDesign.created_at as string,
                    }
                  : design
              );
            } else {
              return [
                {
                  ...designData,
                  created_at: new Date().toISOString(),
                },
                ...prevDesigns,
              ];
            }
          });
        }
      } else {
        const newDesign: SavedDesign = {
          ...designData,
          created_at: new Date().toISOString(),
        };

        await designsDB.saveDesign(newDesign);

        if (shareWithCommunity) {
          setCommunityDesigns((prevDesigns) => [
            { ...newDesign },
            ...prevDesigns,
          ]);
        }
      }

      await loadSavedDesigns();
    } catch (error) {
      console.error('Error saving design:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return { handleSaveDesign };
};
