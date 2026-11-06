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
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-black dark:text-white mb-4">
						Every voice counts. <br />
						<span className="text-black/80 dark:text-white/80 font-heading">
							Every bias removed.
						</span>
					</h2>
					<p className="text-sm sm:text-base text-black/80 dark:text-white/80 font-michroma">
						100% free, anonymous, and powered by reciprocity.
					</p>
				</motion.div>

				{/* 3 Core Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
					{/* Feature 1: Answer to Unlock */}
					<motion.div
						{...fade(0.1)}
						className="glass-panel p-8 flex flex-col justify-start min-h-[220px] font-sans"
					>
						<h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-3">
							Answer to Unlock
						</h3>
						<p className="text-sm sm:text-base leading-relaxed text-black/80 dark:text-white/80">
							You must commit your own answer before seeing community
							results. No herd mentality, no bandwagon bias, and no peek ahead.
						</p>
					</motion.div>

					{/* Feature 2: Radical Privacy */}
					<motion.div
						{...fade(0.2)}
						className="glass-panel p-8 flex flex-col justify-start min-h-[220px] font-sans"
					>
						<h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-3">
							Anonymous by Design &amp; Zero Spyware
						</h3>
						<p className="text-sm sm:text-base leading-relaxed text-black/80 dark:text-white/80">
							No names, phone numbers, or tracking dossiers. Zero spyware or background telemetry—easily auditable by monitoring network traffic. Uncompromising encryption and permanent, unrecoverable deletion on demand.
						</p>
					</motion.div>

					{/* Feature 3: Give to Ask */}
					<motion.div
						{...fade(0.3)}
						className="glass-panel p-8 flex flex-col justify-start min-h-[220px] font-sans"
					>
						<h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-3">
							Give to Ask
						</h3>
						<p className="text-sm sm:text-base leading-relaxed text-black/80 dark:text-white/80">
							Answer questions to earn credits, then spend credits to post
							your own questions or boost their reach. A fair system that
							prevents spam and keeps participation open.
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
