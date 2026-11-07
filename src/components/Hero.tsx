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
					Animus Project
				</h1>

				<div className="mb-8 sm:mb-10 max-w-2xl mx-auto">
					<p className="text-base sm:text-lg text-black/80 dark:text-white/80 font-sans leading-relaxed">
						A new way to see the world, a new way to meet people, and a new way to preserve who you are. Three sovereign platforms built on radical privacy and zero manipulation.
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
				</div>
			</motion.div>
		</section>
	);
}
