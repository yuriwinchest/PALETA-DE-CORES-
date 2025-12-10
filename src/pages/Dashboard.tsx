import React, { useState, useEffect } from 'react';
import {
    Palette as PaletteIcon, Plus, Trash2, LayoutTemplate,
    BrainCircuit, Download, RefreshCw, Wand2,
    SlidersHorizontal, Sparkles, Save, FolderOpen, FilePlus, UserCircle, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStackApp, useUser } from "@stackframe/react";
import { motion, AnimatePresence } from "framer-motion";
import { ColorDef, ViewMode, AIAnalysisResult, Palette } from '../types';
import { generateId } from '../utils';
import Visualizer from '../components/Visualizer';
import AnalysisPanel from '../components/AnalysisPanel';
import ExportModal from '../components/ExportModal';
import PaletteLibraryModal from '../components/PaletteLibraryModal';
import { analyzePaletteWithGemini, generatePaletteFromPrompt, getColorFromDescription } from '../services/geminiService';

const DEFAULT_COLORS: ColorDef[] = [
    { id: '1', hex: '#2563EB', name: 'Azul Real' },
    { id: '2', hex: '#1E293B', name: 'Ardósia Escura' },
    { id: '3', hex: '#F8FAFC', name: 'Gelo Claro' },
    { id: '4', hex: '#10B981', name: 'Esmeralda' },
    { id: '5', hex: '#F59E0B', name: 'Âmbar' },
];

export default function Dashboard() {
    // App State
    const [colors, setColors] = useState<ColorDef[]>(DEFAULT_COLORS);
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.EDITOR);
    const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [showExport, setShowExport] = useState(false);
    const [loadingColorIds, setLoadingColorIds] = useState<Set<string>>(new Set());

    // Palette & User Management State
    const [savedPalettes, setSavedPalettes] = useState<Palette[]>([]);
    const [showLibrary, setShowLibrary] = useState(false);
    const [paletteName, setPaletteName] = useState("Minha Paleta");
    const [currentPaletteId, setCurrentPaletteId] = useState<string | null>(null);

    const user = useUser();
    const stackApp = useStackApp();
    const navigate = useNavigate();

    // Initialize Data
    useEffect(() => {
        if (user) {
            fetchPalettes(user.id);
        } else {
            const localSaved = localStorage.getItem('chromaflow_palettes');
            if (localSaved) setSavedPalettes(JSON.parse(localSaved));
        }
    }, [user]);

    const fetchPalettes = async (userId: string) => {
        try {
            const res = await fetch('/api/palettes', {
                headers: {
                    'x-user-id': userId
                }
            });
            if (res.ok) {
                const data = await res.json();
                setSavedPalettes(data);
            }
        } catch (error) {
            console.error('Error fetching palettes:', error);
        }
    };

    const handleSavePalette = async () => {
        if (!user) {
            navigate('/sign-in');
            return;
        }

        const description = analysis?.overallVibe || `Criada em ${new Date().toLocaleDateString('pt-BR')}`;

        try {
            const res = await fetch('/api/palettes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.id
                },
                body: JSON.stringify({
                    id: currentPaletteId,
                    name: paletteName,
                    colors,
                    description
                })
            });

            if (res.ok) {
                const data = await res.json();
                if (!currentPaletteId && data[0]?.id) {
                    setCurrentPaletteId(data[0].id);
                }
                fetchPalettes(user.id);
                alert("Projeto salvo com sucesso!");
            } else {
                alert("Erro ao salvar.");
            }
        } catch (e) {
            alert("Erro de conexão ao salvar.");
        }
    };

    const handleLoadPalette = (palette: Palette) => {
        setColors(palette.colors);
        setPaletteName(palette.name);
        setCurrentPaletteId(palette.id);
        setAnalysis(null);
        setShowLibrary(false);
    };

    const handleDeletePalette = async (id: string) => {
        if (!user) return;

        try {
            const res = await fetch(`/api/palettes?id=${id}`, {
                method: 'DELETE',
                headers: { 'x-user-id': user.id }
            });

            if (res.ok) {
                fetchPalettes(user.id);
                if (currentPaletteId === id) {
                    setCurrentPaletteId(null);
                }
            } else {
                alert("Erro ao deletar paleta.");
            }
        } catch (e) {
            alert("Erro ao deletar paleta.");
        }
    };

    const handleLogout = async () => {
        await user?.signOut();
        navigate('/');
    };

    const handleNewPalette = () => {
        setColors(DEFAULT_COLORS.map(c => ({ ...c, id: generateId() })));
        setPaletteName("Nova Paleta");
        setCurrentPaletteId(null);
        setAnalysis(null);
        setPrompt('');
    };

    // Helper to update a color property
    const updateColor = (id: string, updates: Partial<ColorDef>) => {
        setColors(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
        setAnalysis(null); // Invalidate analysis on change
    };

    const removeColor = (id: string) => {
        setColors(prev => prev.filter(c => c.id !== id));
        setAnalysis(null);
    };

    const addColor = () => {
        setColors(prev => [
            ...prev,
            { id: generateId(), hex: '#000000', name: 'Nova Cor' }
        ]);
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            const result = await analyzePaletteWithGemini(colors);
            setAnalysis(result);

            setColors(prev => prev.map(c => {
                const analysisData = result.colorAnalysis.find(a => a.hex.toLowerCase() === c.hex.toLowerCase());
                return analysisData ? {
                    ...c,
                    psychology: analysisData.psychology,
                    usage: analysisData.recommendedUsage
                } : c;
            }));

        } catch (err) {
            alert("Falha ao analisar a paleta. Por favor, tente novamente.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        setIsGenerating(true);
        try {
            const result = await generatePaletteFromPrompt(prompt);
            const newColors: ColorDef[] = result.colors.map(c => ({
                id: generateId(),
                hex: c.hex,
                name: c.name
            }));
            setColors(newColors);
            setPaletteName(result.name || prompt);
            setCurrentPaletteId(null);
            setAnalysis(null);
            setPrompt('');
        } catch (err) {
            alert("Falha ao gerar paleta.");
        } finally {
            setIsGenerating(false);
        }
    }

    const handleMagicColorLookup = async (id: string, description: string) => {
        if (!description.trim()) return;

        setLoadingColorIds(prev => new Set(prev).add(id));
        try {
            const hex = await getColorFromDescription(description);
            updateColor(id, { hex });
        } catch (error) {
            console.error("Falha ao encontrar cor");
        } finally {
            setLoadingColorIds(prev => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        }
    };

    const moveColor = (index: number, direction: 'up' | 'down') => {
        const newColors = [...colors];
        if (direction === 'up' && index > 0) {
            [newColors[index], newColors[index - 1]] = [newColors[index - 1], newColors[index]];
        } else if (direction === 'down' && index < newColors.length - 1) {
            [newColors[index], newColors[index + 1]] = [newColors[index + 1], newColors[index]];
        }
        setColors(newColors);
    };

    return (
        <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden">

            {/* Header */}
            <header className="h-16 border-b border-white/5 bg-slate-900/60 backdrop-blur-md flex items-center justify-between px-6 z-10 shrink-0 sticky top-0 shadow-sm">
                <div className="flex items-center gap-2">
                    <motion.div
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20"
                    >
                        <PaletteIcon size={20} className="text-white" />
                    </motion.div>
                    <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        ChromaFlow <span className="text-xs text-slate-500 font-normal ml-2">v1.3</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* View Switcher */}
                    <div className="bg-slate-800/50 p-1 rounded-lg flex gap-1 border border-white/10 hidden sm:flex backdrop-blur-sm">
                        <button
                            onClick={() => setViewMode(ViewMode.EDITOR)}
                            className={`px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2 transition relative ${viewMode === ViewMode.EDITOR ? 'text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            {viewMode === ViewMode.EDITOR && (
                                <motion.div layoutId="tab-bg" className="absolute inset-0 bg-indigo-600 rounded shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                            )}
                            <span className="relative z-10 flex items-center gap-2"><SlidersHorizontal size={16} /> <span className="hidden lg:inline">Editor</span></span>
                        </button>
                        <button
                            onClick={() => setViewMode(ViewMode.VISUALIZER)}
                            className={`px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2 transition relative ${viewMode === ViewMode.VISUALIZER ? 'text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            {viewMode === ViewMode.VISUALIZER && (
                                <motion.div layoutId="tab-bg" className="absolute inset-0 bg-indigo-600 rounded shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                            )}
                            <span className="relative z-10 flex items-center gap-2"><LayoutTemplate size={16} /> <span className="hidden lg:inline">Visualizar</span></span>
                        </button>
                        <button
                            onClick={() => setViewMode(ViewMode.ANALYSIS)}
                            className={`px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2 transition relative ${viewMode === ViewMode.ANALYSIS ? 'text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            {viewMode === ViewMode.ANALYSIS && (
                                <motion.div layoutId="tab-bg" className="absolute inset-0 bg-indigo-600 rounded shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                            )}
                            <span className="relative z-10 flex items-center gap-2"><BrainCircuit size={16} /> <span className="hidden lg:inline">Análise</span></span>
                        </button>
                    </div>

                    <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>

                    <button
                        onClick={() => setShowExport(true)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                        title="Exportar"
                    >
                        <Download size={20} />
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3 bg-slate-800/50 py-1 pl-3 pr-1 rounded-full border border-slate-700">
                            <span className="text-xs text-slate-300 max-w-[100px] truncate">{user.primaryEmail}</span>
                            <button
                                onClick={handleLogout}
                                className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-full text-slate-300 transition"
                                title="Sair"
                            >
                                <LogOut size={14} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/sign-in')}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition border border-slate-700"
                        >
                            <UserCircle size={18} /> Entrar
                        </button>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">

                {/* Left Sidebar: Palette Builder */}
                <aside className={`w-full md:w-80 lg:w-96 bg-slate-900/80 backdrop-blur-xl border-r border-white/5 flex flex-col shrink-0 transition-all duration-300 ${viewMode !== ViewMode.EDITOR ? 'hidden md:flex' : 'flex'}`}>

                    {/* Palette Management Section */}
                    <div className="p-6 pb-4 border-b border-white/5 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <input
                                type="text"
                                value={paletteName}
                                onChange={(e) => setPaletteName(e.target.value)}
                                className="bg-transparent text-lg font-bold text-white w-full outline-none border-b border-transparent focus:border-indigo-500 placeholder-slate-500 hover:border-slate-700 transition"
                                placeholder="Nome do Projeto"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleNewPalette}
                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1 border border-slate-700"
                                title="Novo Projeto"
                            >
                                <FilePlus size={14} /> Novo
                            </button>
                            <button
                                onClick={() => {
                                    if (!user) {
                                        navigate('/sign-in');
                                    } else {
                                        setShowLibrary(true);
                                    }
                                }}
                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1 border border-slate-700"
                                title="Abrir Projeto"
                            >
                                <FolderOpen size={14} /> Abrir
                            </button>
                            <button
                                onClick={handleSavePalette}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1 shadow-lg shadow-indigo-500/20"
                                title="Salvar Projeto"
                            >
                                <Save size={14} /> Salvar
                            </button>
                        </div>
                    </div>

                    {/* AI Generator Input */}
                    <div className="p-6 border-b border-white/5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
                            <Wand2 size={12} /> Gerador com IA
                        </label>
                        <form onSubmit={handleGenerate} className="relative">
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="ex: 'Pôr do sol em Tóquio'"
                                className="w-full bg-slate-800/50 text-sm text-white placeholder-slate-500 rounded-lg px-4 py-3 pr-10 border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                            />
                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="absolute right-2 top-2 p-1 bg-indigo-600 hover:bg-indigo-500 rounded text-white transition disabled:opacity-50"
                            >
                                {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />}
                            </button>
                        </form>
                    </div>

                    {/* Color List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-bold text-slate-300">Cores</h3>
                            <span className="text-xs text-slate-500">{colors.length} cores</span>
                        </div>

                        <AnimatePresence>
                            {colors.map((color, index) => (
                                <motion.div
                                    key={color.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="group bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 hover:border-indigo-500/50 transition-all shadow-sm flex items-center gap-3 relative hover:bg-slate-800"
                                >

                                    {/* Drag Handle */}
                                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity cursor-grab">
                                        <button onClick={() => moveColor(index, 'up')} className="hover:text-white"><div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-current"></div></button>
                                        <button onClick={() => moveColor(index, 'down')} className="hover:text-white"><div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-current"></div></button>
                                    </div>

                                    {/* Color Input */}
                                    <div className="relative w-12 h-12 rounded-lg shadow-inner overflow-hidden shrink-0 border border-slate-600/50 group-hover:scale-105 transition-transform">
                                        <input
                                            type="color"
                                            value={color.hex}
                                            onChange={(e) => updateColor(color.id, { hex: e.target.value })}
                                            className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={color.name}
                                                onChange={(e) => updateColor(color.id, { name: e.target.value })}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleMagicColorLookup(color.id, color.name);
                                                    }
                                                }}
                                                className="bg-transparent text-sm font-semibold text-white w-full outline-none border-b border-transparent focus:border-indigo-500 placeholder-slate-500 pr-6"
                                                placeholder="ex: 'Azul Céu'"
                                            />
                                            <button
                                                onClick={() => handleMagicColorLookup(color.id, color.name)}
                                                className={`absolute right-0 top-0 text-indigo-400 hover:text-indigo-300 transition ${!color.name ? 'opacity-0' : 'opacity-100'}`}
                                                title="Busca de Cor IA (Digite o nome e clique)"
                                                disabled={loadingColorIds.has(color.id)}
                                            >
                                                {loadingColorIds.has(color.id) ? (
                                                    <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                                                ) : (
                                                    <Sparkles size={12} />
                                                )}
                                            </button>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono text-slate-400 uppercase">{color.hex}</span>
                                            </div>
                                            {color.psychology && (
                                                <div className="flex items-center gap-1 text-[10px] text-indigo-400/80">
                                                    <BrainCircuit size={10} />
                                                    <span className="truncate max-w-[180px]" title={color.psychology}>{color.psychology}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeColor(color.id)}
                                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <button
                            onClick={addColor}
                            className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700/50 text-slate-500 hover:border-indigo-500 hover:text-indigo-400 transition flex items-center justify-center gap-2 font-medium hover:bg-slate-800/30"
                        >
                            <Plus size={18} /> Adicionar Cor
                        </button>
                    </div>
                </aside>

                {/* Right Content Area */}
                <section className="flex-1 bg-slate-950 relative overflow-hidden flex flex-col">
                    <AnimatePresence mode="wait">
                        {viewMode === ViewMode.EDITOR && (
                            <motion.div
                                key="editor"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="h-full flex items-center justify-center text-slate-500 p-8 text-center"
                            >
                                <div className="max-w-md">
                                    <LayoutTemplate size={64} className="mx-auto mb-6 opacity-20" />
                                    <h2 className="text-2xl font-bold text-slate-300 mb-2">Pronto para Criar</h2>
                                    <p className="mb-8">Use a barra lateral para definir suas cores. Mude para "Visualizar" para vê-las em ação ou "Análise" para insights da IA.</p>
                                    <button
                                        onClick={() => setViewMode(ViewMode.VISUALIZER)}
                                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition shadow-lg shadow-indigo-500/25"
                                    >
                                        Abrir Visualização
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {viewMode === ViewMode.VISUALIZER && (
                            <motion.div
                                key="visualizer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full w-full"
                            >
                                <Visualizer colors={colors} />
                            </motion.div>
                        )}

                        {viewMode === ViewMode.ANALYSIS && (
                            <motion.div
                                key="analysis"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full w-full"
                            >
                                <AnalysisPanel
                                    colors={colors}
                                    analysis={analysis}
                                    isLoading={isAnalyzing}
                                    onAnalyze={handleAnalyze}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </main>

            <ExportModal colors={colors} isOpen={showExport} onClose={() => setShowExport(false)} />

            <PaletteLibraryModal
                isOpen={showLibrary}
                onClose={() => setShowLibrary(false)}
                palettes={savedPalettes}
                onLoad={handleLoadPalette}
                onDelete={handleDeletePalette}
            />
        </div>
    );
}
