import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { ArrowLeft,Bot,Loader2 } from "lucide-react";

function CandidateDetails() {

    const navigate = useNavigate();

    const location = useLocation();
    const candidate = location.state?.candidate;
    const [loading, setLoading] = useState(false);
    
    const generateInterviewKit = async () => {

    setLoading(true);

    console.log("Generating Interview Kit...");

    try {

        const response = await axios.post(

            "http://127.0.0.1:8000/generate-interview-kit",

            {

                candidate_name: candidate.candidate,

                job_description: localStorage.getItem("jobDescription")

            }

        );

        console.log("API Response:", response.data);
        localStorage.setItem("interviewKit",JSON.stringify(response.data)); 
        navigate("/interview-kit");

    }

    catch (error) {

        console.error(error);
        console.error("API Error:", error);

        console.error("Response:", error.response);

        alert("Failed to generate Interview Kit.");

    }

    finally {

        console.log("Request Finished");
        setLoading(false);

    }

};



    if (!candidate) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <div className="glass rounded-3xl p-10 text-center">

                    <h1 className="text-4xl font-bold gradient-text">

                        Candidate Not Found

                    </h1>

                    <button

                        onClick={() => navigate("/report")}

                        className="mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-6 py-3 rounded-xl"

                    >

                        Back to Dashboard

                    </button>

                </div>

            </div>

        );

    }

    return (

        <div className="min-h-screen max-w-7xl mx-auto px-8 py-10">

            <button

                onClick={() => navigate(-1)}

                className="flex items-center gap-2 mb-8 text-cyan-400 hover:text-white transition"

            >

                <ArrowLeft size={20} />

                Back

            </button>

            <div className="glass rounded-3xl p-10">

                <p className="uppercase tracking-[5px] text-cyan-400 text-sm">

                    Candidate Intelligence Report

                </p>

                <h1 className="text-5xl font-black mt-4">

                    {candidate.candidate}

                </h1>

                <p className="text-slate-400 text-xl mt-3">

                    {candidate.headline}

                </p>

                <div className="mt-5 inline-block px-5 py-2 rounded-full bg-cyan-500/10 text-cyan-300 font-semibold">

                    {candidate.recommendation}

                </div>

                <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <InfoCard

                        title="Current Company"

                        value={candidate.current_company}

                    />

                    <InfoCard

                        title="Current Role"

                        value={candidate.current_title}

                    />

                    <InfoCard

                        title="Experience"

                        value={`${candidate.experience} Years`}

                    />

                    <InfoCard

                        title="Location"

                        value={`${candidate.location}, ${candidate.country}`}

                    />

                    <InfoCard

                        title="Industry"

                        value={candidate.industry}

                    />

                    <InfoCard

                        title="AI Match Score"

                        value={candidate.final_score}

                    />

                </div>

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-4">

                        Professional Summary

                    </h2>

                    <div className="glass rounded-2xl p-6 text-slate-300 leading-8">

                        {candidate.profile_summary}

                    </div>

                </div>

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-5">

                        AI Hiring Score

                    </h2>

                    <div className="glass rounded-2xl p-6">

                        <div className="flex justify-between mb-3">

                            <span>Final AI Match Score</span>

                            <span className="font-bold text-cyan-400">

                                {candidate.final_score}

                            </span>

                        </div>

                        <div className="w-full h-3 bg-slate-800 rounded-full">

                            <div

                                className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"

                                style={{

                                    width: `${candidate.final_score}%`

                                }}

                            />

                        </div>

                    </div>

                </div>

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-5">

                        AI Generated Strengths

                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        {

                            candidate.strengths?.map(

                                (

                                    item,

                                    index

                                ) => (

                                    <div

                                        key={index}

                                        className="glass rounded-xl p-4"

                                    >

                                        ✅ {item}

                                    </div>

                                )

                            )

                        }

                    </div>

                </div>

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-5">

                        Improvement Areas

                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        {

                            candidate.weaknesses?.length > 0

                                ?

                                candidate.weaknesses.map(

                                    (

                                        item,

                                        index

                                    ) => (

                                        <div

                                            key={index}

                                            className="glass rounded-xl p-4"

                                        >

                                            ⚠️ {item}

                                        </div>

                                    )

                                )

                                :

                                <div className="glass rounded-xl p-4">

                                    ✅ No significant improvement areas detected.

                                </div>

                        }

                    </div>

                </div>

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-5">

                        Technical Skills

                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {

                            candidate.skills?.map(

                                (

                                    skill,

                                    index

                                ) => (

                                    <div

                                        key={index}

                                        className="glass rounded-xl p-5"

                                    >

                                        <h3 className="text-xl font-bold text-cyan-400">

                                            {skill.name}

                                        </h3>

                                        <p className="text-slate-300 text-sm mt-3">

                                            Proficiency: {skill.proficiency}

                                        </p>

                                        <p className="text-slate-400 text-sm mt-2">

                                            Experience :

                                            {" "}

                                            {skill.duration_months} Months

                                        </p>

                                        <p className="text-slate-400 text-sm">

                                            Endorsements :

                                            {" "}

                                            {skill.endorsements}

                                        </p>

                                    </div>

                                )

                            )

                        }

                    </div>

                </div>

                                {/* AI Interview Kit */}

                <div className="mt-12">

                    <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">

                        <Bot className="text-cyan-400" />

                        AI Interview Kit

                    </h2>

                    <button

                        onClick={generateInterviewKit}

                        disabled={loading}

                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-6 py-3 rounded-xl font-semibold flex items-center gap-3 hover:scale-105 transition-all duration-300"

                    >

                        {

                            loading ?

                            <>

                                <Loader2 className="animate-spin" />

                                Generating Interview Kit...

                            </>

                            :

                            "🤖 Generate AI Interview Kit"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

function InfoCard({

    title,

    value

}) {

    return (

        <div className="glass rounded-2xl p-5 hover:border-cyan-500 transition-all duration-300 border border-slate-800">

            <p className="text-slate-400 text-sm uppercase tracking-[2px]">

                {title}

            </p>

            <h3 className="text-xl font-bold mt-3 break-words">

                {

                    value && value !== ""

                        ?

                        value

                        :

                        "Not Available"

                }

            </h3>

        </div>

    );

}

export default CandidateDetails;