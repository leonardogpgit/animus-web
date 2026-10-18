"use client";

import { motion } from "framer-motion";

const fade = (delay = 0) => ({
	initial: { opacity: 0, y: 16 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, delay },
});

export default function Pricing() {
	return (
		<section
			id="pricing"
			className="scroll-mt-28 md:scroll-mt-20 py-20 sm:py-28 bg-[#e6ecf2] dark:bg-[#09090b] border-t border-slate-300 dark:border-white/10"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<motion.div
					{...fade(0)}
					className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-black dark:text-white mb-6">
						100% Free to use. <br />
						<span className="text-black/80 dark:text-white/80 font-heading">
							Powered by reciprocity.
						</span>
					</h2>
					<p className="text-lg sm:text-xl text-black dark:text-white font-sans">
						No subscription fees or paywalls. Your answers give you credits to
						ask and explore.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{/* Voice Tier */}
					<motion.div {...fade(0.1)} className="glass-panel p-8 flex flex-col">
						<h3 className="text-2xl font-display font-bold text-black dark:text-white mb-2">
							Everyday Voice
						</h3>
						<p className="text-black/80 dark:text-white/80 text-sm mb-6 font-sans">
							Free participation for all users.
						</p>
						<ul className="space-y-4 text-sm text-black dark:text-white flex-grow font-sans border-t border-slate-300 dark:border-white/10 pt-6">
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Full access to answer daily questions
							</li>
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Zero personal tracking or ads
							</li>
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Instant demographic consensus upon answering
							</li>
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Earn participation credits with every response
							</li>
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Native Android &amp; iOS support
							</li>
						</ul>
					</motion.div>

					{/* Ask & Boost Tier */}
					<motion.div {...fade(0.2)} className="glass-panel p-8 flex flex-col">
						<h3 className="text-2xl font-display font-bold text-black dark:text-white mb-2">
							Ask &amp; Boost
						</h3>
						<p className="text-black/80 dark:text-white/80 text-sm mb-6 font-sans">
							Ask questions and expand their reach.
						</p>
						<ul className="space-y-4 text-sm text-black dark:text-white flex-grow font-sans border-t border-slate-300 dark:border-white/10 pt-6">
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Post your own custom dilemmas
							</li>
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Duplicate questions merged into single nodes
							</li>
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Boost questions to reach wider demographics
							</li>
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Climb community reputation boards
							</li>
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Credits earned strictly through participation
							</li>
						</ul>
					</motion.div>

					{/* Custom Groups Tier */}
					<motion.div {...fade(0.3)} className="glass-panel p-8 flex flex-col">
						<h3 className="text-2xl font-display font-bold text-black dark:text-white mb-2">
							Custom Groups
						</h3>
						<p className="text-black/80 dark:text-white/80 text-sm mb-6 font-sans">
							For research teams, universities, and organizations.
						</p>
						<ul className="space-y-4 text-sm text-black dark:text-white flex-grow font-sans border-t border-slate-300 dark:border-white/10 pt-6">
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Create targeted question batches
							</li>
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Direct shareable link for participants
							</li>
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Instant aggregated group consensus
							</li>
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Zero questionnaire fatigue
							</li>
							<li className="flex gap-3">
								<svg
									className="h-5 w-5 text-black dark:text-white shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Participants discover the broader network
							</li>
						</ul>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
