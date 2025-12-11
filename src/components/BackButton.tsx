import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    className?: string;
    onClick?: () => void;
    label?: string;
}

export default function BackButton({ className = "", onClick, label = "Voltar" }: BackButtonProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate('/');
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`
                group flex items-center gap-2 px-4 py-2 
                bg-slate-900/50 backdrop-blur-md border border-white/10 
                rounded-xl shadow-lg 
                text-slate-300 hover:text-white 
                hover:border-white/20 hover:bg-slate-800/60 
                transition-all duration-300 transform active:scale-95
                ${className}
            `}
        >
            <div className="p-1 rounded-full bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}
