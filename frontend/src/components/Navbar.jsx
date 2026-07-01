import { BrainCircuit } from "lucide-react";

function Navbar() {

    return (

        <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/60 border-b border-white/5">

            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 flex justify-center items-center shadow-xl">

                        <BrainCircuit size={30} />

                    </div>

                    <div>

                        <h1 className="text-3xl font-black gradient-text">

                            AI Hiring Intelligence

                        </h1>

                        <p className="text-slate-400 text-sm">

                            Semantic Search • Explainable AI

                        </p>

                    </div>

                </div>

                <div className="hidden lg:flex items-center gap-8">

                    <span className="text-slate-300 hover:text-cyan-400 duration-300 cursor-pointer">

                        Semantic Search

                    </span>

                    <span className="text-slate-300 hover:text-cyan-400 duration-300 cursor-pointer">

                        Candidate Intelligence

                    </span>

                    <span className="text-slate-300 hover:text-cyan-400 duration-300 cursor-pointer">

                        AI Analytics

                    </span>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;