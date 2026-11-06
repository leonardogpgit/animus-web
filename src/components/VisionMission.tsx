"use client";

import { motion } from "framer-motion";

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
				<motion.div {...fade(0)} className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
					<h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-black dark:text-white">
						Vision &amp; Mission
					</h2>
				</motion.div>

				{/* Two-Column Grid: Vision & Mission */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
					{/* Mission Card */}
					<motion.div
						{...fade(0.1)}
						className="glass-panel p-8 sm:p-10 flex flex-col justify-between border border-slate-300/80 dark:border-white/10 bg-white/60 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm font-michroma"
					>
						<div>
							<h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4">
								Our Mission
							</h3>
							<p className="text-black/80 dark:text-white/80 text-xs sm:text-sm leading-relaxed">
								To dismantle the commercial outrage machine and eliminate herd mentality by deploying a real-time, zero-bias collective intelligence infrastructure.
							</p>
						</div>
					</motion.div>

					{/* Vision Card */}
					<motion.div
						{...fade(0.2)}
						className="glass-panel p-8 sm:p-10 flex flex-col justify-between border border-slate-300/80 dark:border-white/10 bg-white/60 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm font-michroma"
					>
						<div>
							<h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4">
								Our Vision
							</h3>
							<p className="text-black/80 dark:text-white/80 text-xs sm:text-sm leading-relaxed">
								A sovereign digital ecosystem where collective human truth, multidimensional interpersonal resonance, and personal memory synthesis coexist without exploitation.
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
