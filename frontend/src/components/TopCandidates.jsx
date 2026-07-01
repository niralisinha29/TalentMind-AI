import {
    Trophy,
    Medal,
    Award,
    Star,
    ChevronRight
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function TopCandidates({

    candidates = []

}) {

    return (

        <div className="glass rounded-3xl p-8 shadow-2xl">

            <div className="flex justify-between items-center mb-10">

                <div>

                    <p className="uppercase tracking-[5px] text-cyan-400 text-sm">

                        AI LEADERBOARD

                    </p>

                    <h2 className="text-4xl font-black mt-2">

                        Top AI Recommended Candidates

                    </h2>

                    <p className="text-slate-400 mt-3">

                        Click any candidate to view complete AI intelligence report

                    </p>

                </div>

                <div className="hidden lg:flex w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 justify-center items-center">

                    <Trophy size={30} />

                </div>

            </div>

            {

                candidates.length === 0 ?

                    (

                        <div className="text-center py-12 text-slate-500">

                            No Candidate Rankings Available

                        </div>

                    )

                    :

                    (

                        <div className="space-y-5">

                            {

                                candidates.map(

                                    (

                                        candidate,

                                        index

                                    ) => (

                                        <CandidateRow

                                            key={index}

                                            rank={index + 1}

                                            candidate={candidate}

                                        />

                                    )

                                )

                            }

                        </div>

                    )

            }

        </div>

    );

}

function CandidateRow({

    rank,

    candidate

}) {

    const navigate = useNavigate();

    const medal = {

        1:

            <Trophy

                size={30}

                className="text-yellow-400"

            />,

        2:

            <Medal

                size={30}

                className="text-slate-300"

            />,

        3:

            <Award

                size={30}

                className="text-orange-400"

            />

    };

    return (

        <div

            onClick={() =>

                navigate(

                    `/candidate/${encodeURIComponent(candidate.candidate)}`,

                    {

                        state: {

                            candidate

                        }

                    }

                )

            }

            className="glass rounded-2xl p-6 cursor-pointer hover:-translate-y-1 hover:border-cyan-500 hover:shadow-2xl transition-all duration-300 border border-slate-800"

        >

            <div className="flex justify-between items-center">

                <div className="flex gap-5 items-center">

                    <div className="w-14 h-14 rounded-full bg-slate-900 flex justify-center items-center">

                        {

                            medal[rank]

                            ||

                            <span className="font-bold text-cyan-400">

                                #{rank}

                            </span>

                        }

                    </div>

                    <div>

                        <h3 className="text-2xl font-bold">

                            {candidate.candidate}

                        </h3>

                        <div className="flex gap-3 mt-3">

                            <span className="px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-sm">

                                {candidate.recommendation}

                            </span>

                        </div>

                    </div>

                </div>

                <div className="flex items-center gap-5">

                    <div className="text-center">

                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 flex justify-center items-center shadow-xl">

                            <div className="w-16 h-16 rounded-full bg-slate-950 flex flex-col justify-center items-center">

                                <Star

                                    size={14}

                                    className="text-yellow-400"

                                />

                                <span className="font-bold">

                                    {candidate.final_score}

                                </span>

                            </div>

                        </div>

                        <p className="text-xs text-slate-500 mt-3">

                            AI MATCH

                        </p>

                    </div>

                    <ChevronRight

                        size={28}

                        className="text-cyan-400"

                    />

                </div>

            </div>

        </div>

    );

}

export default TopCandidates;