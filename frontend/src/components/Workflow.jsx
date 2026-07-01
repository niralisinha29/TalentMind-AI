import {
    FileText,
    BrainCircuit,
    Search,
    Trophy,
    FileBarChart,
    Bot
} from "lucide-react";

const workflow = [

    {
        icon: FileText,
        title: "Upload JD",
        desc: "Upload or paste a Job Description.",
        color: "text-cyan-400"
    },

    {
        icon: BrainCircuit,
        title: "AI Analysis",
        desc: "Extract skills, experience and requirements.",
        color: "text-indigo-400"
    },

    {
        icon: Search,
        title: "Semantic Search",
        desc: "Find the best matching candidates using AI.",
        color: "text-purple-400"
    },

    {
        icon: Trophy,
        title: "AI Ranking",
        desc: "Rank candidates using multi-factor scoring.",
        color: "text-yellow-400"
    },

    {
        icon: FileBarChart,
        title: "Hiring Report",
        desc: "Generate explainable hiring intelligence.",
        color: "text-green-400"
    },

    {
        icon: Bot,
        title: "Interview Kit",
        desc: "Generate AI-powered interview questions.",
        color: "text-pink-400"
    }

];

function Workflow() {

    return (

        <section className="max-w-7xl mx-auto px-6 py-24">

            <div className="text-center mb-16">

                <p className="uppercase tracking-[4px] text-cyan-400 text-sm">

                    AI PROCESSING PIPELINE

                </p>

                <h2 className="text-5xl font-black gradient-text mt-3">

                    How TalentMind AI Works

                </h2>

                <p className="text-slate-400 mt-5 max-w-3xl mx-auto">

                    Every candidate passes through an intelligent AI pipeline
                    before recruiters receive recommendations and interview kits.

                </p>

            </div>

            <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-6">

                {workflow.map((step, index) => {

                    const Icon = step.icon;

                    return (

                        <>

                            <div

                                key={index}

                                className="group glass rounded-3xl p-7 w-72 min-h-[250px] hover:-translate-y-3 duration-300 relative overflow-hidden"

                            >

                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 duration-300"></div>

                                <div className="relative">

                                    <div className="w-16 h-16 rounded-2xl bg-slate-900 flex justify-center items-center mb-6">

                                        <Icon

                                            size={34}

                                            className={`${step.color} group-hover:scale-110 duration-300`}

                                        />

                                    </div>

                                    <span className="text-xs text-cyan-400">

                                        STEP {index + 1}

                                    </span>

                                    <h3 className="text-2xl font-bold mt-2">

                                        {step.title}

                                    </h3>

                                    <p className="text-slate-400 mt-4 leading-7">

                                        {step.desc}

                                    </p>

                                </div>

                            </div>

                            {

                                index !== workflow.length - 1 &&

                                <div className="hidden lg:flex text-cyan-400 text-4xl animate-pulse">

                                    ➜

                                </div>

                            }

                        </>

                    );

                })}

            </div>

        </section>

    );

}

export default Workflow;