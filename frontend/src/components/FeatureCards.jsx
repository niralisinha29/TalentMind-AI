import {
  Search,
  Sparkles,
  BarChart3,
  Bot,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    title: "Semantic Search",
    icon: Search,
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-blue-500/20",
    short: "Meaning-based candidate matching",
    description:
      "Uses vector embeddings to understand the meaning behind skills, experience and job requirements instead of relying only on keywords.",
    points: [
      "Vector Embeddings",
      "Context-aware Matching",
      "Beyond Keyword Search",
    ],
  },
  {
    title: "Explainable AI",
    icon: Sparkles,
    color: "text-purple-400",
    bg: "from-purple-500/20 to-pink-500/20",
    short: "Transparent AI recommendations",
    description:
      "Every recommendation is supported by AI-generated reasoning, strengths, improvement areas and confidence scores.",
    points: [
      "AI Reasoning",
      "Strength Analysis",
      "Confidence Score",
    ],
  },
  {
    title: "Candidate Intelligence",
    icon: BarChart3,
    color: "text-blue-400",
    bg: "from-blue-500/20 to-indigo-500/20",
    short: "Comprehensive candidate analysis",
    description:
      "Generates intelligent candidate profiles including skills, experience, hiring readiness and semantic similarity.",
    points: [
      "Technical Skills",
      "Hiring Readiness",
      "AI Match Score",
    ],
  },
  {
    title: "AI Interview Kit",
    icon: Bot,
    color: "text-pink-400",
    bg: "from-pink-500/20 to-fuchsia-500/20",
    short: "Role-specific interview questions",
    description:
      "Automatically generates technical and behavioural interview questions with expected answers for every shortlisted candidate.",
    points: [
      "Technical Questions",
      "Behavioural Questions",
      "Expected Answers",
    ],
  },
];

function FeatureCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold gradient-text">
          AI Capabilities
        </h2>

        <p className="text-slate-400 mt-3">
          Hover over each capability to explore how the platform works.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)]"
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bg} opacity-0 group-hover:opacity-100 transition duration-500`}
              />

              <div className="relative z-10">

                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <Icon className={feature.color} size={34} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-slate-400">
                  {feature.short}
                </p>

                <div className="max-h-0 overflow-hidden group-hover:max-h-80 transition-all duration-700">

                  <p className="text-slate-300 mt-6 leading-7">
                    {feature.description}
                  </p>

                  <div className="mt-6 space-y-3">

                    {feature.points.map((point, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-slate-200"
                      >
                        <CheckCircle
                          size={18}
                          className="text-cyan-400"
                        />

                        <span>{point}</span>
                      </div>
                    ))}

                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default FeatureCards;