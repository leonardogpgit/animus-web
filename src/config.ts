import type { SocialLink } from "@/types";

export const site = {
	name: "Animus Project",
	url: "https://animusproject.org",
	description:
		"An open, anonymous consensus network and sovereign application suite. 100% free, privacy-first, and powered by reciprocity.",
	logo: "/favicon.svg",
	keywords: [
		"animus",
		"animus project",
		"human consensus",
		"collective mind",
		"remnant",
		"resonance",
		"opinion",
		"demographics",
		"neo4j",
		"reciprocity",
	],
	social: [
		{
			url: "https://x.com/animusproject",
			icon: "RiTwitterXFill",
			label: "X (Twitter)",
		},
		{
			url: "https://discord.gg/animusproject",
			icon: "RiDiscordFill",
			label: "Discord",
		},
		{
			url: "https://instagram.com/animusproject",
			icon: "RiInstagramFill",
			label: "Instagram",
		},
		{
			url: "https://facebook.com/animusproject",
			icon: "RiFacebookFill",
			label: "Facebook",
		},
		{
			url: "https://reddit.com/r/animusproject",
			icon: "RiRedditFill",
			label: "Reddit",
		},
		{
			url: "https://tiktok.com/@animusproject",
			icon: "RiTiktokFill",
			label: "TikTok",
		},
	] as SocialLink[],
} as const;

export const navLinks = [
	{ href: "https://animus.animusproject.org", label: "Animus" },
	{ href: "https://resonance.animusproject.org", label: "Resonance" },
	{ href: "https://remnant.animusproject.org", label: "Remnant" },
] as const;

export const suiteLinks = [
	{ href: "https://animus.animusproject.org", label: "Animus™" },
	{ href: "https://resonance.animusproject.org", label: "Resonance™" },
	{ href: "https://remnant.animusproject.org", label: "Remnant™" },
] as const;

export const legalLinks = [
	{ href: "/privacy", label: "Privacy Policy" },
	{ href: "/terms", label: "Terms of Service" },
] as const;
