"use client";

import { motion } from "framer-motion";

const testimonials = [
	{
		quote:
			"I love the reciprocity rule. You have to contribute your perspective before you can ask, and you don't see results until you commit your answer. Pure signal, zero noise.",
		author: "Carlos M., 44",
		role: "Systems Architect",
	},
	{
		quote:
			"Finally, a platform that captures authentic human sentiment without the toxicity of comment threads. The demographic breakdown across age groups is uniquely valuable.",
		author: "Dr. Julian V.",
		role: "Sociologist & Researcher",
	},
	{
		quote:
			"It replaced my mindless scrolling habit. I answer 15 to 20 questions with my morning coffee. Quick, thought-provoking, and completely respectful of personal privacy.",
		author: "Patricia L., 39",
		role: "Educator",
	},
];

const fade = (delay = 0) => ({
	initial: { opacity: 0, y: 16 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, delay },
});

export default function Testimonials() {
	return (
		<section
			id="testimonials"
			className="pt-16 pb-8 md:pt-24 md:pb-12 bg-[#e6ecf2] dark:bg-[#09090b] border-t border-slate-300 dark:border-slate-800 relative overflow-hidden"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<motion.div
					{...fade(0)}
					className="text-center max-w-3xl mx-auto mb-20"
				>
					<h2 className="text-4xl md:text-5xl font-heading font-extrabold text-black dark:text-white mb-6">
						Real voices.{" "}
						<span className="text-black/80 dark:text-white/80 font-heading">
							Zero noise.
						</span>
					</h2>
					<p className="text-lg sm:text-xl text-black dark:text-white font-sans">
						Perspectives from people using <span translate="no" className="notranslate">Animus</span> for daily reflection and
						research.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
					{testimonials.map((t, index) => (
						<motion.div
							key={t.author}
							{...fade(index * 0.1)}
							className="glass-panel p-8 flex flex-col h-full relative group"
						>
							{/* Decorative quotation mark */}
							<div className="absolute top-6 right-6 text-6xl text-slate-300 dark:text-white/20 font-serif leading-none select-none">
								&quot;
							</div>

							<blockquote className="text-black dark:text-white text-base sm:text-lg mb-8 flex-grow relative z-10 font-medium leading-relaxed font-sans">
								&quot;{t.quote}&quot;
							</blockquote>

							<div className="flex items-center gap-4 relative z-10">
								<div className="w-11 h-11 rounded-full bg-slate-200 dark:bg-white/10 text-black dark:text-white border border-slate-300 dark:border-white/10 font-bold flex items-center justify-center font-display text-sm">
									{t.author.charAt(0)}
								</div>
								<div>
									<div className="font-bold text-black dark:text-white font-sans">
										{t.author}
									</div>
									<div className="text-xs text-black/80 dark:text-white/80 font-sans">
										{t.role}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
