import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BrainCircuit, ArrowRight, ShieldCheck, Flame, Sun,
    Leaf, Crown, Zap, User, Star
} from 'lucide-react';
import BackButton from '../BackButton';

interface MeaningPageProps {
    onStart: () => void;
    onBack: () => void;
}

const COLOR_MEANINGS = [
    {
        color: 'Azul',
        hex: '#3B82F6',
        gradient: 'from-blue-500 to-indigo-600',
        icon: ShieldCheck,
        meaning: 'Confiança, Segurança e Calma.',
        psychology: 'Diminui o apetite e estimula a produtividade. Associado a água e paz.',
        usage: 'Bancos, Tecnologia, Saúde, Corporativo.',
        bestFor: 'Sites que precisam passar credibilidade.'
    },
    {
        color: 'Vermelho',
        hex: '#EF4444',
        gradient: 'from-red-500 to-rose-600',
        icon: Flame,
        meaning: 'Paixão, Urgência e Perigo.',
        psychology: 'Aumenta a frequência cardíaca e cria senso de urgência.',
        usage: 'Gastronomia, Esportes, Promoções (Liquidação).',
        bestFor: 'Botões de CTA (Call to Action) e alertas.'
    },
    {
        color: 'Amarelo',
        hex: '#EAB308',
        gradient: 'from-yellow-400 to-amber-500',
        icon: Sun,
        meaning: 'Otimismo, Clareza e Calor.',
        psychology: 'Estimula processos mentais e o sistema nervoso. A primeira cor que o olho vê.',
        usage: 'Construção, Avisos, Vitrines de Loja.',
        bestFor: 'Chamar atenção para detalhes importantes.'
    },
    {
        color: 'Verde',
        hex: '#22C55E',
        gradient: 'from-green-500 to-emerald-600',
        icon: Leaf,
        meaning: 'Saúde, Dinheiro e Natureza.',
        psychology: 'A cor mais fácil para os olhos processarem. Relaxante e refrescante.',
        usage: 'Finanças, Produtos Naturais, Eco-friendly.',
        bestFor: 'Sites de sustentabilidade e investimentos.'
    },
    {
        color: 'Roxo',
        hex: '#A855F7',
        gradient: 'from-purple-500 to-violet-600',
        icon: Crown,
        meaning: 'Realeza, Sabedoria e Criatividade.',
        psychology: 'Frequentemente associado a marcas de luxo e produtos de beleza/anti-idade.',
        usage: 'Beleza, Espiritualidade, Luxo.',
        bestFor: 'Produtos premium e conteúdo criativo.'
    },
    {
        color: 'Laranja',
        hex: '#F97316',
        gradient: 'from-orange-500 to-red-500',
        icon: Zap,
        meaning: 'Amigável, Confiança e Energia.',
        psychology: 'Menos agressivo que o vermelho, mas ainda chama atenção. Cria um call-to-action amigável.',
        usage: 'Entretenimento, Infantil, E-commerce.',
        bestFor: 'Marcas jovens e botões de inscrição.'
    },
    {
        color: 'Preto',
        hex: '#000000',
        gradient: 'from-slate-800 to-black',
        icon: User,
        meaning: 'Poder, Elegância e Mistério.',
        psychology: 'Cria uma percepção de sofisticação e valor elevado.',
        usage: 'Moda, Carros de Luxo, Marketing.',
        bestFor: 'Produtos de alto padrão e portfólios minimalistas.'
    },
    {
        color: 'Branco',
        hex: '#FFFFFF',
        gradient: 'from-slate-100 to-white',
        icon: Star,
        meaning: 'Pureza, Limpeza e Minimalismo.',
        psychology: 'Promove a sensação de espaço e clareza mental.',
        usage: 'Medicina, Design, Tecnologia (Apple).',
        bestFor: 'Fundos de sites para facilitar a leitura.'
    }
];

export default function MeaningPage({ onStart, onBack }: MeaningPageProps) {
    return (
        <div className="h-full w-full relative overflow-y-auto bg-slate-950">
            <div className="max-w-7xl mx-auto p-6 md:p-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <div>
                        <div className="mb-6">
                            <BackButton onClick={onBack} label="Voltar" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                            Psicologia das Cores
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl">
                            Entenda o impacto subconsciente que cada cor exerce sobre seus usuários e escolha a paleta certa para o seu objetivo.
                        </p>
                    </div>

                    <button
                        onClick={onStart}
                        className="self-start md:self-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold shadow-lg shadow-indigo-500/25 flex items-center gap-3 transition hover:scale-105 shrink-0"
                    >
                        <BrainCircuit size={20} />
                        Analisar Meu Projeto
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                    {COLOR_MEANINGS.map((item, index) => (
                        <motion.div
                            key={item.color}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-colors group"
                        >
                            {/* Color Header ("Photo") */}
                            <div className={`h-32 bg-gradient-to-br ${item.gradient} p-6 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="relative z-10 flex justify-between items-start text-white">
                                    <h3 className={`text-2xl font-black ${item.color === 'Branco' ? 'text-slate-900' : 'text-white'}`}>{item.color}</h3>
                                    <div className={`p-2 rounded-xl bg-white/20 backdrop-blur-md ${item.color === 'Branco' ? 'text-slate-900' : 'text-white'}`}>
                                        <item.icon size={20} />
                                    </div>
                                </div>
                                {/* Shine effect */}
                                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Significado</h4>
                                    <p className="text-lg font-medium text-slate-200">{item.meaning}</p>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Psicologia</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.psychology}</p>
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <div className="flex flex-wrap gap-2">
                                        {item.usage.split(', ').map((tag, i) => (
                                            <span key={i} className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
