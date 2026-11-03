import Ecosystem from "@/components/Ecosystem";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import VisionMission from "@/components/VisionMission";

export default function Home() {
	return (
		<>
			<Hero />
			<Ecosystem />
			<VisionMission />
			<Features />
			<Pricing />
		</>
	);
}
