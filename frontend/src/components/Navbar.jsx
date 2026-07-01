import { BrainCircuit } from "lucide-react";

function Navbar() {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/70 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                {/* Logo */}
                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 flex justify-center items-center shadow-xl">
                        <BrainCircuit size={30} className="text-white" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-black gradient-text">
                            AI Hiring Intelligence
                        </h1>

                        <p className="text-slate-400 text-sm">
                            Powered by Semantic Search • Explainable AI
                        </p>
                    </div>

                </div>

                {/* Right Badge */}
                <div className="hidden lg:flex items-center">

                    <div className="px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-semibold tracking-wide shadow-lg">
                        🚀 AI-Powered Recruitment Platform
                    </div>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;