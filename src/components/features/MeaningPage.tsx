import React from 'react';
import { motion } from 'framer-motion';
import {
    BrainCircuit, ArrowRight, ShieldCheck, Flame, Sun,
    Leaf, Crown, Zap, User, Star, Lightbulb, Palette
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
        usage: 'Bancos, Tecnologia, Saúde.',
        bestFor: 'Sites que precisam passar credibilidade.',
        harmonies: ['#F97316', '#94A3B8'], // Laranja (Compl), Cinza
        brands: ['Samsung', 'Facebook', 'IBM'],
        curiosity: 'É a cor favorita de 45% das pessoas no mundo, sendo a mais "segura" para marcas globais.'
    },
    {
        color: 'Vermelho',
        hex: '#EF4444',
        gradient: 'from-red-500 to-rose-600',
        icon: Flame,
        meaning: 'Paixão, Urgência e Perigo.',
        psychology: 'Aumenta a frequência cardíaca e cria senso de urgência.',
        usage: 'Gastronomia, Esportes, Promoções.',
        bestFor: 'Botões de CTA e alertas importantes.',
        harmonies: ['#22C55E', '#FFFFFF'], // Verde (Compl), Branco
        brands: ['Netflix', 'Coca-Cola', 'YouTube'],
        curiosity: 'É a primeira cor que um bebê consegue distinguir após o preto e branco.'
    },
    {
        color: 'Amarelo',
        hex: '#EAB308',
        gradient: 'from-yellow-400 to-amber-500',
        icon: Sun,
        meaning: 'Otimismo, Clareza e Calor.',
        psychology: 'Estimula processos mentais e o sistema nervoso.',
        usage: 'Construção, Avisos, Vitrines.',
        bestFor: 'Chamar atenção para detalhes (não use no fundo todo!).',
        harmonies: ['#A855F7', '#000000'], // Roxo (Compl), Preto
        brands: ['McDonald\'s', 'IKEA', 'Snapchat'],
        curiosity: 'É a cor mais visível à distância, por isso é usada em táxis e placas de trânsito.'
    },
    {
        color: 'Verde',
        hex: '#22C55E',
        gradient: 'from-green-500 to-emerald-600',
        icon: Leaf,
        meaning: 'Saúde, Dinheiro e Natureza.',
        psychology: 'A cor mais fácil para os olhos processarem. Relaxa e acalma.',
        usage: 'Finanças, Eco-friendly, Hortifruti.',
        bestFor: 'Produtos sustentáveis e botões de "Sucesso".',
        harmonies: ['#EF4444', '#3B82F6'], // Vermelho (Compl), Azul
        brands: ['Spotify', 'Starbucks', 'Android'],
        curiosity: 'Nos cassinos, mesas verdes são usadas para relaxar os jogadores e estimulá-los a gastar mais.'
    },
    {
        color: 'Roxo',
        hex: '#A855F7',
        gradient: 'from-purple-500 to-violet-600',
        icon: Crown,
        meaning: 'Realeza, Sabedoria e Criatividade.',
        psychology: 'Frequentemente associado a marcas de luxo e mistério.',
        usage: 'Beleza, Espiritualidade, Luxo.',
        bestFor: 'Produtos premium e conteúdo criativo.',
        harmonies: ['#EAB308', '#EC4899'], // Amarelo (Compl), Rosa
        brands: ['Nubank', 'Twitch', 'Cadbury'],
        curiosity: 'Antigamente, o corante roxo era tão caro que apenas imperadores podiam usá-lo.'
    },
    {
        color: 'Laranja',
        hex: '#F97316',
        gradient: 'from-orange-500 to-red-500',
        icon: Zap,
        meaning: 'Amigável, Confiança e Energia.',
        psychology: 'Menos agressivo que o vermelho, cria um call-to-action amigável.',
        usage: 'Entretenimento, Infantil, E-commerce.',
        bestFor: 'Marcas jovens e botões de inscrição.',
        harmonies: ['#3B82F6', '#FACC15'], // Azul (Compl), Amarelo
        brands: ['Fanta', 'Mastercard', 'Nickelodeon'],
        curiosity: 'É a cor que mais estimula o apetite social e a comunicação.'
    },
    {
        color: 'Preto',
        hex: '#000000',
        gradient: 'from-slate-800 to-black',
        icon: User,
        meaning: 'Poder, Elegância e Mistério.',
        psychology: 'Cria uma percepção de sofisticação e valor elevado.',
        usage: 'Moda, Carros de Luxo, Marketing.',
        bestFor: 'Produtos de alto padrão e minimalismo.',
        harmonies: ['#FFFFFF', '#EAB308'], // Branco, Dourado
        brands: ['Apple', 'Nike', 'Chanel'],
        curiosity: 'No marketing, o preto é usado para atingir o público que valoriza exclusividade.'
    },
    {
        color: 'Branco',
        hex: '#FFFFFF',
        gradient: 'from-slate-100 to-white',
        icon: Star,
        meaning: 'Pureza, Limpeza e Minimalismo.',
        psychology: 'Promove a sensação de espaço e clareza mental.',
        usage: 'Medicina, Design, Tecnologia.',
        bestFor: 'Fundos de sites para facilitar a leitura.',
        harmonies: ['#000000', '#3B82F6'], // Preto, Azul
        brands: ['Apple', 'Tesla', 'Wikipedia'],
        curiosity: 'O olho humano percebe o branco quando todos os comprimentos de onda de luz são refletidos.'
    }
];

export default function MeaningPage({ onStart, onBack }: MeaningPageProps) {
    return (
        <div className="h-full w-full relative overflow-y-auto bg-slate-950/50 backdrop-blur-sm">
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
                            Descubra o impacto subconsciente de cada cor, harmonize combinações e veja exemplos reais de grandes marcas.
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
                            className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-colors group flex flex-col h-full"
                        >
                            {/* Color Header ("Photo") */}
                            <div className={`h-36 bg-gradient-to-br ${item.gradient} p-6 relative overflow-hidden shrink-0`}>
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="relative z-10 flex justify-between items-start text-white">
                                    <div>
                                        <h3 className={`text-2xl font-black ${item.color === 'Branco' ? 'text-slate-900' : 'text-white'}`}>{item.color}</h3>
                                        <div className={`flex items-center gap-2 text-xs font-medium mt-1 ${item.color === 'Branco' ? 'text-slate-700' : 'text-white/80'}`}>
                                            <Palette size={12} />
                                            <span>{item.hex}</span>
                                        </div>
                                    </div>
                                    <div className={`p-2 rounded-xl bg-white/20 backdrop-blur-md ${item.color === 'Branco' ? 'text-slate-900' : 'text-white'}`}>
                                        <item.icon size={20} />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col gap-6 flex-1">
                                <div>
                                    <p className="text-lg font-bold text-slate-200 leading-tight mb-2">{item.meaning}</p>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.psychology}</p>
                                </div>

                                {/* Usage & Brands */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Ideal Para</h4>
                                        <p className="text-xs text-slate-300 font-medium">{item.usage}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Marcas</h4>
                                        <p className="text-xs text-slate-300 font-medium">{item.brands.join(', ')}</p>
                                    </div>
                                </div>

                                {/* Harmonies */}
                                <div>
                                    <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Harmonias Sugeridas</h4>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full border-2 border-slate-700 shadow-sm"
                                            style={{ backgroundColor: item.hex }}
                                            title="Cor Principal"
                                        ></div>
                                        <span className="text-slate-600">+</span>
                                        {item.harmonies.map((h, i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full border-2 border-slate-700 shadow-sm"
                                                style={{ backgroundColor: h }}
                                                title="Combinação"
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Curiosity Box (Footer) */}
                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <div className="flex gap-3">
                                        <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
                                        <p className="text-xs text-slate-400 italic">"{item.curiosity}"</p>
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
