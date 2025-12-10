import { SignIn } from "@stackframe/react";
import { Palette as PaletteIcon } from "lucide-react";

export default function Login() {
    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-100">
            {/* Left Side: Artistic Image (Hidden on mobile) */}
            <div
                className="hidden md:block md:w-1/2 relative overflow-hidden"
                style={{
                    backgroundImage: 'url(/assets/images/login-art.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Overlay for better text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/50"></div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 md:w-1/2">
                <div className="w-full max-w-md">
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

                    <div className="w-full bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl">
                        <SignIn fullPage={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}
