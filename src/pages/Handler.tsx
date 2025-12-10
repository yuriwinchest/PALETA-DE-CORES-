import { useStackApp } from "@stackframe/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Handler() {
    const stackApp = useStackApp();
    const navigate = useNavigate();

    useEffect(() => {
        // Handle Stack Auth redirects or logic here if needed, 
        // usually generic handler is handled by Stack provider but explicit route helps.
        // For now, simple redirect to home.
        navigate('/');
    }, [navigate]);

    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Carregando...</div>;
}
