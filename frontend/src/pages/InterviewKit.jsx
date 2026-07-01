import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bot } from "lucide-react";

function InterviewKit() {

    const navigate = useNavigate();

    const interviewKit = JSON.parse(
        localStorage.getItem("interviewKit")
    );

    if (!interviewKit) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <div className="glass rounded-3xl p-10 text-center">

                    <h1 className="text-4xl font-bold">

                        Interview Kit Not Found

                    </h1>

                    <button

                        onClick={() => navigate(-1)}

                        className="mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-6 py-3 rounded-xl"

                    >

                        Go Back

                    </button>

                </div>

            </div>

        );

    }

    const renderSection = (title, questions) => {

        if (!questions || questions.length === 0) return null;

        return (

            <div className="mt-10">

                <h2 className="text-3xl font-bold text-cyan-400 mb-6">

                    {title}

                </h2>

                {

                    questions.map((q, index) => (

                        <div

                            key={index}

                            className="glass rounded-2xl p-6 mb-5"

                        >

                            <h3 className="text-xl font-semibold">

                                Q{index + 1}. {q.question}

                            </h3>

                            {

                                q.difficulty &&

                                <p className="text-yellow-400 mt-3">

                                    Difficulty : {q.difficulty}

                                </p>

                            }

                            {

                                q.skills &&

                                <p className="text-slate-300 mt-2">

                                    <strong>Skills :</strong>{" "}

                                    {q.skills.join(", ")}

                                </p>

                            }

                            {

                                q.expected_answer &&

                                <div className="mt-4">

                                    <h4 className="font-semibold text-cyan-300">

                                        Expected Answer

                                    </h4>

                                    <ul className="list-disc ml-6 mt-2 text-slate-300">

                                        {

                                            q.expected_answer.map(

                                                (item, i) => (

                                                    <li key={i}>

                                                        {item}

                                                    </li>

                                                )

                                            )

                                        }

                                    </ul>

                                </div>

                            }

                        </div>

                    ))

                }

            </div>

        );

    };

    return (

        <div className="min-h-screen max-w-7xl mx-auto px-8 py-10">

            <button

                onClick={() => navigate(-1)}

                className="flex items-center gap-2 mb-8 text-cyan-400 hover:text-white"

            >

                <ArrowLeft size={20} />

                Back

            </button>

            <div className="glass rounded-3xl p-10">

                <h1 className="text-5xl font-black flex items-center gap-4">

                    <Bot className="text-cyan-400" />

                    AI Interview Kit

                </h1>

                <p className="mt-6 text-xl">

                    <strong>Candidate :</strong>{" "}

                    <span className="text-cyan-400">

                        {interviewKit.candidate}

                    </span>

                </p>

                <p className="mt-3">

                    <strong>Source :</strong>{" "}

                    <span className="text-cyan-400">

                        {interviewKit.source}

                    </span>

                </p>

                <p className="mt-3">

                    <strong>Status :</strong>{" "}

                    <span className="text-green-400">

                        {interviewKit.status}

                    </span>

                </p>

                {

                    interviewKit.interview_questions.estimated_time &&

                    <p className="mt-3">

                        <strong>Estimated Time :</strong>{" "}

                        {interviewKit.interview_questions.estimated_time}

                    </p>

                }

                {renderSection(
                    "Technical Questions",
                    interviewKit.interview_questions.technical
                )}

                {renderSection(
                    "Resume Based Questions",
                    interviewKit.interview_questions.resume_based
                )}

                {renderSection(
                    "Scenario Based Questions",
                    interviewKit.interview_questions.scenario
                )}

                {renderSection(
                    "Behavioral Questions",
                    interviewKit.interview_questions.behavioral
                )}

                {renderSection(
                    "Advanced Questions",
                    interviewKit.interview_questions.advanced
                )}

            </div>

        </div>

    );

}

export default InterviewKit;