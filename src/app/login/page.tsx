"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FiArrowUpRight, FiCheckCircle, FiLock, FiLogOut } from "react-icons/fi";

function getValidRedirect(target: string | null): string {
	if (!target) return "https://animus.animusproject.org/app/graph";

	// Relative paths
	if (target.startsWith("/") && !target.startsWith("//")) {
		return target;
	}

	try {
		const parsed = new URL(target);
		if (parsed.hostname.endsWith("animusproject.org")) {
			return target;
		}
	} catch {
		// invalid url
	}

	return "https://animus.animusproject.org/app/graph";
}

function LoginForm() {
	const searchParams = useSearchParams();
	const redirectParam = searchParams.get("redirect");
	const targetRedirect = getValidRedirect(redirectParam);

	const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, logout } =
		useAuth();

	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// If already authenticated, show session active card with single-click jump
	if (user) {
		return (
			<section className="min-h-[calc(100svh-4rem)] flex items-center justify-center px-4 py-16">
				<div className="glass-panel w-full max-w-md p-8 sm:p-10 border border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-[#111116]/90 rounded-3xl backdrop-blur-md shadow-xl text-center space-y-6">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xl font-bold font-michroma shadow-md">
						{user.displayName
							? user.displayName.charAt(0).toUpperCase()
							: user.email
								? user.email.charAt(0).toUpperCase()
								: "A"}
					</div>

					<div className="space-y-1">
						<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-michroma font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
							<FiCheckCircle className="h-3.5 w-3.5" />
							<span>Session Active</span>
						</div>
						<h1 className="text-2xl font-bold font-heading text-black dark:text-white pt-1">
							{user.displayName || "Animus Member"}
						</h1>
						<p className="text-xs sm:text-sm text-black/70 dark:text-white/70 font-sans">
							{user.email || user.uid}
						</p>
					</div>

					<div className="flex flex-col gap-3 pt-2">
						<button
							type="button"
							onClick={() => {
								window.location.href = targetRedirect;
							}}
							className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-michroma text-xs sm:text-sm font-bold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-sm"
						>
							<span>Continuar a la Plataforma</span>
							<FiArrowUpRight className="h-4 w-4" />
						</button>

						<button
							type="button"
							onClick={() => logout()}
							className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-michroma text-xs font-bold border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/10 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/20 transition-colors"
						>
							<FiLogOut className="h-3.5 w-3.5" />
							<span>Cerrar Sesión Global</span>
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
			await signInWithGoogle();
			window.location.href = targetRedirect;
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
			setError("Por favor completa correo electrónico y contraseña.");
			return;
		}

		try {
			setError(null);
			setIsSubmitting(true);
			if (isSignUp) {
				await signUpWithEmail(email, password);
			} else {
				await signInWithEmail(email, password);
			}
			window.location.href = targetRedirect;
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Authentication failed";
			setError(message);
			setIsSubmitting(false);
		}
	};

	return (
		<section className="min-h-[calc(100svh-4rem)] flex items-center justify-center px-4 py-16">
			<div className="glass-panel w-full max-w-md p-8 sm:p-10 border border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-[#111116]/90 rounded-3xl backdrop-blur-md shadow-xl space-y-6">
				<div className="text-center space-y-2">
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-sm">
						<FiLock className="h-5 w-5" />
					</div>
					<h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-black dark:text-white">
						{isSignUp ? "Crear Cuenta Unificada" : "Ingresar a Animus"}
					</h1>
					<p className="text-xs sm:text-sm text-black/70 dark:text-white/70 font-sans leading-relaxed">
						Un solo acceso para Animus, Resonance y Remnant.
					</p>
				</div>

				{error && (
					<div className="rounded-xl border border-rose-300 dark:border-rose-900/50 bg-rose-500/10 p-3.5 text-xs text-rose-700 dark:text-rose-300 font-sans leading-relaxed">
						{error}
					</div>
				)}

				<button
					type="button"
					onClick={handleGoogleSignIn}
					disabled={isSubmitting}
					className="flex w-full items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 font-michroma text-xs sm:text-sm font-bold text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors shadow-xs disabled:opacity-50"
				>
					<FcGoogle className="h-5 w-5 shrink-0" />
					<span>Continuar con Google</span>
				</button>

				<div className="relative flex items-center justify-center">
					<div className="w-full border-t border-slate-300 dark:border-white/10" />
					<span className="absolute bg-white dark:bg-[#111116] px-3 text-[11px] font-mono uppercase text-black/50 dark:text-white/50">
						o con correo
					</span>
				</div>

				<form onSubmit={handleEmailAuth} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="mb-1.5 block text-xs font-bold font-michroma text-black/80 dark:text-white/80"
						>
							Correo Electrónico
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="tu@correo.com"
							required
							className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-black/40 px-4 py-2.5 text-sm font-sans text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="mb-1.5 block text-xs font-bold font-michroma text-black/80 dark:text-white/80"
						>
							Contraseña
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							required
							className="w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-black/40 px-4 py-2.5 text-sm font-sans text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
						/>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full py-3.5 px-6 rounded-xl font-michroma text-xs sm:text-sm font-bold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-sm disabled:opacity-50 mt-2"
					>
						{isSubmitting
							? "Procesando..."
							: isSignUp
								? "Crear Cuenta"
								: "Iniciar Sesión"}
					</button>
				</form>

				<div className="text-center pt-2">
					<button
						type="button"
						onClick={() => setIsSignUp(!isSignUp)}
						className="text-xs text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white underline transition-colors"
					>
						{isSignUp
							? "¿Ya tienes cuenta? Iniciar Sesión"
							: "¿Nuevo en Animus? Crear una cuenta"}
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
				<div className="min-h-[calc(100svh-4rem)] flex items-center justify-center">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-black dark:border-white/20 dark:border-t-white" />
				</div>
			}
		>
			<LoginForm />
		</Suspense>
	);
}
