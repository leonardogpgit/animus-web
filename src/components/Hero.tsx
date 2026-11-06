"use client";

import { motion } from "framer-motion";

export default function Hero() {
	return (
		<section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
			{/* Clean Background */}
			<div className="absolute inset-0 -z-10 bg-[#e6ecf2] dark:bg-[#09090b]" />

			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="container mx-auto my-auto px-4 sm:px-6 lg:px-8 text-center"
			>
				<h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-descscor font-extrabold tracking-tight text-black dark:text-white mb-6 sm:mb-8 max-w-5xl mx-auto leading-tight">
					Tell us what you think
				</h1>

				<div className="mb-8 sm:mb-10 max-w-2xl mx-auto">
					<p className="text-xs sm:text-sm text-black/75 dark:text-white/75 font-michroma leading-relaxed">
						The real-time pulse of human thought. Answer dilemmas to reveal honest consensus without crowd bias, earn credits to ask your own, and power three sovereign platforms for truth, memory, and deep human connection.
					</p>
				</div>

				{/* Primary Call to Action Buttons */}
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
					<a
						href="#suite"
						className="w-full sm:w-auto inline-flex items-center justify-center font-michroma text-sm sm:text-base px-8 py-4 rounded-xl bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-xl shadow-black/10 font-bold"
					>
						Explore the Suite
					</a>

					<a
						href="https://animus.animusproject.org"
						target="_blank"
						rel="noopener noreferrer"
						className="w-full sm:w-auto inline-flex items-center justify-center font-michroma text-sm sm:text-base px-8 py-4 rounded-xl border border-slate-300 dark:border-white/20 bg-white/60 dark:bg-white/10 text-black dark:text-white hover:bg-white/90 dark:hover:bg-white/20 transition-colors shadow-sm font-bold"
					>
						Open Animus
					</a>
				</div>
			</motion.div>
		</section>
	);
}
