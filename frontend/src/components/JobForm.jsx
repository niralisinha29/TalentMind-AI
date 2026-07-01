import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import API from "../services/api";

function JobForm() {

    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [engineStep, setEngineStep] = useState(0);
    const navigate = useNavigate();

    // ==========================
    // Upload Job Description
    // ==========================

    const uploadJobDescription = async (event) => {

        const file = event.target.files[0];

        if (!file) return;

        try {

            setUploading(true);

            const formData = new FormData();

            formData.append("file", file);

            const response = await API.post(

                "/upload-jd",

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            setJobDescription(

                response.data.job_description

            );
            setEngineStep(1);

        }

        catch (error) {

            console.log(error);

            alert("Failed to upload Job Description.");

        }

        finally {

            setUploading(false);

        }

    };


    // ==========================
    // Analyze Candidates
    // ==========================

    const analyzeCandidates = async () => {

        if (!jobDescription.trim()) {

            alert("Please paste or upload a Job Description.");

            return;

        }

        try {

            setLoading(true);
            setEngineStep(2);
            setTimeout(() => {
                setEngineStep(3);
            }, 700);
            setTimeout(() => {
                setEngineStep(4);
            }, 1400);
            setTimeout(() => {
                setEngineStep(5);
            }, 2100);

            localStorage.setItem(

                "jobDescription",

                jobDescription

            );
            

            const response = await API.post(

                "/rank-job",

                {

                    job_description: jobDescription

                }

            );

            localStorage.setItem(

                "rankingResults",

                JSON.stringify(response.data.results)

            );
            setEngineStep(6);

            setTimeout(() => {
                navigate("/report");
            }, 700);

        }

        catch (error) {

            console.log(error);

            console.log(error.response);

            alert(

                error.message ||

                "Something went wrong."

            );

        }

        finally {

            setLoading(false);

        }

    };
    const aiSteps = [
        {
            title: "Waiting for Job Description",
            status: "Upload or paste a Job Description to begin."
        },

        {
            title: "Job Description Loaded",
            status: "Ready to analyze the uploaded requirements."
        },

        {
            title: "Reading Job Description",
            status: "Understanding roles, skills and responsibilities..."
        },

        {
            title: "Extracting Skills",
            status: "Identifying technical and business requirements..."
        },

        {
            title: "Semantic Search",
            status: "Finding the best matching candidates..."
        },

        {
            title: "Generating AI Report",
            status: "Preparing candidate rankings and insights..."
        },

        {
            title: "Analysis Complete",
            status: "Opening AI Hiring Intelligence Report..."
        }
    ];

    return (

        <section className="max-w-7xl mx-auto px-6 pb-24">

            <div className="grid lg:grid-cols-2 gap-10">

                <div className="glass rounded-3xl p-8">

                    <h2 className="text-3xl font-bold mb-6">

                        Paste Job Description

                    </h2>

                    <textarea

                        className="w-full h-80 bg-slate-900/50 rounded-2xl border border-slate-700 p-5 resize-none outline-none"

                        placeholder="Paste your Job Description here..."

                        value={jobDescription}

                        onChange={(e) => {

                            setJobDescription(e.target.value);
                            if (e.target.value.trim()) {
                                setEngineStep(1);
                            } else {
                                setEngineStep(0);
                            }

                        }}

                    />

                    <div className="mt-6">
                        <label className="block mb-3 text-slate-300 font-medium">
                            Or Upload Job Description
                        </label>
                        <input 
                            type="file"

                            accept=".pdf,.docx,.txt"

                            onChange={uploadJobDescription}

                            className="hidden"

                            id="jd-upload"
                            
                        />
                        <label
                            htmlFor="jd-upload"
                            className="cursor-pointer flex justify-center items-center rounded-2xl border-2 border-dashed border-cyan-500 p-6 hover:bg-cyan-500/10 transition-all duration-300"
                        >
                            {
                                uploading ? "Uploading...": "📄 Upload PDF / DOCX / TXT"}

                        </label>

                    </div>

                    <button

                        onClick={analyzeCandidates}

                        disabled={loading}

                        className="mt-8 w-full rounded-2xl py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-xl font-bold shadow-2xl hover:scale-[1.02] duration-300"

                    >

                        {

                            loading

                                ?

                                "Analyzing..."

                                :

                                "🚀 Find Top AI Candidates"

                        }

                        <p className="text-sm font-normal mt-2">

                            Average Response Time: 2 seconds

                        </p>

                    </button>

                </div>

                <div className="glass rounded-3xl p-8 relative overflow-hidden">
                       {/* Glow */}
                       <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse"></div>
                       {/* Header */}
                       <div className="relative flex justify-between items-center">
                        <div>
                            <p className="text-cyan-400 uppercase tracking-[4px] text-xs">
                                AI COMMAND CENTER
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                TalentMind AI

                            </h2>

                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>

                            <span className="text-green-400 font-semibold">
                                Online
                            </span>
                        </div>
                    </div>

                    {/* AI Brain */}

                    <div className="flex justify-center mb-10">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl animate-pulse"></div>
                            <div className="relative w-28 h-28 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 flex justify-center items-center text-5xl shadow-2xl hover:scale-110 duration-500">
                                <BrainCircuit className="text-white animate-pulse" size={60} />
                            </div>
                        </div>
                        <h3 className="mt-6 text-xl font-bold">
                            {aiSteps[engineStep].title}

                        </h3>

                         <p className="text-slate-400 text-center mt-2">
                            {aiSteps[engineStep].status}

                        </p>
                    </div>

                    {/* Progress */}

                    <div className="mt-10">
                        <div className="flex justify-between mb-3">
                            <span className="text-slate-400">
                                AI Engine Status
                            </span>
                            <span className="text-cyan-400 font-bold">
                                {Math.round((engineStep / 6) * 100)}%
                            </span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-slate-700 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 transition-all duration-700" 
                            style={{ width: `${(engineStep / 6) * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-10 space-y-4">
                        <div className="flex items-center gap-3 bg-slate-900/50 rounded-xl p-4 border border-white/5">
                            <span className="text-green-400 text-xl">✓</span>
                            <span className="text-slate-300">
                                Resume & Job Description Parsing
                            </span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-900/50 rounded-xl p-4 border border-white/5">
                            <span className="text-green-400 text-xl">✓</span>
                            <span className="text-slate-300">
                                Semantic Candidate Matching

                            </span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-900/50 rounded-xl p-4 border border-white/5">
                            <span className="text-green-400 text-xl">✓</span>
                            <span className="text-slate-300">
                                Interview Kit Generation
                            </span>
                        </div>
                    </div>

                    {/* Bottom Card */}
                    <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 p-5">
                        <div className="flex justify-between">
                            <p className="text-cyan-300 text-sm uppercase tracking-[3px]">
                                Average Response
                            </p>
                            <h3 className="text-3xl font-black mt-2">
                                &lt; 2 sec
                            </h3>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400">
                                AI Powered
                            </p>
                            <p className="text-cyan-300 font-semibold mt-2">
                                Semantic Intelligence
                            </p>
                        </div>
                    </div>

                    
                </div>

            
            </div>

        </section>

    );

}

function StatusRow({ label, value }) {

    return (

        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 p-4 transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-cyan-500/10">

            <div className="flex items-center gap-3">

                <span className="relative flex h-3 w-3">

                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>

                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>

                </span>

                <span className="text-slate-300">

                    {label}

                </span>

            </div>

            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">

                {value}

            </span>

        </div>

    );

}

export default JobForm;