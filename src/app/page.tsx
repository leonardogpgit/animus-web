import type { Metadata } from "next";
import Ecosystem from "@/components/Ecosystem";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
	title: "Animus Project",
};

export default function Home() {
	return (
		<>
			<Hero />
			<Ecosystem />
		</>
	);
}
