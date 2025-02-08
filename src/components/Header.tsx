import { Save, History, X, Eraser, Loader2, Globe, Maximize2, Minimize2 } from 'lucide-react';
import ZephyrIcon from './ZephyrIcon';

interface HeaderProps {
  onSave: () => void;
  onToggleHistory: () => void;
  onToggleCommunity: () => void;
  onTogglePreview: () => void;
  isHistoryOpen: boolean;
  isPreviewMode: boolean;
  onClear: () => void;
  isSaving: boolean;
}

export function Header({
  onSave,
  onToggleHistory,
  onToggleCommunity,
  onTogglePreview,
  isHistoryOpen,
  isPreviewMode,
  onClear,
  isSaving
}: HeaderProps) {
  return (
    <div className="h-14 bg-gray-900 border-b border-gray-700/50 flex items-center justify-between px-4 backdrop-blur-sm">
      <div className="flex items-center space-x-2">

        <ZephyrIcon size={40} className="text-indigo-400" />
        <h1 className="text-white text-xl font-semibold">Zephyr</h1>

      </div>

      {isSaving && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50" />
      )}

      <div className="flex items-center space-x-3 relative">

        <button
          onClick={onClear}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800/80 text-red-300 rounded-lg
          border border-red-500/20 hover:bg-gray-700/80 hover:border-red-500/30 
          hover:text-red-200 transition-all duration-200 shadow-sm hover:shadow-red-500/10
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Eraser size={16} className="opacity-80" />
          <span className="text-sm font-medium">Clear</span>
        </button>

        <button
          onClick={onTogglePreview}
          disabled={isSaving}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
          ${isPreviewMode
              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
              : 'bg-green-500/10 text-green-300 border border-green-500/20 hover:bg-green-500/20 hover:border-green-500/30'
            }
          disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isPreviewMode ? (
            <Minimize2 size={16} className="opacity-80" />
          ) : (
            <Maximize2 size={16} className="opacity-80" />
          )}
          <span className="text-sm font-medium">
            {isPreviewMode ? 'Editor' : 'Preview'}
          </span>
        </button>

        <button
          onClick={onToggleCommunity}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-500/10 text-purple-300 
          rounded-lg border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/30 
          transition-all duration-200 shadow-sm hover:shadow-purple-500/10
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Globe size={16} className="opacity-80" />
          <span className="text-sm font-medium">Community</span>
        </button>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 text-indigo-300 
          rounded-lg border border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/30 
          transition-all duration-200 shadow-sm hover:shadow-indigo-500/10
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <Loader2 size={16} className="animate-spin opacity-80" />
          ) : (
            <Save size={16} className="opacity-80" />
          )}
          <span className="text-sm font-medium">
            {isSaving ? 'Saving...' : 'Save'}
          </span>
        </button>

        <button
          onClick={onToggleHistory}
          disabled={isSaving}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
          ${isHistoryOpen
              ? 'bg-gray-700/50 text-gray-200 border border-gray-600/50'
              : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50 hover:text-gray-200'
            }
          disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isHistoryOpen ? (
            <X size={16} className="opacity-80" />
          ) : (
            <History size={16} className="opacity-80" />
          )}
          <span className="text-sm font-medium">
            {isHistoryOpen ? 'Close' : 'History'}
          </span>
        </button>
      </div>
    </div>
  );
}
