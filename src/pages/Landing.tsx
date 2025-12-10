import { Palette as PaletteIcon, ArrowRight, UserCircle, Star, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@stackframe/react";
import { motion } from "framer-motion";

export default function Landing() {
    const user = useUser();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">

            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="px-6 h-20 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-950/60 backdrop-blur-xl z-50"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <PaletteIcon size={24} className="text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        ChromaFlow
                    </span>
                </div>
                <nav className="flex items-center gap-4">
                    {user ? (
                        <Link
                            to="/app"
                            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition border border-slate-700 flex items-center gap-2"
                        >
                            Ir para o App <ArrowRight size={16} />
                        </Link>
                    ) : (
                        <Link
                            to="/sign-in"
                            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transform"
                        >
                            <UserCircle size={18} /> Entrar
                        </Link>
                    )}
                </nav>
            </motion.header>

            {/* Hero Section */}
            <main className="flex-1 flex items-center justify-center relative overflow-hidden px-6 py-20 md:py-32">
                {/* Background Gradients */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none -z-10 mix-blend-screen"
                />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        Novo: Geração de Paletas com IA
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8"
                    >
                        A paleta perfeita para o seu <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient">próximo projeto.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Gere, visualize e exporte paletas de cores incríveis em segundos.
                        Use o poder da inteligência artificial para encontrar a harmonia ideal.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            to={user ? "/app" : "/sign-in"}
                            className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:-translate-y-1 transform flex items-center gap-2"
                        >
                            Começar Agora <ArrowRight size={20} />
                        </Link>
                        <a
                            href="#features"
                            className="px-8 py-4 bg-white/5 text-slate-300 rounded-xl font-semibold text-lg hover:bg-white/10 hover:text-white transition border border-white/10 backdrop-blur"
                        >
                            Saber mais
                        </a>
                    </motion.div>
                </div>
            </main>

            {/* Feature Grid just for visual balance */}
            <section id="features" className="py-24 px-6 border-t border-white/5 bg-slate-900/30 backdrop-blur-sm relative">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        { icon: PaletteIcon, title: "Editor Visual", text: "Monte suas paletas visualmente, ajuste cores em tempo real e visualize em componentes de UI.", color: "text-indigo-400", bg: "bg-indigo-500/10" },
                        { icon: Zap, title: "Exportação Fácil", text: "Exporte para CSS, Tailwind, JSON e muito mais com um único clique para usar no seu código.", color: "text-purple-400", bg: "bg-purple-500/10" },
                        { icon: Shield, title: "Salvar na Nuvem", text: "Crie sua conta e salve todas as suas paletas na nuvem para acessar de qualquer lugar.", color: "text-emerald-400", bg: "bg-emerald-500/10" }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/10 transition group"
                        >
                            <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`${feature.color}`} size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{feature.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5 bg-slate-950">
                <p>© 2025 ChromaFlow. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
