import type { SocialLink } from "@/types";

export const site = {
	name: "Animus Project",
	url: "https://animusproject.org",
	description:
		"A new way to see the world, a new way to connect with people, and a new way to preserve who you are. Privacy-first sovereign technology.",
	logo: "/favicon.svg",
	keywords: [
		"animus",
		"animus project",
		"remnant",
		"resonance",
		"privacy",
		"sovereign technology",
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
