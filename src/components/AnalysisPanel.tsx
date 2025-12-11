import React, { useState, useRef } from 'react';
import { ColorDef, AIAnalysisResult } from '../types';
import { BrainCircuit, Sparkles, Tag, Info, Camera, Upload, X, AlertCircle, CheckCircle2, Palette, TrendingUp } from 'lucide-react';
import { analyzeWebsiteScreenshot, ScreenshotAnalysisResult } from '../services/geminiService';
import { generateId } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisPanelProps {
  analysis: AIAnalysisResult | null;
  colors: ColorDef[];
  isLoading: boolean;
  onAnalyze: () => void;
  onUsePalette?: (colors: ColorDef[]) => void;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, colors, isLoading, onAnalyze, onUsePalette }) => {
  const [activeTab, setActiveTab] = useState<'palette' | 'screenshot'>('palette');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzingScreenshot, setIsAnalyzingScreenshot] = useState(false);
  const [screenshotAnalysis, setScreenshotAnalysis] = useState<ScreenshotAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Imagem muito grande. Máximo 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
      setError(null);
      setScreenshotAnalysis(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeScreenshot = async () => {
    if (!selectedImage) return;

    setIsAnalyzingScreenshot(true);
    setError(null);

    try {
      const base64 = selectedImage.split(',')[1];
      const result = await analyzeWebsiteScreenshot(base64);
      setScreenshotAnalysis(result);
    } catch (err) {
      console.error(err);
      setError('Erro ao analisar imagem. Tente novamente.');
    } finally {
      setIsAnalyzingScreenshot(false);
    }
  };

  const handleUsePaletteFromScreenshot = () => {
    if (!screenshotAnalysis || !onUsePalette) return;

    const paletteColors: ColorDef[] = screenshotAnalysis.dominantColors.map(c => ({
      id: generateId(),
      hex: c.hex,
      name: c.name
    }));

    onUsePalette(paletteColors);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-900/50 backdrop-blur-md">
      {/* Header with Tabs */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BrainCircuit className="text-purple-400" />
              Insights IA
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Analise sua paleta atual ou faça upload de um screenshot
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-slate-800/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('palette')}
            className={`flex-1 px-4 py-2 rounded-md font-semibold text-sm transition-all ${activeTab === 'palette'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
              }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Palette size={16} />
              Paleta Atual
            </span>
          </button>
          <button
            onClick={() => setActiveTab('screenshot')}
            className={`flex-1 px-4 py-2 rounded-md font-semibold text-sm transition-all ${activeTab === 'screenshot'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
              }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Camera size={16} />
              Screenshot
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'palette' ? (
            <motion.div
              key="palette"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              {/* Palette Analysis Content */}
              {!analysis && !isLoading && (
                <div className="flex flex-col items-center justify-center text-center h-full">
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

              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-white font-semibold">Analisando paleta...</p>
                </div>
              )}

              {analysis && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">Vibe Geral</h3>
                    <p className="text-slate-200 leading-relaxed italic">
                      "{analysis.overallVibe}"
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {analysis.colorAnalysis.map((item, idx) => {
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
            </motion.div>
          ) : (
            <motion.div
              key="screenshot"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Screenshot Upload */}
              {!selectedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-purple-500 rounded-2xl p-12 text-center cursor-pointer transition-all bg-slate-900/30 hover:bg-slate-900/50"
                >
                  <Upload size={48} className="mx-auto mb-4 text-slate-500" />
                  <p className="text-white font-semibold mb-2">Clique para selecionar screenshot</p>
                  <p className="text-sm text-slate-500">PNG, JPG ou WEBP (máx. 5MB)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                    <img src={selectedImage} alt="Screenshot" className="w-full h-auto" />
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setScreenshotAnalysis(null);
                        setError(null);
                      }}
                      className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {!screenshotAnalysis && (
                    <button
                      onClick={handleAnalyzeScreenshot}
                      disabled={isAnalyzingScreenshot}
                      className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isAnalyzingScreenshot ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Analisando...
                        </>
                      ) : (
                        <>
                          <Sparkles size={20} />
                          Analisar com IA
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400">
                  <AlertCircle size={20} />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Screenshot Analysis Results */}
              {screenshotAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Dominant Colors */}
                  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Palette size={16} />
                      Cores Dominantes
                    </h4>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {screenshotAnalysis.dominantColors.map((color, i) => (
                        <div key={i} className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl">
                          <div
                            className="w-12 h-12 rounded-lg shadow-md shrink-0"
                            style={{ backgroundColor: color.hex }}
                          ></div>
                          <div className="min-w-0">
                            <p className="text-white font-semibold text-sm truncate">{color.name}</p>
                            <p className="text-xs text-slate-400 font-mono">{color.hex}</p>
                            <p className="text-xs text-purple-400 font-bold">{color.percentage}%</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {onUsePalette && (
                      <button
                        onClick={handleUsePaletteFromScreenshot}
                        className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={18} />
                        Usar Esta Paleta no Editor
                      </button>
                    )}
                  </div>

                  {/* Analysis */}
                  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">Análise Geral</h4>
                    <p className="text-slate-300 leading-relaxed">{screenshotAnalysis.analysis}</p>
                  </div>

                  {/* Suggestions */}
                  {screenshotAnalysis.suggestions.length > 0 && (
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                      <h4 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <TrendingUp size={16} />
                        Sugestões de Melhoria
                      </h4>
                      <ul className="space-y-2">
                        {screenshotAnalysis.suggestions.map((suggestion, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300">
                            <span className="text-green-400 mt-1">•</span>
                            <span className="text-sm">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Accessibility */}
                  {(screenshotAnalysis.accessibility.contrastIssues.length > 0 || screenshotAnalysis.accessibility.recommendations.length > 0) && (
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                      <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <AlertCircle size={16} />
                        Acessibilidade
                      </h4>

                      {screenshotAnalysis.accessibility.contrastIssues.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-slate-500 uppercase font-bold mb-2">Problemas Identificados:</p>
                          <ul className="space-y-1">
                            {screenshotAnalysis.accessibility.contrastIssues.map((issue, i) => (
                              <li key={i} className="flex items-start gap-2 text-orange-300">
                                <span className="mt-1">⚠</span>
                                <span className="text-sm">{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {screenshotAnalysis.accessibility.recommendations.length > 0 && (
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-bold mb-2">Recomendações:</p>
                          <ul className="space-y-1">
                            {screenshotAnalysis.accessibility.recommendations.map((rec, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-300">
                                <span className="text-green-400 mt-1">✓</span>
                                <span className="text-sm">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnalysisPanel;