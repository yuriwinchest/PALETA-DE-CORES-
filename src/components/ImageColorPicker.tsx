import React, { useRef, useState, useEffect } from 'react';
import { Upload, Droplet, Plus, Ban } from 'lucide-react';

interface ImageColorPickerProps {
    onAddColor: (hex: string) => void;
}

export default function ImageColorPicker({ onAddColor }: ImageColorPickerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [hoverColor, setHoverColor] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
    const [showMagnifier, setShowMagnifier] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setImage(img);
                    setSelectedColor(null);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Resize canvas to fit container but maintain aspect ratio, max height 600
                const maxWidth = canvas.parentElement?.clientWidth || 800;
                const maxHeight = 600;
                let width = image.width;
                let height = image.height;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(image, 0, 0, width, height);
            }
        }
    }, [image]);

    // Helper to convert rgb to hex
    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMagnifierPos({ x, y });
        setShowMagnifier(true);

        const ctx = canvas.getContext('2d');
        if (ctx) {
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
            setHoverColor(hex);
        }
    };

    const handleMouseLeave = () => {
        setShowMagnifier(false);
        setHoverColor(null);
    };

    const handleClick = () => {
        if (hoverColor) {
            setSelectedColor(hoverColor);
        }
    };

    return (
        <div className="h-full flex flex-col p-6 overflow-hidden">
            {!image ? (
                <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl bg-slate-900/50 hover:bg-slate-900 hover:border-indigo-500 transition group p-8">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                            <Upload size={32} className="text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-200 mb-2">Carregar Imagem</h3>
                        <p className="text-slate-500 max-w-sm">Arraste uma imagem ou clique para selecionar. Você poderá extrair cores de qualquer pixel.</p>
                    </label>
                </div>
            ) : (
                <div className="flex-1 flex gap-6 overflow-hidden">
                    <div className="flex-1 flex items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800 p-4 relative overflow-hidden" id="canvas-container">
                        <canvas
                            ref={canvasRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleClick}
                            className={`cursor-crosshair shadow-2xl rounded-lg max-w-full max-h-full object-contain ${!image ? 'hidden' : ''}`}
                        />

                        {/* Magnifier / Tooltip */}
                        {showMagnifier && canvasRef.current && (
                            <div
                                className="pointer-events-none absolute z-20 border-2 border-white rounded-full overflow-hidden shadow-xl"
                                style={{
                                    left: magnifierPos.x + canvasRef.current!.offsetLeft + 20,
                                    top: magnifierPos.y + canvasRef.current!.offsetTop - 20,
                                    width: '64px',
                                    height: '64px',
                                    backgroundColor: hoverColor || 'transparent'
                                }}
                            >
                            </div>
                        )}
                    </div>

                    <div className="w-80 flex flex-col gap-4">
                        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                            <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                                <Droplet size={16} /> Cor Selecionada
                            </h3>

                            <div className="flex flex-col items-center gap-4">
                                <div
                                    className="w-24 h-24 rounded-2xl shadow-lg border-4 border-slate-700 transition-colors"
                                    style={{ backgroundColor: selectedColor || hoverColor || '#000000' }}
                                ></div>
                                <div className="text-center">
                                    <p className="text-2xl font-mono font-bold text-white tracking-wider">
                                        {selectedColor || hoverColor || '---'}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {selectedColor ? "Cor Fixada (Clique na imagem)" : (hoverColor ? "Cor sob o mouse" : "Selecione uma cor")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => selectedColor && onAddColor(selectedColor)}
                            disabled={!selectedColor}
                            className="py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition flex items-center justify-center gap-2"
                        >
                            <Plus size={20} />
                            Adicionar à Paleta
                        </button>

                        <button
                            onClick={() => { setImage(null); setSelectedColor(null); }}
                            className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium"
                        >
                            <Ban size={16} />
                            Limpar / Nova Imagem
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
