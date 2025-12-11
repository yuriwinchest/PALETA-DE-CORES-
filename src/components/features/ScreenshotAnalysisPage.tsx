import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Sparkles, CheckCircle2, AlertCircle, Palette, TrendingUp } from 'lucide-react';
import BackButton from '../BackButton';
import { analyzeWebsiteScreenshot, ScreenshotAnalysisResult } from '../../services/geminiService';
import { ColorDef } from '../../types';
import { generateId } from '../../utils';

interface ScreenshotAnalysisPageProps {
    onBack: () => void;
    onUsePalette: (colors: ColorDef[]) => void;
}

export default function ScreenshotAnalysisPage({ onBack, onUsePalette }: ScreenshotAnalysisPageProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<ScreenshotAnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Por favor, selecione uma imagem válida');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Imagem muito grande. Máximo 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setSelectedImage(event.target?.result as string);
            setError(null);
            setAnalysis(null);
        };
        reader.readAsDataURL(file);
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            // Convert data URL to base64
            const base64 = selectedImage.split(',')[1];
            const result = await analyzeWebsiteScreenshot(base64);
            setAnalysis(result);
        } catch (err) {
            console.error(err);
            setError('Erro ao analisar imagem. Tente novamente.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleUsePalette = () => {
        if (!analysis) return;

        const colors: ColorDef[] = analysis.dominantColors.map(c => ({
            id: generateId(),
            hex: c.hex,
            name: c.name
        }));

        onUsePalette(colors);
    };

    return (
        <div className="h-full w-full relative overflow-y-auto bg-slate-950 p-6 md:p-12">

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-12">
                <div className="mb-6">
                    <BackButton onClick={onBack} label="Voltar" />
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Camera size={28} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white">
                            Analisar Screenshot
                        </h1>
                        <p className="text-slate-400 text-lg mt-1">
                            Faça upload de um screenshot do seu site e receba análise completa das cores
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Upload Area */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">1. Selecione a Imagem</h3>

                        {!selectedImage ? (
                            <motion.div
                                onClick={() => fileInputRef.current?.click()}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="border-2 border-dashed border-slate-700 hover:border-purple-500 rounded-2xl p-12 text-center cursor-pointer transition-all bg-slate-900/30 hover:bg-slate-900/50"
                            >
                                <Upload size={48} className="mx-auto mb-4 text-slate-500" />
                                <p className="text-white font-semibold mb-2">Clique para selecionar</p>
                                <p className="text-sm text-slate-500">PNG, JPG ou WEBP (máx. 5MB)</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </motion.div>
                        ) : (
                            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                                <img src={selectedImage} alt="Screenshot" className="w-full h-auto" />
                                <button
                                    onClick={() => {
                                        setSelectedImage(null);
                                        setAnalysis(null);
                                        setError(null);
                                    }}
                                    className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}

                        {error && (
                            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400">
                                <AlertCircle size={20} />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        {selectedImage && !analysis && (
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                className="mt-6 w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                {isAnalyzing ? (
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

                    {/* Results */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">2. Resultados da Análise</h3>

                        <AnimatePresence mode="wait">
                            {!analysis && !isAnalyzing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="border-2 border-dashed border-slate-800 rounded-2xl p-12 text-center bg-slate-900/20"
                                >
                                    <Palette size={48} className="mx-auto mb-4 text-slate-700" />
                                    <p className="text-slate-500">Os resultados aparecerão aqui após a análise</p>
                                </motion.div>
                            )}

                            {isAnalyzing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="border border-slate-700 rounded-2xl p-8 bg-slate-900/50 text-center"
                                >
                                    <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-white font-semibold">Analisando screenshot...</p>
                                    <p className="text-sm text-slate-500 mt-2">Isso pode levar alguns segundos</p>
                                </motion.div>
                            )}

                            {analysis && (
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
                                        <div className="grid grid-cols-2 gap-3">
                                            {analysis.dominantColors.map((color, i) => (
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

                                        <button
                                            onClick={handleUsePalette}
                                            className="mt-4 w-full px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle2 size={18} />
                                            Usar Esta Paleta no Editor
                                        </button>
                                    </div>

                                    {/* Analysis */}
                                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                                        <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">Análise Geral</h4>
                                        <p className="text-slate-300 leading-relaxed">{analysis.analysis}</p>
                                    </div>

                                    {/* Suggestions */}
                                    {analysis.suggestions.length > 0 && (
                                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                                            <h4 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <TrendingUp size={16} />
                                                Sugestões de Melhoria
                                            </h4>
                                            <ul className="space-y-2">
                                                {analysis.suggestions.map((suggestion, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-300">
                                                        <span className="text-green-400 mt-1">•</span>
                                                        <span className="text-sm">{suggestion}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Accessibility */}
                                    {(analysis.accessibility.contrastIssues.length > 0 || analysis.accessibility.recommendations.length > 0) && (
                                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                                            <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <AlertCircle size={16} />
                                                Acessibilidade
                                            </h4>

                                            {analysis.accessibility.contrastIssues.length > 0 && (
                                                <div className="mb-4">
                                                    <p className="text-xs text-slate-500 uppercase font-bold mb-2">Problemas Identificados:</p>
                                                    <ul className="space-y-1">
                                                        {analysis.accessibility.contrastIssues.map((issue, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-orange-300">
                                                                <span className="mt-1">⚠</span>
                                                                <span className="text-sm">{issue}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {analysis.accessibility.recommendations.length > 0 && (
                                                <div>
                                                    <p className="text-xs text-slate-500 uppercase font-bold mb-2">Recomendações:</p>
                                                    <ul className="space-y-1">
                                                        {analysis.accessibility.recommendations.map((rec, i) => (
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
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
