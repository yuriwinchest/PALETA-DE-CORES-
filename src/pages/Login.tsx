import { SignIn } from "@stackframe/react";
import { Palette as PaletteIcon } from "lucide-react";

export default function Login() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-100 p-4">
            <div className="mb-8 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <PaletteIcon size={32} className="text-white" />
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        ChromaFlow
                    </h1>
                    <p className="text-slate-400 mt-2">Crie paletas de cores incríveis com IA</p>
                </div>
            </div>

            <div className="w-full max-w-md bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl">
                <SignIn fullPage={false} />
            </div>
        </div>
    );
}
