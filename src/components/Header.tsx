import React from 'react';
import { Save, History, X } from 'lucide-react';

interface HeaderProps {
  onSave: () => void;
  onToggleHistory: () => void;
  isHistoryOpen: boolean;
}

export function Header({ onSave, onToggleHistory, isHistoryOpen }: HeaderProps) {
  return (
    <div className="h-14 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        <h1 className="text-white text-xl font-semibold">Code Editor</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onSave}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Save size={18} />
          <span>Save Design</span>
        </button>
        <button
          onClick={onToggleHistory}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            isHistoryOpen
              ? 'bg-gray-700 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {isHistoryOpen ? <X size={18} /> : <History size={18} />}
          <span>{isHistoryOpen ? 'Close History' : 'View History'}</span>
        </button>
      </div>
    </div>
  );
}