import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate, Layers, ArrowRight, Laptop } from 'lucide-react';
import BackButton from '../BackButton';

interface VisualizePageProps {
    onStart: () => void;
    onBack: () => void;
}

export default function VisualizePage({ onStart, onBack }: VisualizePageProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="h-full w-full relative overflow-hidden flex items-center justify-center p-6 bg-slate-950">

            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="max-w-5xl w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                {/* Left Content */}
                <div className="space-y-8">
                    <div className="mb-8">
                        <BackButton onClick={onBack} label="Voltar para Menu" />
                    </div>

                    <div className="relative">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100px" }}
                            className="h-1 bg-gradient-to-r from-fuchsia-500 to-rose-600 mb-6"
                        />
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                            Visualize em <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400">
                                Tempo Real
                            </span>
                        </h1>
                    </div>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                        Aplique suas paletas instantaneamente em interfaces reais de sites, aplicativos e dashboards.
                        <br /><br />
                        <span className="text-sm text-slate-500 block">Teste contrastes, validação de acessibilidade e harmonia visual antes de escrever uma linha de código.</span>
                    </p>

                    <motion.button
                        onClick={onStart}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="group relative inline-flex items-center gap-4 px-8 py-5 bg-white text-slate-950 rounded-full text-lg font-bold overflow-hidden transition-transform hover:scale-105"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Ver Demos <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </span>

                        {/* Button Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </motion.button>
                </div>

                {/* Right Visuals */}
                <div className="relative h-[500px] hidden lg:block">
                    {/* Mockup Container */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center transform perspective-1000"
                    >
                        <div className={`relative w-[400px] h-[300px] bg-slate-900 rounded-lg border border-slate-700 shadow-2xl overflow-hidden transition-all duration-500 ${hovered ? 'scale-105 rotate-y-6' : 'rotate-y-0'}`}>
                            {/* Browser Header */}
                            <div className="h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>

                            {/* Mockup Content */}
                            <div className="p-6 grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="h-24 rounded-lg bg-gradient-to-br from-fuchsia-500 to-rose-500 animate-pulse"></div>
                                    <div className="h-4 w-3/4 bg-slate-700 rounded"></div>
                                    <div className="h-4 w-1/2 bg-slate-700 rounded"></div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="h-8 w-full bg-slate-800 rounded"></div>
                                    <div className="h-20 w-full bg-slate-800/50 rounded border border-dashed border-slate-700"></div>
                                </div>
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50"></div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
