"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
	getSafeRedirectUrl,
	buildRedirectWithSession,
	setSharedSession,
	getSharedSession,
} from "@/lib/cookieAuth";
import { FcGoogle } from "react-icons/fc";

function LoginForm() {
	const searchParams = useSearchParams();
	const redirectParam = searchParams.get("redirect");
	const modeParam = searchParams.get("mode");
	const safeRedirect = getSafeRedirectUrl(redirectParam);

	const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, logout } =
		useAuth();

	const [isSignUp, setIsSignUp] = useState(modeParam === "signup");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const hasRedirectedRef = useRef(false);

	useEffect(() => {
		if (user && safeRedirect && !hasRedirectedRef.current) {
			hasRedirectedRef.current = true;
			user
				.getIdToken()
				.then((token) => {
					const sessionData = {
						uid: user.uid,
						email: user.email,
						displayName: user.displayName,
						photoURL: user.photoURL,
						token,
						updatedAt: Date.now(),
					};
					setSharedSession(sessionData);
					window.location.href = buildRedirectWithSession(
						safeRedirect,
						sessionData,
					);
				})
				.catch(() => {
					window.location.href = safeRedirect;
				});
		}
	}, [user, safeRedirect]);

	const handlePostLogin = (sessionData?: any) => {
		const session = sessionData || getSharedSession();
		const target = safeRedirect || "https://app.animusproject.org/app/graph";
		if (session) {
			setSharedSession(session);
			window.location.href = buildRedirectWithSession(target, session);
		} else {
			window.location.href = target;
		}
	};

	const handleNavigateWithSession = async (targetUrl: string) => {
		if (user) {
			try {
				const token = await user.getIdToken();
				const sessionData = {
					uid: user.uid,
					email: user.email,
					displayName: user.displayName,
					photoURL: user.photoURL,
					token,
					updatedAt: Date.now(),
				};
				setSharedSession(sessionData);
				window.location.href = buildRedirectWithSession(
					targetUrl,
					sessionData,
				);
				return;
			} catch {}
		}
		window.location.href = targetUrl;
	};

	if (user) {
		return (
			<section className="py-20 md:py-28 flex items-center justify-center px-4">
				<div className="card-base w-full max-w-md p-8 text-center space-y-6">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/10 text-xl font-bold font-michroma">
						{user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
					</div>
					<div>
						<h1 className="text-2xl font-bold font-michroma text-black dark:text-white">
							Session Active
						</h1>
						<p className="mt-2 text-sm text-black/70 dark:text-white/70">
							{user.email || user.displayName || user.uid}
						</p>
						<p className="mt-1 font-mono text-xs text-black/40 dark:text-white/40 break-all">
							UID: {user.uid}
						</p>
					</div>

					<div className="flex flex-col gap-3 pt-2">
						{safeRedirect ? (
							<button
								type="button"
								onClick={handlePostLogin}
								className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium font-michroma text-white hover:opacity-90 dark:bg-white dark:text-black transition-opacity cursor-pointer"
							>
								Continue to Requested Page
							</button>
						) : (
							<>
								<button
									type="button"
									onClick={() =>
										handleNavigateWithSession(
											"https://app.animusproject.org/app/graph",
										)
									}
									className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium font-michroma text-white hover:opacity-90 dark:bg-white dark:text-black transition-opacity text-center cursor-pointer"
								>
									Open App (Graph)
								</button>
								<button
									type="button"
									onClick={() =>
										handleNavigateWithSession(
											"https://imago.animusproject.org/app/graph",
										)
									}
									className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-white/70 dark:bg-white/5 px-4 py-3 text-sm font-medium font-michroma text-black dark:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors text-center cursor-pointer"
								>
									Open Imago
								</button>
								<button
									type="button"
									onClick={() =>
										handleNavigateWithSession(
											"https://app.animusproject.org/app/profile",
										)
									}
									className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-[#f4f7fb] dark:bg-white/5 px-4 py-3 text-sm font-medium font-michroma text-black dark:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors text-center cursor-pointer"
								>
									User Profile
								</button>
							</>
						)}

						<button
							type="button"
							onClick={() => logout()}
							className="w-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium font-michroma text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors mt-2 cursor-pointer"
						>
							Sign Out
						</button>
					</div>
				</div>
			</section>
		);
	}

	const handleGoogleSignIn = async () => {
		try {
			setError(null);
			setIsSubmitting(true);
			const session = await signInWithGoogle();
			handlePostLogin(session);
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Failed to sign in with Google";
			setError(message);
			setIsSubmitting(false);
		}
	};

	const handleEmailAuth = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !password) {
			setError("Please fill in both email and password.");
			return;
		}

		try {
			setError(null);
			setIsSubmitting(true);
			const session = isSignUp
				? await signUpWithEmail(email, password)
				: await signInWithEmail(email, password);
			handlePostLogin(session);
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Authentication failed";
			setError(message);
			setIsSubmitting(false);
		}
	};

	return (
		<section className="py-20 md:py-28 flex items-center justify-center px-4">
			<div className="card-base w-full max-w-md p-8 space-y-6">
				<div className="text-center space-y-2">
					<h1 className="text-2xl sm:text-3xl font-bold font-michroma text-black dark:text-white">
						{isSignUp ? "Join Animus Project" : "Access Animus Project"}
					</h1>
					<p className="text-xs sm:text-sm text-black/70 dark:text-white/70">
						Unified authentication across the Animus Project ecosystem.
					</p>
				</div>

				{error && (
					<div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-600 dark:text-red-400 leading-relaxed">
						{error}
					</div>
				)}

				<button
					type="button"
					onClick={handleGoogleSignIn}
					disabled={isSubmitting}
					className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 dark:border-white/10 bg-[#f4f7fb] dark:bg-white/5 px-4 py-3 text-sm font-medium font-michroma text-black dark:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors disabled:opacity-50 cursor-pointer"
				>
					<FcGoogle className="h-5 w-5 shrink-0" />
					<span>Continue with Google</span>
				</button>

				<div className="relative flex items-center justify-center">
					<div className="w-full border-t border-slate-300 dark:border-white/10" />
					<span className="absolute bg-[#f4f7fb] dark:bg-[#0f0f13] px-3 text-[11px] font-mono uppercase text-black/50 dark:text-white/50">
						or email
					</span>
				</div>

				<form onSubmit={handleEmailAuth} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="mb-1.5 block text-xs font-medium font-michroma text-black dark:text-white"
						>
							Email Address
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@domain.com"
							required
							className="w-full rounded-xl border border-slate-300 bg-[#f4f7fb] px-4 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-neutral-500 focus:border-black dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-400 dark:focus:border-white"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="mb-1.5 block text-xs font-medium font-michroma text-black dark:text-white"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							required
							className="w-full rounded-xl border border-slate-300 bg-[#f4f7fb] px-4 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-neutral-500 focus:border-black dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-400 dark:focus:border-white"
						/>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium font-michroma text-white hover:opacity-90 dark:bg-white dark:text-black transition-opacity disabled:opacity-50 mt-2 cursor-pointer"
					>
						{isSubmitting
							? "Processing..."
							: isSignUp
								? "Create Account"
								: "Sign In"}
					</button>
				</form>

				<div className="text-center pt-2">
					<button
						type="button"
						onClick={() => setIsSignUp(!isSignUp)}
						className="text-xs text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white underline transition-colors cursor-pointer"
					>
						{isSignUp
							? "Already have an account? Sign In"
							: "Don't have an account yet? Create one"}
					</button>
				</div>
			</div>
		</section>
	);
}

export default function LoginPage() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-[60vh] items-center justify-center p-4">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-black dark:border-white/20 dark:border-t-white" />
				</div>
			}
		>
			<LoginForm />
		</Suspense>
	);
}
