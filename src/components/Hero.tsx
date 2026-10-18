"use client";

import { motion } from "framer-motion";

export default function Hero() {
	return (
		<section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-between pt-16 pb-10 sm:pt-28 sm:pb-14 lg:pt-36 lg:pb-16 overflow-hidden">
			{/* Clean Background */}
			<div className="absolute inset-0 -z-10 bg-[#e6ecf2] dark:bg-[#09090b]" />

			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="container mx-auto my-auto px-4 sm:px-6 lg:px-8 text-center"
			>
				<h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-descscor font-extrabold tracking-tight text-black dark:text-white mb-6 sm:mb-8 max-w-5xl mx-auto leading-tight">
					What do you think?
				</h1>

				<div className="mb-8 sm:mb-12 max-w-2xl mx-auto space-y-3">
					<p className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-black/90 dark:text-white/90">
						The mind of humanity in real time.
					</p>
					<p className="text-base sm:text-lg text-black/80 dark:text-white/80 font-sans leading-relaxed">
						An open, anonymous network for human consensus. Answer questions to
						see demographic breakdowns, earn credits to ask your own, and explore
						unfiltered perspectives.
					</p>
				</div>

				<div className="flex items-center justify-center">
					<a
						href="https://app.animusproject.org"
						className="w-full sm:w-auto inline-flex items-center justify-center font-michroma text-base sm:text-lg px-8 py-4 rounded-xl bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-xl shadow-black/10 font-bold"
					>
						Get the Mobile App
					</a>
				</div>
			</motion.div>

			<a
				href="#features"
				aria-label="Scroll down"
				className="relative z-10 mt-10 inline-flex h-10 w-10 items-center justify-center rounded-xl text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white animate-bounce"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polyline points="6 9 12 15 18 9" />
				</svg>
			</a>
		</section>
	);
}
