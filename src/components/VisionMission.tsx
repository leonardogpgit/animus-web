"use client";

import { motion } from "framer-motion";
import { FiEye, FiTarget, FiShield, FiCpu } from "react-icons/fi";

const fade = (delay = 0) => ({
	initial: { opacity: 0, y: 16 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, delay },
});

export default function VisionMission() {
	return (
		<section
			id="vision"
			className="scroll-mt-28 md:scroll-mt-20 py-20 sm:py-28 bg-[#e6ecf2] dark:bg-[#09090b] border-t border-slate-300 dark:border-white/10 relative overflow-hidden"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
				{/* Section Header */}
				<motion.div {...fade(0)} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
					<div className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white/40 dark:bg-white/5 px-3 py-1.5 text-xs font-michroma text-black/70 dark:text-white/70 mb-4 backdrop-blur-md">
						<FiTarget className="h-3.5 w-3.5" />
						<span>PURPOSE &amp; HORIZON</span>
					</div>
					<h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-black dark:text-white mb-6">
						Vision &amp; Mission
					</h2>
					<p className="text-lg text-black/80 dark:text-white/80 font-sans leading-relaxed">
						Rebuilding the digital public square on mathematical truth, cognitive sovereignty, and genuine human connection.
					</p>
				</motion.div>

				{/* Two-Column Grid: Vision & Mission */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
					{/* Mission Card */}
					<motion.div
						{...fade(0.1)}
						className="glass-panel p-8 sm:p-10 flex flex-col justify-between border border-slate-300/80 dark:border-white/10 bg-white/60 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm"
					>
						<div>
							<div className="h-12 w-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6 shadow-md">
								<FiTarget className="h-6 w-6" />
							</div>
							<h3 className="text-2xl sm:text-3xl font-bold font-michroma text-black dark:text-white mb-4">
								Our Mission
							</h3>
							<p className="text-black/80 dark:text-white/80 font-sans text-base sm:text-lg leading-relaxed mb-6">
								To dismantle the commercial outrage machine and eliminate herd mentality by deploying a real-time, zero-bias collective intelligence infrastructure.
							</p>
							<p className="text-black/70 dark:text-white/70 font-sans text-sm sm:text-base leading-relaxed">
								Every human voice possesses inherent value. We provide a clean, anonymous space where people answer ethical, cultural, and everyday dilemmas without social pressure—turning honest perspectives into verifiable statistical knowledge.
							</p>
						</div>

						<div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 text-xs font-mono text-black/60 dark:text-white/60">
							<FiShield className="h-4 w-4 text-emerald-500" />
							<span>Zero surveillance • Zero ads • Zero manipulation</span>
						</div>
					</motion.div>

					{/* Vision Card */}
					<motion.div
						{...fade(0.2)}
						className="glass-panel p-8 sm:p-10 flex flex-col justify-between border border-slate-300/80 dark:border-white/10 bg-white/60 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm"
					>
						<div>
							<div className="h-12 w-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6 shadow-md">
								<FiEye className="h-6 w-6" />
							</div>
							<h3 className="text-2xl sm:text-3xl font-bold font-michroma text-black dark:text-white mb-4">
								Our Vision
							</h3>
							<p className="text-black/80 dark:text-white/80 font-sans text-base sm:text-lg leading-relaxed mb-6">
								A sovereign digital ecosystem where collective human truth, multidimensional interpersonal resonance, and personal memory synthesis coexist without exploitation.
							</p>
							<p className="text-black/70 dark:text-white/70 font-sans text-sm sm:text-base leading-relaxed">
								We envision a future where technology acts as an objective mirror for civilization, where people connect deeply based on genuine philosophical resonance rather than superficial swipes, and where each individual owns their digital likeness with mathematical certainty.
							</p>
						</div>

						<div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 text-xs font-mono text-black/60 dark:text-white/60">
							<FiCpu className="h-4 w-4 text-cyan-500" />
							<span>Neo4j Graph Engine • Sovereign AI • Cryptographic Sanctity</span>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
