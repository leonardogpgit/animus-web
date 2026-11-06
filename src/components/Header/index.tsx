"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, site } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { FiUser } from "react-icons/fi";

export default function Header() {
	const { user } = useAuth();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-slate-300/80 bg-[#e6ecf2]/90 backdrop-blur-md dark:border-white/10 dark:bg-[#09090b]/90 transition-colors">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-14 items-center justify-between md:h-16">
					{/* Logo */}
					<a
						href="https://animusproject.org"
						className="flex items-center gap-3"
						aria-label="Animus Project"
					>
						<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black border border-black/10 text-lg font-bold text-white shadow-xs dark:bg-white dark:text-black dark:border-white/10">
							A
						</div>
						<span translate="no" className="font-tektur text-xl font-bold tracking-tight text-black dark:text-white notranslate">
							{site.name}
						</span>
					</a>

					{/* Desktop Navigation */}
					<nav className="hidden items-center gap-7 md:flex">
						{navLinks.map(({ label, href }) => (
							<a
								key={label}
								href={href}
								className="text-xs sm:text-sm font-semibold font-michroma text-black/75 hover:text-black dark:text-white/75 dark:hover:text-white transition-colors"
							>
								{label}
							</a>
						))}
					</nav>

					{/* Actions: Login & Theme Toggle */}
					<div className="flex items-center gap-3">
						{user ? (
							<a
								href="https://animus.animusproject.org/app/profile"
								className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden border border-slate-300 dark:border-white/10 hover:opacity-80 transition-opacity bg-black/5 dark:bg-white/5"
								title={user.displayName || user.email || "User Profile"}
							>
								{user.photoURL ? (
									<img
										src={user.photoURL}
										alt={user.displayName || "User"}
										className="h-full w-full object-cover"
										referrerPolicy="no-referrer"
									/>
								) : (
									<FiUser className="h-4 w-4 text-black dark:text-white" />
								)}
							</a>
						) : (
							<a
								href="/login"
								className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/10 bg-[#f4f7fb] dark:bg-white/5 text-xs font-semibold font-michroma text-black dark:text-white hover:bg-slate-200/70 dark:hover:bg-white/10 transition-colors shadow-xs"
							>
								Login
							</a>
						)}
						<ThemeToggle />
					</div>
				</div>

				{/* Mobile Navigation (Always visible) */}
				<nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 border-t border-slate-300/60 dark:border-white/10 py-2.5 md:hidden">
					{navLinks.map(({ label, href }) => (
						<a
							key={label}
							href={href}
							className="text-xs font-semibold font-michroma text-black/75 hover:text-black dark:text-white/75 dark:hover:text-white transition-colors"
						>
							{label}
						</a>
					))}
					{!user && (
						<a
							href="/login"
							className="text-xs font-semibold font-michroma text-black dark:text-white hover:opacity-75 transition-opacity"
						>
							Login
						</a>
					)}
				</nav>
			</div>
		</header>
	);
}
