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
            Insights IA
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Descubra o impacto psicológico e os melhores usos para sua paleta.
          </p>
        </div>
        <button
          onClick={onAnalyze}
          disabled={isLoading || colors.length === 0}
          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${isLoading
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg hover:shadow-purple-500/25'
            }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Analisando...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Gerar Análise
            </>
          )}
        </button>
      </div>

      {!analysis && !isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="relative mb-8 group cursor-pointer" onClick={onAnalyze}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-2xl group-hover:-translate-y-1 transition-transform duration-300">
              <BrainCircuit size={48} className="text-purple-400" />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white text-slate-900 rounded-full p-2 shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300">
              <Sparkles size={16} />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">Revelar Segredos da Paleta</h3>
          <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
            Use a inteligência artificial para descobrir o impacto psicológico,
            melhores usos e a "vibe" oculta da sua combinação de cores.
          </p>

          <button
            onClick={onAnalyze}
            disabled={colors.length === 0}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full font-bold shadow-lg shadow-purple-500/25 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Sparkles size={18} />
            Gerar Análise Completa
          </button>
        </div>
      )}

      {analysis && (
        <div className="space-y-6 animate-fade-in">
          {/* Overall Vibe Card */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">Vibe Geral</h3>
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
                          <Info size={12} /> Psicologia
                        </div>
                        <p className="text-sm text-slate-300">{item.psychology}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          <Tag size={12} /> Melhor Uso
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