import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, LayoutTemplate, BrainCircuit } from 'lucide-react';
import { ViewMode } from '../types';

interface FeatureCardsProps {
    onNavigate: (mode: ViewMode) => void;
}

export default function FeatureCards({ onNavigate }: FeatureCardsProps) {
    const cards = [
        {
            id: 'generate',
            title: 'Gere',
            subtitle: 'IA cria paletas únicas',
            description: 'Deixe a inteligência artificial criar combinações de cores perfeitas baseadas em suas descrições ou sentimentos.',
            icon: Wand2,
            mode: ViewMode.FEATURE_GENERATE,
            gradient: 'from-blue-500 via-indigo-500 to-purple-600',
            delay: 0.1,
            image: '/assets/images/card-generate.png' // Placeholder or CSS effect
        },
        {
            id: 'visualize',
            title: 'Visualize',
            subtitle: 'Aplique em Interfaces',
            description: 'Veja como suas cores ficam em sites e apps reais instantaneamente.',
            icon: LayoutTemplate,
            mode: ViewMode.FEATURE_VISUALIZE,
            gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
            delay: 0.2,
            image: '/assets/images/card-visualize-v2.png'
        },
        {
            id: 'meanings',
            title: 'Significados',
            subtitle: 'Entenda as Cores',
            description: 'Descubra a psicologia por trás de cada tom e o que elas despertam no seu público.',
            icon: BrainCircuit,
            mode: ViewMode.FEATURE_MEANING, // We need to add this mode
            gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
            delay: 0.3,
            image: '/assets/images/foto-do-card.png'
        }
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4">
                    Simples. Poderoso.
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    A ferramenta definitiva para designers e desenvolvedores criarem sistemas de cores incríveis.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full">
                {cards.map((card) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: card.delay, duration: 0.5 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        onClick={() => {
                            console.log("Card clicked:", card.title, card.mode);
                            onNavigate(card.mode);
                        }}
                        className="relative group cursor-pointer h-[400px] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl"
                    >
                        {/* Background Gradient / Image Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`}></div>

                        <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/60 z-20 pointer-events-none"></div>

                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end z-30 pointer-events-none">
                            <div className="mb-auto">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg shadow-black/20 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <card.icon className="text-white" size={24} />
                                </div>
                            </div>

                            <motion.h3
                                className="text-3xl font-bold text-white mb-2"
                                layoutId={`title-${card.id}`}
                            >
                                {card.title}
                            </motion.h3>
                            <p className="text-lg font-medium text-white/90 mb-4">{card.subtitle}</p>
                            <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                {card.description}
                            </p>
                        </div>

                        {/* Click Overlay - Guarantees click capture */}
                        <button
                            className="absolute inset-0 z-50 w-full h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-3xl"
                            onClick={() => onNavigate(card.mode)}
                            aria-label={`Ir para ${card.title}`}
                        ></button>

                        {/* Hover Glow Effect */}
                        <div className={`absolute -inset-[100px] bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 pointer-events-none`}></div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
