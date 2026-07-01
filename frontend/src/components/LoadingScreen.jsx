import { BrainCircuit } from "lucide-react";

function LoadingScreen() {

    const steps = [

        "Parsing Job Description",

        "Semantic Candidate Search",

        "Capability Intelligence",

        "AI Multi-Factor Ranking",

        "Explainable Hiring Insights"

    ];

    return (

        <div className="min-h-screen flex justify-center items-center px-6">

            <div className="glass rounded-3xl p-12 w-full max-w-3xl shadow-2xl">

                <div className="flex justify-center mb-6">

                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 flex justify-center items-center animate-pulse">

                        <BrainCircuit

                            size={42}

                            className="text-white"

                        />

                    </div>

                </div>

                <h1 className="text-5xl font-black text-center gradient-text">

                    AI Hiring Intelligence

                </h1>

                <p className="text-center text-slate-400 mt-4 text-lg">

                    Generating Candidate Intelligence Report...

                </p>

                <div className="mt-10 space-y-6">

                    {

                        steps.map(

                            (

                                step,

                                index

                            ) => (

                                <LoadingItem

                                    key={index}

                                    text={step}

                                />

                            )

                        )

                    }

                </div>

                <div className="mt-10 text-center text-cyan-400 text-sm">

                    Powered by Semantic Search • Explainable AI • Candidate Intelligence

                </div>

            </div>

        </div>

    );

}

function LoadingItem({

    text

}) {

    return (

        <div>

            <div className="flex justify-between text-slate-300">

                <span>

                    {text}

                </span>

                <span className="text-green-400">

                    ✓

                </span>

            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">

                <div className="h-2 w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-pulse">

                </div>

            </div>

        </div>

    );

}

export default LoadingScreen;