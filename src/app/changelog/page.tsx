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
				<p className="text-base sm:text-lg text-black/80 dark:text-white/80 font-sans">
					Release notes will be published upon public launch.
				</p>
			</div>
		</div>
	);
}
