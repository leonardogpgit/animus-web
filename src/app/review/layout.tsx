import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Institutional Review — Animus Project",
	description:
		"Confidential institutional review environment for Animus Project platforms.",
	robots: {
		index: false,
		follow: false,
	},
};

export default function ReviewLayout({ children }: { children: ReactNode }) {
	return children;
}
