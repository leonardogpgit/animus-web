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
						An open, anonymous consensus network. 100% free, privacy-first, and
						powered by reciprocity.
					</p>
					<p className="text-base sm:text-lg text-black dark:text-white font-sans">
						A structured social network for the human mind, designed around
						reciprocity, anonymity, and graph relationships.
					</p>
				</motion.div>

				{/* Bento Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[minmax(260px,auto)_minmax(280px,auto)] gap-6 max-w-7xl mx-auto">
					{/* Feature 1: Large Span 2x2 (Neo4j Graph Database) */}
					<motion.div
						{...fade(0.1)}
						id="graph"
						className="scroll-mt-28 md:scroll-mt-20 md:col-span-2 lg:row-span-2 glass-panel p-6 sm:p-8 flex flex-col relative overflow-hidden group min-h-[380px] lg:min-h-0"
					>
						<div className="w-14 h-14 bg-slate-200 dark:bg-white/10 text-black dark:text-white border border-slate-300 dark:border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="28"
								height="28"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="18" cy="5" r="3" />
								<circle cx="6" cy="12" r="3" />
								<circle cx="18" cy="19" r="3" />
								<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
								<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
							</svg>
						</div>
						<h3 className="text-2xl sm:text-3xl font-display font-bold text-black dark:text-white mb-4 z-10">
							The Consensus Graph
						</h3>
						<p className="text-black dark:text-white text-base sm:text-lg leading-relaxed mb-8 flex-grow z-10 font-sans">
							Built on a Neo4j graph database. When people ask similar
							questions, Animus merges them into shared knowledge nodes,
							tracking demographic perspectives and trends over time.
						</p>

						{/* Decorative Graph / Cypher Block */}
						<div className="bg-black dark:bg-[#111116] rounded-xl p-4 font-mono text-xs sm:text-sm text-white shadow-xl border border-neutral-700 dark:border-white/10 z-10 transform transition-transform group-hover:-translate-y-1 duration-500 overflow-x-auto">
							<div className="flex gap-2 mb-3">
								<div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
								<div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
							</div>
							<code className="break-words">
								MATCH (q:Question)-[:CONSENSUS]-&gt;(d:Demographics) RETURN
								q.title, d.ageGroup, d.breakdown
							</code>
						</div>
					</motion.div>

					{/* Feature 2: Standard Span (Zero Bias) */}
					<motion.div
						{...fade(0.2)}
						className="glass-panel p-8 flex flex-col min-h-[300px] lg:min-h-0"
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
							You must submit your own answer before viewing community
							consensus. No herd behavior, no prior influence, and no visible
							percentages beforehand.
						</p>
					</motion.div>

					{/* Feature 3: Standard Span (Radical Privacy) */}
					<motion.div
						{...fade(0.3)}
						className="glass-panel p-8 flex flex-col min-h-[300px] lg:min-h-0"
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
							Anonymous by Design
						</h3>
						<p className="text-black dark:text-white leading-relaxed text-sm sm:text-base font-sans">
							No real names, phone numbers, email addresses, or follower graphs.
							Only aggregate age brackets, gender, and general regions to
							surface demographic patterns.
						</p>
					</motion.div>

					{/* Feature 4: Horizontal Span (Reciprocity Loop) */}
					<motion.div
						{...fade(0.4)}
						className="md:col-span-2 lg:col-start-3 lg:row-start-2 glass-panel p-8 flex flex-col sm:flex-row items-center gap-8 min-h-[280px] lg:min-h-0"
					>
						<div className="flex-grow">
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
							<h3 className="text-2xl font-display font-bold text-black dark:text-white mb-3">
								Give to Ask
							</h3>
							<p className="text-black dark:text-white leading-relaxed text-sm sm:text-base font-sans">
								Answer questions to earn participation credits, then spend
								credits to ask your own or expand their reach. A balanced loop
								that keeps engagement intentional and noise low.
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
