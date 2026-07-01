function Stats() {

    const stats = [

        {
            number: "100K+",
            title: "Candidate Profiles"
        },

        {
            number: "95%",
            title: "AI Accuracy"
        },

        {
            number: "Vector",
            title: "Semantic Search"
        },

        {
            number: "Explainable",
            title: "AI Decisions"
        }

    ];

    return (

        <section className="max-w-7xl mx-auto px-6 py-10">

            <div className="grid md:grid-cols-4 gap-6">

                {

                    stats.map((item) => (

                        <div

                            key={item.title}

                            className="glass rounded-2xl p-8 text-center hover:-translate-y-1 duration-300"

                        >

                            <h2 className="text-4xl font-black gradient-text">

                                {item.number}

                            </h2>

                            <p className="mt-3 text-slate-400">

                                {item.title}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default Stats;