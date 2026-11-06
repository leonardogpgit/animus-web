"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const fade = (delay = 0) => ({
	initial: { opacity: 0, y: 16 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, delay },
});

export default function Ecosystem() {
	return (
		<section
			id="suite"
			className="scroll-mt-28 md:scroll-mt-20 py-20 sm:py-28 bg-[#e6ecf2] dark:bg-[#09090b] border-t border-slate-300 dark:border-white/10 relative overflow-hidden"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
				{/* Section Header */}
				<motion.div {...fade(0)} className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
					<h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-black dark:text-white mb-4">
						The Three Platforms
					</h2>
					<p className="text-sm sm:text-base text-black/75 dark:text-white/75 font-michroma leading-relaxed">
						One collective graph of human truth powering three sovereign platforms.
					</p>
				</motion.div>

				{/* 3 App Cards Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* 1: Animus */}
					<motion.div
						{...fade(0.1)}
						className="glass-panel p-8 sm:p-10 flex flex-col justify-between border border-slate-300/80 dark:border-white/10 bg-white/70 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm relative overflow-hidden group hover:border-black/30 dark:hover:border-white/30 transition-all font-michroma"
					>
						<div>
							<h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-2">
								Animus
							</h3>
							<p className="text-xs text-black/60 dark:text-white/60 mb-6">
								animus.animusproject.org
							</p>

							<p className="text-black/80 dark:text-white/80 text-xs sm:text-sm leading-relaxed mb-6">
								The daily ritual for honest public consensus. Answer 10 to 20 micro-dilemmas in 3 minutes to unlock real-time collective intelligence without social media outrage.
							</p>

							<ul className="space-y-3 text-xs text-black/70 dark:text-white/70 mb-8">
								<li>
									<span><strong>Commit-to-Unlock:</strong> Zero herd mentality.</span>
								</li>
								<li>
									<span><strong>Give to Ask:</strong> Earn credits by answering.</span>
								</li>
								<li>
									<span><strong>Radical Anonymity:</strong> Zero PII, pure graph data.</span>
								</li>
							</ul>
						</div>

						<div>
							<a
								href="https://animus.animusproject.org"
								target="_blank"
								rel="noopener noreferrer"
								className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-michroma text-sm font-bold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-sm"
							>
								<span>Animus</span>
								<FiArrowUpRight className="h-4 w-4" />
							</a>
						</div>
					</motion.div>

					{/* App 2: Animus Remnant */}
					<motion.div
						{...fade(0.2)}
						className="glass-panel p-8 sm:p-10 flex flex-col justify-between border border-slate-300/80 dark:border-white/10 bg-white/70 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm relative overflow-hidden group hover:border-black/30 dark:hover:border-white/30 transition-all font-michroma"
					>
						<div>
							<h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-2">
								Animus Remnant
							</h3>
							<p className="text-xs text-black/60 dark:text-white/60 mb-6">
								remnant.animusproject.org
							</p>

							<p className="text-black/80 dark:text-white/80 text-xs sm:text-sm leading-relaxed mb-6">
								Your proactive desktop companion (Jarvis) and living mask (*persona*). Synthesizes your moral convictions and real cloned voice into a private, sovereign memory vault.
							</p>

							<ul className="space-y-3 text-xs text-black/70 dark:text-white/70 mb-8">
								<li>
									<span><strong>Desktop Autonomy:</strong> Local automation on Linux &amp; Windows.</span>
								</li>
								<li>
									<span><strong>Cloned Neural Voice:</strong> Speaks and reasons with your real tone.</span>
								</li>
								<li>
									<span><strong>Animus Synergy:</strong> Dilemmas automatically calibrate your mask.</span>
								</li>
							</ul>
						</div>

						<div>
							<a
								href="https://remnant.animusproject.org"
								target="_blank"
								rel="noopener noreferrer"
								className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-michroma text-sm font-bold border border-slate-300 dark:border-white/20 bg-black/5 dark:bg-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors shadow-sm"
							>
								<span>Remnant</span>
								<FiArrowUpRight className="h-4 w-4" />
							</a>
						</div>
					</motion.div>

					{/* App 3: Animus Resonance */}
					<motion.div
						{...fade(0.3)}
						className="glass-panel p-8 sm:p-10 flex flex-col justify-between border-2 border-cyan-500/30 dark:border-cyan-400/30 bg-white/70 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm relative overflow-hidden group hover:border-cyan-500 dark:hover:border-cyan-400 transition-all font-michroma"
					>
						<div>
							<h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-2">
								Animus Resonance
							</h3>
							<p className="text-xs text-black/60 dark:text-white/60 mb-6">
								resonance.animusproject.org
							</p>

							<p className="text-black/80 dark:text-white/80 text-xs sm:text-sm leading-relaxed mb-6">
								Multidimensional human connection without superficiality. Finds people with &gt;90% cognitive alignment based on your ethical and philosophical choices.
							</p>

							{/* Crucial Prerequisite Highlight Banner */}
							<div className="mb-6 rounded-2xl bg-cyan-500/10 dark:bg-cyan-950/40 border border-cyan-500/30 p-4 text-xs text-black/90 dark:text-cyan-200 space-y-1.5 font-michroma">
								<div className="font-bold text-cyan-600 dark:text-cyan-300">
									Prerequisite: Powered by Animus
								</div>
								<p className="leading-relaxed">
									You must have an Animus account to use Resonance. <strong>The more dilemmas you answer in Animus, the sharper, deeper, and more accurate your resonance results become.</strong>
								</p>
							</div>

							<ul className="space-y-3 text-xs text-black/70 dark:text-white/70 mb-8">
								<li>
									<span><strong>Multidimensional:</strong> Friends, project partners, gaming &amp; dating.</span>
								</li>
								<li>
									<span><strong>Mind First:</strong> Blind matching, zero vanity photos or bios.</span>
								</li>
								<li>
									<span><strong>Double-Blind:</strong> Mutual, bilateral progressive reveal.</span>
								</li>
							</ul>
						</div>

						<div>
							<a
								href="https://resonance.animusproject.org"
								target="_blank"
								rel="noopener noreferrer"
								className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-michroma text-sm font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20"
							>
								<span>Resonance</span>
								<FiArrowUpRight className="h-4 w-4" />
							</a>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
