import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { SavedDesign } from '../types/editor';


interface CommunityDesignsModalProps {
    isOpen: boolean;
    onClose: () => void;
    designs: SavedDesign[];
    onSelect: (design: SavedDesign) => void;
}

export function CommunityDesignsModal({ isOpen, onClose, designs, onSelect }: CommunityDesignsModalProps) {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col"
        >
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Community Designs</h2>
                <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {designs.map((design) => (
                        <motion.div
                            key={design.id}
                            whileHover={{ scale: 1.02 }}
                            className="group relative bg-gray-900/50 rounded-xl border border-gray-800 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
                            onClick={() => onSelect(design)}
                        >
                            <div className="aspect-video rounded-t-xl bg-gray-800 overflow-hidden relative">
                                {design.screenshot && (
                                    <img
                                        src={design.screenshot}
                                        alt={design.name}
                                        className="w-full h-full object-cover transition-opacity duration-300"
                                        loading="lazy"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            </div>

                            <div className="p-4 space-y-3">
                                <h3 className="text-white font-medium truncate">{design.name}</h3>
                                <p className="text-gray-400 text-sm line-clamp-2">{design.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {design.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-full"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center text-sm text-gray-500 mt-2">
                                    <span className="flex-1">By User{design.id}</span>
                                    <span className="text-xs">
                                        {new Date(design.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
