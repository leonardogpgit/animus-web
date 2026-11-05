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
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-black dark:text-white mb-6">
						Every voice counts. <br />
						<span className="text-black/80 dark:text-white/80 font-heading">
							Every bias removed.
						</span>
					</h2>
					<p className="text-lg sm:text-xl text-black dark:text-white font-medium font-sans mb-4">
						100% free, anonymous, and powered by reciprocity.
					</p>
					<p className="text-base sm:text-lg text-black dark:text-white font-sans">
						No outrage algorithms, no herd mentality, and no noise. Just honest questions, real consensus, and fair reciprocity.
					</p>
				</motion.div>

				{/* 3 Core Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
					{/* Feature 1: Answer to Unlock */}
					<motion.div
						{...fade(0.1)}
						className="glass-panel p-8 flex flex-col min-h-[280px]"
					>
						<div className="w-12 h-12 bg-slate-200 dark:bg-white/10 text-black dark:text-white border border-slate-300 dark:border-white/10 rounded-2xl flex items-center justify-center mb-6">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
								<circle cx="12" cy="12" r="3" />
							</svg>
						</div>
						<h3 className="text-xl font-display font-bold text-black dark:text-white mb-3">
							Answer to Unlock
						</h3>
						<p className="text-black dark:text-white leading-relaxed text-sm sm:text-base font-sans">
							You must commit your own answer before seeing community
							results. No herd mentality, no bandwagon bias, and no peek ahead.
						</p>
					</motion.div>

					{/* Feature 2: Radical Privacy */}
					<motion.div
						{...fade(0.2)}
						className="glass-panel p-8 flex flex-col min-h-[280px]"
					>
						<div className="w-12 h-12 bg-slate-200 dark:bg-white/10 text-black dark:text-white border border-slate-300 dark:border-white/10 rounded-2xl flex items-center justify-center mb-6">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
								<path d="M7 11V7a5 5 0 0 1 10 0v4" />
							</svg>
						</div>
						<h3 className="text-xl font-display font-bold text-black dark:text-white mb-3">
							Anonymous by Design &amp; Zero Spyware
						</h3>
						<p className="text-black dark:text-white leading-relaxed text-sm sm:text-base font-sans">
							No names, phone numbers, or tracking dossiers. Zero spyware or background telemetry—easily auditable by monitoring network traffic. Uncompromising encryption and permanent, unrecoverable deletion on demand.
						</p>
					</motion.div>

					{/* Feature 3: Give to Ask */}
					<motion.div
						{...fade(0.3)}
						className="glass-panel p-8 flex flex-col min-h-[280px]"
					>
						<div className="w-12 h-12 bg-slate-200 dark:bg-white/10 text-black dark:text-white border border-slate-300 dark:border-white/10 rounded-2xl flex items-center justify-center mb-6">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
							</svg>
						</div>
						<h3 className="text-xl font-display font-bold text-black dark:text-white mb-3">
							Give to Ask
						</h3>
						<p className="text-black dark:text-white leading-relaxed text-sm sm:text-base font-sans">
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
