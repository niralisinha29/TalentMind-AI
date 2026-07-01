function Hero() {
    return (
        <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 text-center overflow-hidden">

            <div className="absolute left-1/2 top-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[170px] rounded-full -translate-x-1/2"></div>

            <div className="relative">

                <span className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm tracking-[3px]">
                    AI POWERED HIRING PLATFORM
                </span>

                <h1 className="mt-10 text-7xl lg:text-8xl font-black leading-tight">
                    AI Hiring
                    <br />
                    <span className="gradient-text">
                        Intelligence
                    </span>
                </h1>

                <p className="mt-8 max-w-4xl mx-auto text-xl lg:text-2xl text-slate-300 leading-10">
                    Discover, evaluate and rank the most suitable candidates using
                    intelligent AI analysis, semantic understanding and explainable
                    recommendations—all in one hiring platform.
                </p>

            </div>

        </section>
    );
}

export default Hero;