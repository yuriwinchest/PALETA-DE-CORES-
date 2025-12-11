import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Sparkles, ArrowRight, BrainCircuit } from 'lucide-react';
import BackButton from '../BackButton';

interface GeneratePageProps {
    onStart: () => void;
    onBack: () => void;
}

export default function GeneratePage({ onStart, onBack }: GeneratePageProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="h-full w-full relative overflow-hidden flex items-center justify-center p-6 bg-slate-950">

            {/* Background Effects */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

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
                            className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mb-6"
                        />
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                            Gere com <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Inteligência
                            </span>
                        </h1>
                    </div>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                        Descreva seu projeto, sentimento ou ideia e deixe nossa IA criar a paleta de cores perfeita em segundos.
                        <br /><br />
                        <span className="text-sm text-slate-500 block">Exemplos: "Pôr do sol cyberpunk", "Cafeteria minimalista", "Site corporativo confiável".</span>
                    </p>

                    <motion.button
                        onClick={onStart}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="group relative inline-flex items-center gap-4 px-8 py-5 bg-white text-slate-950 rounded-full text-lg font-bold overflow-hidden transition-transform hover:scale-105"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Começar Agora <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </span>

                        {/* Button Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </motion.button>
                </div>

                {/* Right Visuals */}
                <div className="relative h-[500px] hidden lg:block">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-slate-800/50 rounded-full"
                    ></motion.div>

                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[40px] border border-slate-800/30 rounded-full border-dashed"
                    ></motion.div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative w-64 h-64 bg-gradient-to-br from-slate-900 to-black rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-xl"
                        >
                            {/* Inner Digital Brain Effect */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <div className={`absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 transition-opacity duration-700 ${hovered ? 'opacity-100' : 'opacity-40'}`}></div>

                            <BrainCircuit size={80} className={`text-white transition-all duration-500 ${hovered ? 'scale-110 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]' : ''}`} />

                            {/* Orbiting particles */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute w-full h-full"
                            >
                                <span className="absolute top-4 left-1/2 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]"></span>
                            </motion.div>
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[80%] h-[80%]"
                            >
                                <span className="absolute bottom-4 left-1/2 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]"></span>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Floating Color Cards */}
                    <FloatingCard color="#6366f1" delay={1} x={-120} y={-100} />
                    <FloatingCard color="#d946ef" delay={1.5} x={120} y={60} />
                    <FloatingCard color="#0ea5e9" delay={2} x={140} y={-80} />
                </div>
            </motion.div>
        </div>
    );
}

function FloatingCard({ color, delay, x, y }: { color: string, delay: number, x: number, y: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
                opacity: [0, 1, 1],
                x: [0, x, x + 10],
                y: [0, y, y - 10]
            }}
            transition={{
                duration: 4,
                delay: delay,
                times: [0, 0.8, 1],
                y: { repeat: Infinity, repeatType: "reverse", duration: 2, delay: delay + 4 }
            }}
            className="absolute left-1/2 top-1/2 w-16 h-20 rounded-xl shadow-lg border border-white/20 backdrop-blur-sm z-20"
            style={{ backgroundColor: color }}
        />
    )
}
