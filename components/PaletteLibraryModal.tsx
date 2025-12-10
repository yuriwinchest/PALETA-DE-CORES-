import React from 'react';
import { Palette } from '../types';
import { X, Trash2, FolderOpen } from 'lucide-react';

interface PaletteLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  palettes: Palette[];
  onLoad: (palette: Palette) => void;
  onDelete: (id: string) => void;
}

const PaletteLibraryModal: React.FC<PaletteLibraryModalProps> = ({ 
  isOpen, onClose, palettes, onLoad, onDelete 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-700 flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderOpen className="text-indigo-400" />
            Minhas Paletas
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          {palettes.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p>Você ainda não salvou nenhuma paleta.</p>
            </div>
          ) : (
            palettes.map(palette => (
              <div key={palette.id} className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex items-center justify-between hover:border-slate-600 transition">
                <div className="flex-1 min-w-0 pr-4">
                   <h3 className="font-bold text-white text-lg mb-2 truncate">{palette.name}</h3>
                   <div className="flex gap-1 mb-2">
                     {palette.colors.slice(0, 8).map((c, i) => (
                       <div key={i} className="w-6 h-6 rounded-full border border-white/10 shrink-0" style={{ backgroundColor: c.hex }} title={c.name} />
                     ))}
                   </div>
                   <p className="text-xs text-slate-500 truncate">{palette.description || `Salvo em ${new Date().toLocaleDateString('pt-BR')}`}</p>
                </div>
                
                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    onClick={() => onLoad(palette)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition flex items-center gap-2"
                  >
                    Abrir
                  </button>
                  <button 
                    onClick={() => onDelete(palette.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition"
                    title="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PaletteLibraryModal;