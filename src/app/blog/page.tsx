import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Blog",
	description: "Insights, architecture, and perspectives from Animus Project.",
};

export default function BlogPage() {
	return (
		<div className="py-16 md:py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-heading font-bold text-black dark:text-white mb-4">
					Blog &amp; Updates
				</h1>
				<p className="text-xl text-black/80 dark:text-white/80 font-sans">
					Insights on consensus architecture, radical privacy, and collective
					intelligence.
				</p>
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
				<div className="grid gap-8">
					<article className="glass-panel p-8 flex flex-col md:flex-row gap-6 items-start justify-between">
						<div>
							<div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60 mb-2 font-michroma">
								<span>Architecture</span>
								<span>•</span>
								<span>October 2026</span>
							</div>
							<h2 className="text-2xl font-bold font-heading text-black dark:text-white mb-3">
								<Link
									href="/manifesto"
									className="hover:opacity-80 transition-opacity"
								>
									The Animus Manifesto: Philosophy &amp; Consensus Architecture
								</Link>
							</h2>
							<p className="text-base text-black/80 dark:text-white/80 font-sans leading-relaxed mb-4">
								Explore the fundamental pillars of Animus: zero-bias consensus,
								radical anonymity, and the reciprocal &quot;Give to Ask&quot;
								engine.
							</p>
							<Link
								href="/manifesto"
								className="text-sm font-bold font-michroma text-black dark:text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
							>
								Read Manifesto →
							</Link>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
}
