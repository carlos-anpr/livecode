import { useState, useEffect } from 'react';
import { SavedDesign } from '../types/editor';
import { designsDB } from '../DB/designsDB';

export const useSavedDesigns = () => {
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [currentDesign, setCurrentDesign] = useState<SavedDesign | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadSavedDesigns = async () => {
    try {
      const designs = await designsDB.getAllDesigns();
      setSavedDesigns(designs);
    } catch (error) {
      console.error('Error loading designs:', error);
    }
  };

  useEffect(() => {
    loadSavedDesigns();
  }, []);

  const toggleFavorite = async (id: string) => {
    try {
      const design = savedDesigns.find((d) => d.id === id);
      if (design) {
        const updatedDesign = { ...design, favorite: !design.favorite };
        await designsDB.updateDesign(id, updatedDesign);
        await loadSavedDesigns();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const deleteDesign = async (id: string) => {
    try {
      setCurrentDesign(null);
      await designsDB.deleteDesign(id);
      await loadSavedDesigns();
    } catch (error) {
      console.error('Error deleting design:', error);
    }
  };

  return {
    savedDesigns,
    currentDesign,
    setCurrentDesign,
    isSaving,
    setIsSaving,
    loadSavedDesigns,
    toggleFavorite,
    deleteDesign,
  };
};
