import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, ArrowRight } from 'lucide-react';
import BackButton from '../BackButton';

interface MeaningPageProps {
    onStart: () => void;
    onBack: () => void;
}

export default function MeaningPage({ onStart, onBack }: MeaningPageProps) {
    return (
        <div className="h-full w-full relative overflow-hidden flex items-center justify-center p-6 bg-slate-950">
            {/* Background Effects */}
            <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl w-full z-10 text-center"
            >
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                        <BrainCircuit size={40} className="text-white" />
                    </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                    Significado das Cores
                </h1>

                <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Mais do que estética, cores são comunicação. Descubra como cada tonalidade influencia emoções, decisões e o comportamento do seu usuário.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="w-8 h-8 rounded-full bg-blue-500 mb-4"></div>
                        <h3 className="text-lg font-bold text-white mb-2">Confiança</h3>
                        <p className="text-sm text-slate-400">O azul transmite segurança e profissionalismo. Ideal para bancos e empresas de tecnologia.</p>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="w-8 h-8 rounded-full bg-red-500 mb-4"></div>
                        <h3 className="text-lg font-bold text-white mb-2">Urgência</h3>
                        <p className="text-sm text-slate-400">Vermelho atrai atenção imediata e estimula ação. Perfeito para promoções e call-to-actions.</p>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="w-8 h-8 rounded-full bg-green-500 mb-4"></div>
                        <h3 className="text-lg font-bold text-white mb-2">Crescimento</h3>
                        <p className="text-sm text-slate-400">Verde remete à natureza, saúde e dinheiro. Relaxa os olhos e transmite estabilidade.</p>
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <BackButton onClick={onBack} />
                    <button
                        onClick={onStart}
                        className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition hover:scale-105"
                    >
                        Analisar Minha Paleta <ArrowRight size={18} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
