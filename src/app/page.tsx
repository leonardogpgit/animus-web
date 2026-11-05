import type { Metadata } from "next";
import Ecosystem from "@/components/Ecosystem";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import VisionMission from "@/components/VisionMission";

export const metadata: Metadata = {
	title: "Animus Project",
};

export default function Home() {
	return (
		<>
			<Hero />
			<Ecosystem />
			<VisionMission />
			<Features />
		</>
	);
}
