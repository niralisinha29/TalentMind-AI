import { UserCircle2, Sparkles, Star } from "lucide-react";

function ScoreBar({ title, value, color }) {

    return (

        <div className="mb-7">

            <div className="flex justify-between items-center mb-3">

                <span className="text-slate-300 font-medium text-lg">

                    {title}

                </span>

                <span className="font-bold text-xl text-white">

                    {value}%

                </span>

            </div>

            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

                <div

                    className={`h-3 rounded-full transition-all duration-1000 ${color}`}

                    style={{

                        width: `${value}%`

                    }}

                />

            </div>

        </div>

    );

}

function CandidateCard({ candidate }) {

    if (!candidate) return null;

    const recommendationColor =

        candidate.recommendation === "Strong Match"

            ? "bg-green-500/20 text-green-400"

            : candidate.recommendation === "Moderate Match"

            ? "bg-cyan-500/20 text-cyan-400"

            : "bg-orange-500/20 text-orange-400";

    return (

        <div className="glass rounded-3xl p-10 shadow-2xl">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-12">

                <div className="flex items-center gap-6">

                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 flex justify-center items-center">

                        <UserCircle2 size={70} />

                    </div>

                    <div>

                        <p className="uppercase tracking-[5px] text-cyan-400 text-sm">

                            👑 TOP AI RECOMMENDATION

                        </p>

                        <h2 className="text-5xl font-black mt-2">

                            {candidate.candidate}

                        </h2>

                        <p className="text-slate-400 mt-2">

                            AI Generated Hiring Intelligence

                        </p>

                        <span

                            className={`inline-block mt-5 px-5 py-2 rounded-full font-semibold ${recommendationColor}`}

                        >

                            {candidate.recommendation}

                        </span>

                    </div>

                </div>

                <div className="text-center">

                    <div className="w-40 h-40 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 flex justify-center items-center shadow-[0_0_40px_rgba(99,102,241,0.4)]">

                        <div className="w-36 h-36 rounded-full bg-slate-950 flex flex-col justify-center items-center">

                            <Star className="text-yellow-400 mb-2" size={22} />

                            <span className="text-5xl font-black">

                                {candidate.final_score}

                            </span>

                            <span className="text-xs tracking-[3px] text-slate-400 mt-2">

                                AI MATCH SCORE

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            <ScoreBar

                title="Capability Match"

                value={candidate.capability_match}

                color="bg-blue-500"

            />

            <ScoreBar

                title="AI Potential"

                value={candidate.ai_potential}

                color="bg-purple-500"

            />

            <ScoreBar

                title="Hiring Readiness"

                value={candidate.hiring_readiness}

                color="bg-green-500"

            />

            <ScoreBar

                title="Semantic Similarity"

                value={Math.round(candidate.semantic_similarity * 100)}

                color="bg-cyan-500"

            />

            <div className="mt-12">

                <div className="flex items-center gap-3 mb-6">

                    <Sparkles className="text-cyan-400" />

                    <h3 className="text-3xl font-bold">

                        AI Generated Strengths

                    </h3>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                    {

                        candidate.strengths?.map(

                            (item, index) => (

                                <div

                                    key={index}

                                    className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500 hover:-translate-y-1 duration-300"

                                >

                                    <span className="text-green-400 text-xl">

                                        ✓

                                    </span>

                                    <span className="ml-3 text-slate-200">

                                        {item}

                                    </span>

                                </div>

                            )

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default CandidateCard;