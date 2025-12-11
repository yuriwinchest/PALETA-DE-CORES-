import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorDef } from '../types';
import { getContrastTextColor } from '../utils';
import { Globe, ShoppingCart, User, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from './BackButton';

interface VisualizerProps {
  colors: ColorDef[];
}

const Visualizer: React.FC<VisualizerProps> = ({ colors }) => {
  const navigate = useNavigate();
  const safeColors = useMemo(() => {
    if (colors.length === 0) return Array(5).fill({ hex: '#ccc' });
    const filled = [...colors];
    while (filled.length < 5) {
      filled.push(colors[filled.length % colors.length]);
    }
    return filled;
  }, [colors]);

  const bgMain = safeColors[0].hex;
  const bgSecondary = safeColors[1].hex;
  const primaryAction = safeColors[2].hex;
  const secondaryAction = safeColors[3].hex;
  const textMain = safeColors[4].hex;

  const textOnBgMain = getContrastTextColor(bgMain);
  const textOnPrimary = getContrastTextColor(primaryAction);
  const textOnSecondary = getContrastTextColor(secondaryAction);

  return (
    <div className="w-full h-full bg-slate-950 p-4 overflow-y-auto flex items-center justify-center pb-20 relative">

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-50 px-4 py-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg backdrop-blur-sm border border-white/10 transition-colors text-sm font-medium flex items-center gap-2"
      >
        ← Voltar
      </button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50 ring-4 ring-slate-900/50"
      >
        {/* Browser Mock Header */}
        <div className="bg-slate-900 p-3 flex items-center space-x-2 border-b border-white/5">
          <div className="flex gap-1.5 ml-1">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex-1 max-w-xl mx-auto bg-slate-800/50 rounded-lg px-3 py-1.5 text-xs text-slate-400 text-center font-mono border border-white/5 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-500/50"></span> preview-site.com.br
          </div>
          <div className="w-16"></div>
        </div>

        {/* Website Content */}
        <div className="flex flex-col min-h-[600px] transition-colors duration-500" style={{ backgroundColor: bgMain, color: textOnBgMain }}>

          {/* Nav */}
          <nav className="p-6 flex justify-between items-center backdrop-blur-sm bg-white/5" style={{ borderBottom: `1px solid ${secondaryAction}22` }}>
            <div className="font-bold text-2xl tracking-tight flex items-center gap-2">
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: primaryAction, color: textOnPrimary }}>
                <Globe size={20} />
              </div>
              <span style={{ color: textOnBgMain }}>Brand</span>
            </div>
            <div className="hidden md:flex space-x-8 font-medium">
              {['Produtos', 'Soluções', 'Preços'].map((item, i) => (
                <span key={i} className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all group-hover:w-full"></span>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <ShoppingCart size={20} className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: secondaryAction, color: textOnSecondary }}>
                <User size={16} />
              </div>
            </div>
          </nav>

          {/* Hero */}
          <header className="flex-1 flex flex-col md:flex-row items-center px-8 py-20 gap-16">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:w-1/2 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm"
                style={{ backgroundColor: secondaryAction, color: textOnSecondary }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                Nova Coleção 2025
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                Design com <br />
                <span className="relative inline-block px-2">
                  <span className="absolute inset-0 transform -skew-x-3 opacity-20 rounded" style={{ backgroundColor: primaryAction }}></span>
                  <span className="relative" style={{ color: primaryAction }}>Impacto</span>.
                </span>
              </h1>

              <p className="text-lg opacity-80 max-w-lg leading-relaxed border-l-2 pl-6" style={{ borderColor: primaryAction }}>
                Experimente a harmonia perfeita de cores. Esta visualização simula como sua paleta se comporta em um design moderno e responsivo.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => navigate('/app')}
                  className="px-8 py-4 rounded-xl font-bold shadow-xl shadow-black/5 transform transition hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2 active:scale-95 cursor-pointer"
                  style={{ backgroundColor: primaryAction, color: textOnPrimary }}
                >
                  Começar Agora <ArrowRight size={18} />
                </button>
                <button
                  className="px-8 py-4 rounded-xl font-bold border-2 transition hover:bg-black/5 active:scale-95 cursor-pointer"
                  style={{ borderColor: textOnBgMain, color: textOnBgMain }}
                >
                  Ver Demo
                </button>
              </div>
            </motion.div>

            {/* Abstract Graphic */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:w-1/2 relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-500"
              style={{ backgroundColor: bgSecondary }}
            >
              <div className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{ backgroundImage: `radial-gradient(circle at 30% 30%, ${primaryAction} 0%, transparent 70%)` }}></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 opacity-30 rounded-full blur-3xl" style={{ backgroundColor: secondaryAction }}></div>

              <div className="text-center p-10 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl relative z-10 max-w-xs">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl rotate-3 flex items-center justify-center shadow-lg" style={{ backgroundColor: primaryAction, color: textOnPrimary }}>
                  <Star size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-2" style={{ color: getContrastTextColor(bgSecondary) }}>Premium</h3>
                <p className="opacity-80 text-sm" style={{ color: getContrastTextColor(bgSecondary) }}>Qualidade visual garantida.</p>
              </div>
            </motion.div>
          </header>

          {/* Feature Grid */}
          <section className="px-8 py-20" style={{ backgroundColor: secondaryAction }}>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors shadow-lg"
                  style={{ color: textOnSecondary }}
                >
                  <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center text-xl font-bold shadow-md"
                    style={{ backgroundColor: primaryAction, color: textOnPrimary }}>
                    {i}
                  </div>
                  <h4 className="text-xl font-bold mb-3">Recurso Incrível {i}</h4>
                  <p className="opacity-70 leading-relaxed">A aplicação automática de cores fornece feedback visual imediato sobre contraste e hierarquia.</p>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
};

export default Visualizer;