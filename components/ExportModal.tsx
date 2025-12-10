import React from 'react';
import { ColorDef } from '../types';
import { X, Copy, Check } from 'lucide-react';

interface ExportModalProps {
  colors: ColorDef[];
  isOpen: boolean;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ colors, isOpen, onClose }) => {
  const [copied, setCopied] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const generateCSS = () => {
    return `:root {
${colors.map(c => `  --color-${c.name.replace(/\s+/g, '-').toLowerCase()}: ${c.hex};`).join('\n')}
}`;
  };

  const generateJSON = () => {
    return JSON.stringify(colors.map(c => ({ name: c.name, hex: c.hex })), null, 2);
  };

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-700 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Export Palette</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* CSS Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
               <label className="text-sm font-semibold text-slate-300">CSS Variables</label>
               <button 
                onClick={() => handleCopy(generateCSS(), 'css')}
                className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition"
               >
                 {copied === 'css' ? <Check size={14} /> : <Copy size={14} />}
                 {copied === 'css' ? 'Copied!' : 'Copy CSS'}
               </button>
            </div>
            <pre className="bg-slate-900 p-4 rounded-lg text-xs text-slate-300 font-mono overflow-x-auto border border-slate-700">
              {generateCSS()}
            </pre>
          </div>

          {/* JSON Section */}
          <div>
             <div className="flex justify-between items-center mb-2">
               <label className="text-sm font-semibold text-slate-300">JSON Data</label>
               <button 
                onClick={() => handleCopy(generateJSON(), 'json')}
                className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition"
               >
                 {copied === 'json' ? <Check size={14} /> : <Copy size={14} />}
                 {copied === 'json' ? 'Copied!' : 'Copy JSON'}
               </button>
            </div>
            <pre className="bg-slate-900 p-4 rounded-lg text-xs text-slate-300 font-mono overflow-x-auto border border-slate-700">
              {generateJSON()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
