import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Changelog",
	description: "See what's new in Animus Project.",
};

export default function ChangelogPage() {
	return (
		<div className="py-16 md:py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-heading font-bold text-black dark:text-white mb-4">
					Changelog
				</h1>
				<p className="text-xl text-black/80 dark:text-white/80 font-sans">
					New updates, features, and improvements.
				</p>
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
				<div className="relative border-l-2 border-slate-300 dark:border-white/10 ml-3 md:ml-0 md:pl-0">
					<div className="mb-16 relative md:ml-8 pl-8 md:pl-0">
						<div className="absolute w-6 h-6 bg-slate-400 dark:bg-white/30 border-4 border-[#e6ecf2] dark:border-[#09090b] rounded-full -left-[1.95rem] md:-left-11 top-1.5 shadow-sm" />
						<div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-4">
							<h2 className="text-2xl font-heading font-bold text-black dark:text-white">
								v1.0.0
							</h2>
							<div className="flex items-center gap-3">
								<span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/10 dark:bg-white/10 text-black dark:text-white font-michroma">
									major
								</span>
								<time className="text-sm text-black/60 dark:text-white/60 font-sans">
									October 2026
								</time>
							</div>
						</div>
						<h3 className="text-lg font-medium text-black dark:text-white mb-4 font-sans">
							Initial Public Release &amp; Unified Platform
						</h3>
						<div className="prose prose-slate dark:prose-invert max-w-none bg-[#f4f7fb] dark:bg-white/4 border border-slate-300 dark:border-white/8 p-6 rounded-2xl shadow-sm font-sans">
							<p>Welcome to Animus Project!</p>
							<ul>
								<li>
									Unified consensus network, graph database, and mobile
									ecosystem.
								</li>
								<li>
									Demographic distribution and reciprocity engine (&quot;Give to
									Ask&quot;).
								</li>
								<li>
									Unified architecture across web, mobile, and graph
									visualization.
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
