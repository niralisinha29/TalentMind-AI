import CandidateCard from "../components/CandidateCard";
import TopCandidates from "../components/TopCandidates";
import AIRecruiter from "../components/AIRecruiter";
import Analytics from "../components/Analytics";
import { exportPDF } from "../utils/exportPDF";

import {
    Download,
    Sparkles,
    CalendarDays
} from "lucide-react";



function Dashboard() {

    const candidates =
        JSON.parse(localStorage.getItem("rankingResults")) || [];

    const topCandidate = candidates[0];

    if (!topCandidate) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <div className="glass rounded-3xl p-10 text-center">

                    <h1 className="text-5xl font-black gradient-text">

                        AI Hiring Intelligence

                    </h1>

                    <p className="text-slate-400 mt-6">

                        No Hiring Report Available

                    </p>

                    <p className="text-slate-500 mt-3">

                        Paste a Job Description to generate an AI hiring report.

                    </p>

                </div>

            </div>

        );

    }


    return (

        <div className="min-h-screen max-w-7xl mx-auto px-8 py-10">

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">

                <div>

                    <p className="uppercase tracking-[6px] text-cyan-400 text-sm mb-3">

                        AI GENERATED REPORT

                    </p>

                    <h1 className="text-6xl font-black gradient-text leading-tight">

                        AI Hiring Intelligence Report

                    </h1>

                    <p className="text-slate-400 mt-5 text-lg">

                        Powered by Semantic Search • Explainable AI • Candidate Intelligence

                    </p>

                </div>

                <button

                    onClick={() => exportPDF(topCandidate)}

                    className="mt-8 lg:mt-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-7 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:scale-105 duration-300 shadow-xl"

                >

                    <Download size={20} />

                    Export Report

                </button>

            </div>

            <div className="grid lg:grid-cols-3 gap-5 mb-10">

                <div className="glass rounded-2xl p-6">

                    <div className="flex gap-3 items-center">

                        <Sparkles className="text-cyan-400" />

                        <span className="text-slate-300">

                            Top Recommendation

                        </span>

                    </div>

                    <h2 className="text-3xl font-bold mt-4">

                        {topCandidate.candidate}

                    </h2>

                </div>

                <div className="glass rounded-2xl p-6">

                    <div className="flex gap-3 items-center">

                        <CalendarDays className="text-cyan-400" />

                        <span className="text-slate-300">

                            Report Generated

                        </span>

                    </div>

                    <h2 className="text-2xl font-bold mt-4">

                        {new Date().toLocaleDateString()}

                    </h2>

                </div>

                <div className="glass rounded-2xl p-6">

                    <span className="text-slate-300">

                        AI Recommendation

                    </span>

                    <h2 className="text-3xl font-bold mt-4 text-cyan-400">

                        {topCandidate.recommendation}

                    </h2>

                </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2">

                    <CandidateCard candidate={topCandidate} />

                </div>

                <div>

                    <AIRecruiter candidate={topCandidate} />

                </div>

            </div>

            <div className="mt-12">

                <TopCandidates candidates={candidates} />

            </div>

            <div className="mt-12">

                <Analytics candidates={candidates} />

            </div>

        </div>

    );

}

export default Dashboard;