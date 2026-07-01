import { Bot, Sparkles, ShieldCheck, BrainCircuit } from "lucide-react";

function AIRecruiter({ candidate }) {

    if (!candidate) return null;

    const confidence = Math.min(
        98,
        Math.round(candidate.final_score * 2.3)
    );

    return (

        <div className="glass rounded-3xl p-8 h-full">

            <div className="flex items-center gap-4 mb-8">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 flex justify-center items-center shadow-xl">

                    <Bot size={30} />

                </div>

                <div>

                    <h2 className="text-3xl font-bold">

                        AI Hiring Assistant

                    </h2>

                    <p className="text-slate-400">

                        Explainable Hiring Intelligence

                    </p>

                </div>

            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">

                <div className="flex items-center gap-3 mb-3">

                    <BrainCircuit className="text-cyan-400" />

                    <h3 className="font-bold text-xl">

                        Candidate Analysis

                    </h3>

                </div>

                <p className="text-cyan-400 text-lg font-semibold">

                    Why should I interview {candidate.candidate}?

                </p>

            </div>

            <div className="mt-8 space-y-4">

                {

                    candidate.strengths.map(

                        (strength, index) => (

                            <Reason

                                key={index}

                                text={strength}

                            />

                        )

                    )

                }

            </div>

            <div className="mt-10 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-cyan-500/20 p-6">

                <div className="flex items-center gap-3">

                    <Sparkles className="text-cyan-400" />

                    <h3 className="text-xl font-bold">

                        AI Recommendation

                    </h3>

                </div>

                <p className="mt-5 text-lg font-semibold">

                    {

                        candidate.recommendation === "Strong Match"

                            ?

                            "Proceed to Technical Interview"

                            :

                            candidate.recommendation === "Moderate Match"

                            ?

                            "Proceed to Screening Round"

                            :

                            "Keep for Future Opportunities"

                    }

                </p>

                <div className="mt-8">

                    <div className="flex justify-between mb-3">

                        <span className="text-slate-400">

                            Confidence Score

                        </span>

                        <span className="font-bold text-cyan-400 text-xl">

                            {confidence}%

                        </span>

                    </div>

                    <div className="h-3 rounded-full bg-slate-800 overflow-hidden">

                        <div

                            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"

                            style={{

                                width: `${confidence}%`

                            }}

                        />

                    </div>

                </div>

                <div className="mt-8 bg-slate-900/40 rounded-2xl p-5">

                    <div className="flex items-center gap-3 mb-4">

                        <ShieldCheck className="text-green-400" />

                        <span className="font-semibold">

                            AI Risk Assessment

                        </span>

                    </div>

                    <div className="flex justify-between text-slate-300">

                        <span>

                            Hiring Risk

                        </span>

                        <span className="text-green-400">

                            Low

                        </span>

                    </div>

                    <div className="flex justify-between mt-3 text-slate-300">

                        <span>

                            Expected Success

                        </span>

                        <span className="text-cyan-400">

                            High

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

function Reason({ text }) {

    return (

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex gap-4 hover:border-cyan-500 hover:-translate-y-1 duration-300">

            <div className="text-green-400 text-xl">

                ✓

            </div>

            <span className="text-slate-300 leading-7">

                {text}

            </span>

        </div>

    );

}

export default AIRecruiter;