"use client";

import { motion } from "framer-motion";

const fade = (delay = 0) => ({
	initial: { opacity: 0, y: 16 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, delay },
});

export default function Features() {
	return (
		<section
			id="features"
			className="scroll-mt-28 md:scroll-mt-20 py-20 sm:py-28 bg-[#e6ecf2] dark:bg-[#09090b] border-y border-slate-300 dark:border-slate-800 relative overflow-hidden"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<motion.div
					{...fade(0)}
					className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-black dark:text-white">
						Core Principles
					</h2>
				</motion.div>

				{/* 3 Core Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
					<motion.div
						{...fade(0.1)}
						className="glass-panel p-8 flex flex-col justify-start min-h-[200px]"
					>
						<h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-3 text-center font-michroma">
							Zero Manipulation
						</h3>
						<p className="text-sm sm:text-base leading-relaxed text-black/80 dark:text-white/80 font-sans">
							Built without outrage algorithms, vanity metrics, or commercial bias.
						</p>
					</motion.div>

					<motion.div
						{...fade(0.2)}
						className="glass-panel p-8 flex flex-col justify-start min-h-[200px]"
					>
						<h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-3 text-center font-michroma">
							Radical Privacy
						</h3>
						<p className="text-sm sm:text-base leading-relaxed text-black/80 dark:text-white/80 font-sans">
							Zero spyware, zero tracking SDKs, and zero covert telemetry—auditable at the network level.
						</p>
					</motion.div>

					<motion.div
						{...fade(0.3)}
						className="glass-panel p-8 flex flex-col justify-start min-h-[200px]"
					>
						<h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-3 text-center font-michroma">
							Sovereign Identity
						</h3>
						<p className="text-sm sm:text-base leading-relaxed text-black/80 dark:text-white/80 font-sans">
							You own your data, your voice, and your connections, with permanent cryptographic deletion on demand.
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
