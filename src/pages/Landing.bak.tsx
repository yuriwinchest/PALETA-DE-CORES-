import { ArrowRight, Palette as PaletteIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, useStackApp } from "@stackframe/react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Landing() {
    const user = useUser();
    const stackApp = useStackApp();
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">

            {/* Minimal Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between backdrop-blur-md bg-slate-950/80"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <PaletteIcon size={18} className="text-white" />
                    </div>
                    <span className="text-lg font-bold">Estudo das Cores</span>
                </div>
                <button
                    onClick={() => {
                        if (user) navigate('/app');
                        else navigate('/sign-in');
                    }}
                    className="px-6 py-2 bg-white text-slate-900 rounded-full font-semibold hover:scale-105 transition-transform"
                >
                    {user ? "Painel" : "Entrar"}
                </button>
            </motion.header>

            {/* Hero Section - Fullscreen com Parallax */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image com Parallax */}
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/assets/images/hero-paint.png)',
                            filter: 'brightness(0.4)'
                        }}
                    />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950 z-10" />

                {/* Hero Content */}
                <div className="relative z-20 text-center px-6 max-w-5xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-6xl md:text-8xl font-black leading-none mb-8 tracking-tighter"
                    >
                        <span className="text-white">Domine o</span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Universo das Cores
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl md:text-2xl text-slate-300 mb-12 font-light max-w-3xl mx-auto"
                    >
                        A plataforma definitiva para estudar teoria cromática, explorar harmonias e criar paletas perfeitas com Inteligência Artificial.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <button
                            onClick={() => {
                                if (user) navigate('/app');
                                else navigate('/sign-in');
                            }}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-full text-lg font-bold hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all"
                        >
                            {user ? "Ir para o Painel" : "Começar Agora"} <ArrowRight size={24} />
                        </button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Features Grid - Minimalista */}
            <section className="py-32 px-6 bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-bold text-center mb-20"
                    >
                        Simples. <span className="text-indigo-400">Poderoso.</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Gere",
                                desc: "IA cria paletas únicas",
                                description: "Deixe a inteligência artificial criar combinações de cores perfeitas baseadas em suas descrições.",
                                image: "/assets/images/hero-paint.png", // Using a local asset if available or keep unsplash but vivid
                                // Actually, let's use the gradients from FeatureCards.tsx to match perfectly if possible, OR use the images but VIVID.
                                // The user explicitly liked "Filtro removido".
                                // FeatureCards used gradients/images.
                                // Let's replicate FeatureCards look: Gradient + transparent overlay.
                                gradient: "from-blue-500 via-indigo-500 to-purple-600",
                                route: "/generate"
                            },
                            {
                                title: "Visualize",
                                desc: "Aplique em Interfaces",
                                description: "Veja como suas cores ficam em sites e apps reais instantaneamente.",
                                image: "/assets/images/card-visualize-v2.png",
                                gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
                                route: "/visualize"
                            },
                            {
                                title: "Significados",
                                desc: "Entenda as Cores",
                                description: "Descubra a psicologia por trás de cada tom e o que elas despertam.",
                                image: "/assets/images/card-export.png", // Or similar
                                gradient: "from-emerald-400 via-teal-500 to-cyan-600",
                                route: "/meanings"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                whileHover={{ y: -10 }}
                                onClick={() => navigate(feature.route)}
                                className="group relative overflow-hidden rounded-3xl aspect-[3/4] cursor-pointer bg-slate-900 border border-white/10"
                            >
                                {/* Background Gradient as base */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`}></div>

                                {/* Image if available (Visualize) or just gradient style */}
                                {feature.image && !feature.image.includes('unsplash') && (
                                    <div className="absolute inset-0">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                                    <h3 className="text-4xl font-black mb-2 text-white">{feature.title}</h3>
                                    <p className="text-xl font-bold text-white/90 mb-2">{feature.desc}</p>
                                    <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Hover Glow */}
                                <div className={`absolute -inset-[100px] bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 pointer-events-none`}></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final - Minimalista */}
            <section className="py-32 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-6xl md:text-7xl font-black mb-8">
                        Pronto para criar?
                    </h2>
                    <p className="text-xl text-slate-400 mb-12">
                        Junte-se a milhares de designers e desenvolvedores
                    </p>
                    <button
                        onClick={() => {
                            if (user) navigate('/app');
                            else navigate('/sign-in');
                        }}
                        className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-xl font-bold hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
                    >
                        Começar Gratuitamente <ArrowRight size={28} />
                    </button>
                </motion.div>
            </section>

            {/* Footer Expandido */}
            <footer className="py-20 px-6 border-t border-white/5 bg-slate-950">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    {/* Brand & Copyright */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <PaletteIcon size={24} className="text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-100">Estudo das Cores</span>
                        </div>
                        <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                            A plataforma definitiva para criar, visualizar e exportar paletas de cores com o poder da Inteligência Artificial.
                        </p>
                        <p className="text-slate-600 text-xs mt-4">© 2025 Yuri Winchester. Todos os direitos reservados.</p>
                    </div>

                    {/* Author Section */}
                    <div className="bg-slate-900/50 rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-indigo-600/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-600/20 transition-colors duration-700"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2">Sobre o Criador</h3>
                            <h4 className="text-indigo-400 font-medium mb-4">Yuri Winchester <span className="text-slate-500 text-sm font-normal">| Desenvolvedor Full Stack</span></h4>

                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                Especializado em Soluções para Saúde, Comércio e Sistemas Empresariais Personalizados. Transformo desafios complexos em soluções tecnológicas robustas e escaláveis. Com experiência em desenvolvimento de sistemas completos, desde a arquitetura até a implementação, entrego produtos que fazem a diferença no seu negócio.
                            </p>

                            <a
                                href="https://yuri-winchester-portfolio-6lkk.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-white font-bold hover:text-indigo-400 transition-colors group/link"
                            >
                                Conheça meu Portfólio
                                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}
