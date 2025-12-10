import React from 'react';
import { ColorDef, AIAnalysisResult } from '../types';
import { BrainCircuit, Sparkles, Tag, Info } from 'lucide-react';

interface AnalysisPanelProps {
  analysis: AIAnalysisResult | null;
  colors: ColorDef[];
  isLoading: boolean;
  onAnalyze: () => void;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, colors, isLoading, onAnalyze }) => {
  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto bg-slate-900/50 backdrop-blur-md">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="text-purple-400" />
            AI Insights
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Discover the psychological impact and best use-cases for your palette.
          </p>
        </div>
        <button
          onClick={onAnalyze}
          disabled={isLoading || colors.length === 0}
          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
            isLoading 
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg hover:shadow-purple-500/25'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Analysis
            </>
          )}
        </button>
      </div>

      {!analysis && !isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-700 rounded-xl p-8">
          <BrainCircuit size={48} className="mb-4 opacity-50" />
          <p>Click "Generate Analysis" to reveal the secrets of your colors.</p>
        </div>
      )}

      {analysis && (
        <div className="space-y-6 animate-fade-in">
          {/* Overall Vibe Card */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">Overall Vibe</h3>
            <p className="text-slate-200 leading-relaxed italic">
              "{analysis.overallVibe}"
            </p>
          </div>

          <div className="grid gap-4">
            {analysis.colorAnalysis.map((item, idx) => {
              // Find the local color definition to get the name if available
              const originalColor = colors.find(c => c.hex.toLowerCase() === item.hex.toLowerCase());
              const name = originalColor?.name || item.hex;

              return (
                <div key={idx} className="bg-slate-800 rounded-xl p-5 border border-slate-700 flex flex-col md:flex-row gap-4 items-start">
                  <div 
                    className="w-16 h-16 rounded-lg shadow-inner shrink-0" 
                    style={{ backgroundColor: item.hex }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <h4 className="font-bold text-white text-lg">{name}</h4>
                       <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">{item.hex}</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                           <Info size={12} /> Psychology
                        </div>
                        <p className="text-sm text-slate-300">{item.psychology}</p>
                      </div>
                      <div>
                         <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                           <Tag size={12} /> Best Usage
                        </div>
                        <p className="text-sm text-emerald-400 bg-emerald-400/10 inline-block px-2 py-1 rounded">
                          {item.recommendedUsage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPanel;
