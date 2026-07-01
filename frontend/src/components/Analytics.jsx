import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend

} from "recharts";

function Analytics({ candidates = [] }) {

    const scoreData = candidates.map((candidate) => ({

        name: candidate.candidate.split(" ")[0],

        score: candidate.final_score

    }));

    const strongCount = candidates.filter(

        c => c.recommendation === "Strong Match"

    ).length;

    const moderateCount = candidates.filter(

        c => c.recommendation === "Moderate Match"

    ).length;

    const weakCount = candidates.filter(

        c => c.recommendation === "Weak Match"

    ).length;

    const averageScore =

        candidates.length > 0

            ?

            (

                candidates.reduce(

                    (sum, c) =>

                        sum + c.final_score,

                    0

                ) / candidates.length

            ).toFixed(1)

            :

            0;

    const recommendationData = [

        {

            name: "Strong",

            value: strongCount

        },

        {

            name: "Moderate",

            value: moderateCount

        },

        {

            name: "Weak",

            value: weakCount

        }

    ].filter(item => item.value > 0);

    const COLORS = [

        "#22c55e",

        "#06b6d4",

        "#f97316"

    ];

    return (

        <div>

            {/* KPI Cards */}

            <div className="grid md:grid-cols-3 gap-5 mb-8">

                <div className="glass rounded-2xl p-6">

                    <p className="text-slate-400">

                        Average AI Score

                    </p>

                    <h2 className="text-4xl font-black mt-3 text-cyan-400">

                        {averageScore}

                    </h2>

                </div>

                <div className="glass rounded-2xl p-6">

                    <p className="text-slate-400">

                        Candidates Ranked

                    </p>

                    <h2 className="text-4xl font-black mt-3">

                        {candidates.length}

                    </h2>

                </div>

                <div className="glass rounded-2xl p-6">

                    <p className="text-slate-400">

                        Strong Matches

                    </p>

                    <h2 className="text-4xl font-black mt-3 text-green-400">

                        {strongCount}

                    </h2>

                </div>

            </div>

            {/* Charts */}

            <div className="grid lg:grid-cols-2 gap-8">

                <div className="glass rounded-3xl p-8">

                    <h2 className="text-3xl font-black">

                        AI Match Score Analysis

                    </h2>

                    <p className="text-slate-400 mt-2 mb-8">

                        Candidate Performance Comparison

                    </p>

                    <ResponsiveContainer

                        width="100%"

                        height={340}

                    >

                        <BarChart data={scoreData}>

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Bar

                                dataKey="score"

                                radius={[12,12,0,0]}

                                fill="#6366f1"

                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

                <div className="glass rounded-3xl p-8">

                    <h2 className="text-3xl font-black">

                        Hiring Recommendation Distribution

                    </h2>

                    <p className="text-slate-400 mt-2 mb-8">

                        AI Recommendation Summary

                    </p>

                    <ResponsiveContainer

                        width="100%"

                        height={340}

                    >

                        <PieChart>

                            <Pie

                                data={recommendationData}

                                dataKey="value"

                                innerRadius={60}

                                outerRadius={110}

                                label

                            >

                                {

                                    recommendationData.map(

                                        (entry,index)=>

                                        (

                                            <Cell

                                                key={index}

                                                fill={COLORS[index]}

                                            />

                                        )

                                    )

                                }

                            </Pie>

                            <Legend/>

                            <Tooltip/>

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    );

}

export default Analytics;