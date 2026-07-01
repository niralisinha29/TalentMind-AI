import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
    Brain,
    Search,
    Sparkles,
    BarChart3
} from "lucide-react";

function JobForm() {

    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();

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
            setJobDescription(response.data.job_description);
        }
        
        catch (error) {
            console.log(error);
            alert("Failed to upload Job Description.");
        }

        finally {

            setUploading(false);

        }

    };

    

    const analyzeCandidates = async () => {

        if (!jobDescription.trim()) {

            alert("Please paste a Job Description.");

            return;

        }

        try {

            setLoading(true);

            localStorage.setItem("jobDescription", jobDescription);

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

            navigate("/report");

        }

        catch (error) {

            console.log(error);
            console.log("RESPONSE:", error.response);
            console.log("MESSAGE:", error.message);


            alert(error.message || "An error occurred while analyzing candidates.");

        }

        finally {

            setLoading(false);

        }

    };

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

                        onChange={(e) =>

                            setJobDescription(e.target.value)

                        }

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

                <div className="space-y-5">

                    <Feature

                        icon={<Brain size={32} />}

                        title="AI Ranking"

                    />

                    <Feature

                        icon={<Search size={32} />}

                        title="Semantic Search"

                    />

                    <Feature

                        icon={<BarChart3 size={32} />}

                        title="Smart Analytics"

                    />

                    <Feature

                        icon={<Sparkles size={32} />}

                        title="Explainable AI"

                    />

                </div>

            </div>

        </section>

    );

}

function Feature({ icon, title }) {

    const descriptions = {

        "AI Ranking":

            "Multi-factor intelligent candidate scoring.",

        "Semantic Search":

            "Vector database powered candidate matching.",

        "Smart Analytics":

            "Visual hiring insights with AI intelligence.",

        "Explainable AI":

            "Transparent recommendations you can trust."

    };

    return (

        <div className="glass rounded-3xl p-7 flex items-start gap-5 hover:-translate-y-1 hover:shadow-2xl duration-300">

            <div className="bg-indigo-500/10 p-4 rounded-2xl text-cyan-400">

                {icon}

            </div>

            <div>

                <h3 className="text-2xl font-bold">

                    {title}

                </h3>

                <p className="text-slate-400 mt-3 leading-7">

                    {descriptions[title]}

                </p>

            </div>

        </div>

    );

}

export default JobForm;