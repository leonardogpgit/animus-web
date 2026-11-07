import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Blog",
	description: "Updates and perspectives from Animus Project.",
};

export default function BlogPage() {
	return (
		<div className="py-16 md:py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-heading font-bold text-black dark:text-white mb-4">
					Blog &amp; Updates
				</h1>
				<p className="text-base sm:text-lg text-black/80 dark:text-white/80 font-sans">
					Public dispatches will be published upon official launch.
				</p>
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
				<article className="glass-panel p-8 text-center">
					<h2 className="text-xl sm:text-2xl font-bold font-michroma text-black dark:text-white mb-3">
						<Link
							href="/manifesto"
							className="hover:opacity-80 transition-opacity"
						>
							The Animus Vision
						</Link>
					</h2>
					<p className="text-sm sm:text-base text-black/80 dark:text-white/80 font-sans leading-relaxed mb-4">
						A new way to see the world, a new way to meet people, and a new way to preserve who you are.
					</p>
					<Link
						href="/manifesto"
						className="text-xs sm:text-sm font-bold font-michroma text-black dark:text-white hover:opacity-80 transition-opacity"
					>
						Read More →
					</Link>
				</article>
			</div>
		</div>
	);
}
