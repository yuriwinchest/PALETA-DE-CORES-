import React, { useMemo } from 'react';
import { ColorDef } from '../types';
import { getContrastTextColor } from '../utils';
import { Globe, ShoppingCart, User, Menu, ArrowRight, Star } from 'lucide-react';

interface VisualizerProps {
  colors: ColorDef[];
}

const Visualizer: React.FC<VisualizerProps> = ({ colors }) => {
  // Simple heuristic to assign roles if not enough colors, or rotate through them
  const safeColors = useMemo(() => {
    if (colors.length === 0) return Array(5).fill({ hex: '#ccc' });
    const filled = [...colors];
    while (filled.length < 5) {
      filled.push(colors[filled.length % colors.length]);
    }
    return filled;
  }, [colors]);

  // Assign roles based on order (User can reorder in editor to change this)
  const bgMain = safeColors[0].hex;
  const bgSecondary = safeColors[1].hex;
  const primaryAction = safeColors[2].hex;
  const secondaryAction = safeColors[3].hex;
  const textMain = safeColors[4].hex; // Assuming the last color might be a dark/contrast color, or we force calculate text color

  // Determine text colors for accessibility on backgrounds
  const textOnBgMain = getContrastTextColor(bgMain);
  const textOnPrimary = getContrastTextColor(primaryAction);
  const textOnSecondary = getContrastTextColor(secondaryAction);

  return (
    <div className="w-full h-full bg-slate-900 p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        {/* Browser Mock Header */}
        <div className="bg-slate-800 p-3 flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="flex-1 bg-slate-700 rounded px-3 py-1 text-xs text-slate-400 text-center font-mono">
            website-preview.com
          </div>
        </div>

        {/* Website Content */}
        <div className="flex flex-col min-h-[600px]" style={{ backgroundColor: bgMain, color: textOnBgMain }}>
          
          {/* Nav */}
          <nav className="p-6 flex justify-between items-center" style={{ borderBottom: `1px solid ${secondaryAction}33` }}>
            <div className="font-bold text-2xl tracking-tight flex items-center gap-2">
              <Globe size={24} style={{ color: primaryAction }} />
              <span>Brand</span>
            </div>
            <div className="hidden md:flex space-x-8 font-medium">
              <span className="opacity-80 hover:opacity-100 cursor-pointer">Products</span>
              <span className="opacity-80 hover:opacity-100 cursor-pointer">Solutions</span>
              <span className="opacity-80 hover:opacity-100 cursor-pointer">Pricing</span>
            </div>
            <div className="flex items-center gap-4">
               <ShoppingCart size={20} className="opacity-70" />
               <User size={20} className="opacity-70" />
            </div>
          </nav>

          {/* Hero */}
          <header className="flex-1 flex flex-col md:flex-row items-center px-6 py-16 gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-2" 
                   style={{ backgroundColor: secondaryAction, color: textOnSecondary }}>
                New Collection
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                Design with <span style={{ color: primaryAction }}>Impact</span>.
              </h1>
              <p className="text-lg opacity-80 max-w-md leading-relaxed">
                Experience the perfect harmony of color and structure. This simulates how your palette applies to real-world interface elements.
              </p>
              <div className="flex gap-4 pt-4">
                <button 
                  className="px-8 py-4 rounded-lg font-bold shadow-lg transform transition hover:-translate-y-1 flex items-center gap-2"
                  style={{ backgroundColor: primaryAction, color: textOnPrimary }}
                >
                  Get Started <ArrowRight size={18} />
                </button>
                <button 
                  className="px-8 py-4 rounded-lg font-bold border-2 transition hover:bg-black/5"
                  style={{ borderColor: textOnBgMain, color: textOnBgMain }}
                >
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Abstract Graphic */}
            <div className="md:w-1/2 relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
                 style={{ backgroundColor: bgSecondary }}>
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: `radial-gradient(circle at 30% 30%, ${primaryAction} 0%, transparent 50%)`}}></div>
                <div className="text-center p-8 backdrop-blur-sm bg-white/10 rounded-xl border border-white/20">
                   <Star size={48} className="mx-auto mb-4" style={{ color: primaryAction }} />
                   <h3 className="text-2xl font-bold" style={{ color: getContrastTextColor(bgSecondary) }}>Premium Quality</h3>
                </div>
            </div>
          </header>

          {/* Feature Grid */}
          <section className="px-6 py-16" style={{ backgroundColor: secondaryAction }}>
             <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10" style={{ color: textOnSecondary }}>
                    <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-xl font-bold" 
                         style={{ backgroundColor: primaryAction, color: textOnPrimary }}>
                      {i}
                    </div>
                    <h4 className="text-xl font-bold mb-2">Feature {i}</h4>
                    <p className="opacity-70 text-sm">Automated color application allows you to verify accessibility and aesthetic balance instantly.</p>
                  </div>
                ))}
             </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Visualizer;
