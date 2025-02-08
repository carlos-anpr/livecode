import React, { useEffect, useRef } from 'react';
import { Star, Clock, Tag, Trash2, X } from 'lucide-react';
import { SavedDesign } from '../types/editor';

interface HistoryPanelProps {
  designs: SavedDesign[];
  onSelect: (design: SavedDesign) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function HistoryPanel({
  designs,
  onSelect,
  onToggleFavorite,
  onDelete,
  isOpen,
  onClose
}: HistoryPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-40">
      <div
        ref={panelRef}
        className="fixed inset-y-0 right-0 w-96 bg-gray-900 border-l border-gray-700 shadow-xl z-50 overflow-y-auto"
      >
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Saved Designs</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search designs..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-4">
            {designs.map((design) => (
              <div
                key={design.id}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors cursor-pointer group"
                onClick={() => onSelect(design)}
              >
                <div className="relative mb-3 rounded-md overflow-hidden bg-gray-700 aspect-video">
                  {design.screenshot ? (
                    <img
                      src={design.screenshot}
                      alt={design.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      No preview available
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{design.name}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(design.id);
                      }}
                      className={`p-1.5 rounded-full hover:bg-gray-700 transition-colors ${
                        design.favorite ? 'text-yellow-400' : 'text-gray-400'
                      }`}
                    >
                      <Star size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(design.id);
                      }}
                      className="p-1.5 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {new Date(design.updated_at).toLocaleDateString()}
                  </div>
                  {design.tags.length > 0 && (
                    <div className="flex items-center">
                      <Tag size={14} className="mr-1" />
                      {design.tags.join(', ')}
                    </div>
                  )}
                </div>

                {design.description && (
                  <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                    {design.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}