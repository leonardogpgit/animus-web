import type { SocialLink } from "@/types";

export const site = {
	name: "Animus Project",
	url: "https://animusproject.org",
	description:
		"An open, anonymous consensus network. 100% free, privacy-first, and powered by reciprocity.",
	logo: "/favicon.svg",
	keywords: [
		"animus",
		"animus project",
		"human consensus",
		"collective mind",
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
			url: "https://github.com/animusproject",
			icon: "RiGithubFill",
			label: "GitHub",
		},
		{
			url: "https://discord.gg/animusproject",
			icon: "RiDiscordFill",
			label: "Discord",
		},
		{
			url: "https://t.me/animusproject",
			icon: "RiTelegram2Fill",
			label: "Telegram",
		},
		{
			url: "https://linkedin.com/company/animusproject",
			icon: "RiLinkedinFill",
			label: "LinkedIn",
		},
		{
			url: "https://instagram.com/animusproject",
			icon: "RiInstagramFill",
			label: "Instagram",
		},
		{
			url: "https://youtube.com/@animusproject",
			icon: "RiYoutubeFill",
			label: "YouTube",
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
	{ href: "/#features", label: "How It Works" },
	{ href: "/#graph", label: "The Graph" },
	{ href: "https://app.animusproject.org/faq", label: "FAQ" },
	{ href: "https://app.animusproject.org", label: "The App" },
] as const;

export const legalLinks = [
	{ href: "/manifesto", label: "Manifesto" },
	{ href: "/legal", label: "Legal" },
] as const;
