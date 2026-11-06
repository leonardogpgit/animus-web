"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
	FiLock,
	FiShield,
	FiArrowUpRight,
	FiCheckCircle,
	FiLogOut,
	FiLayers,
	FiKey,
	FiExternalLink,
} from "react-icons/fi";

interface EvaluatorData {
	id: string;
	organization: string;
}

export default function ReviewPage() {
	const [passcode, setPasscode] = useState("");
	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [evaluator, setEvaluator] = useState<EvaluatorData | null>(null);

	// Check if already authenticated in this browser session
	useEffect(() => {
		try {
			const stored = sessionStorage.getItem("animus_review_auth");
			if (stored) {
				const parsed = JSON.parse(stored);
				if (parsed?.organization) {
					setEvaluator(parsed);
				}
			}
		} catch {
			// ignore storage errors
		} finally {
			setInitialLoading(false);
		}
	}, []);

	const handleVerify = async (e: React.FormEvent) => {
		e.preventDefault();
		const cleanPass = passcode.trim();
		if (!cleanPass) return;

		setLoading(true);
		setError(null);

		try {
			// Look up document in Firestore where Document ID == passcode
			const docRef = doc(db, "evaluators", cleanPass);
			const snap = await getDoc(docRef);

			if (snap.exists()) {
				const data = snap.data();
				if (data?.active === false) {
					setError("This institutional access code has been deactivated.");
					return;
				}

				const orgName = data?.organization || "Institutional Evaluator";
				const evalData: EvaluatorData = {
					id: snap.id,
					organization: orgName,
				};

				setEvaluator(evalData);
				sessionStorage.setItem("animus_review_auth", JSON.stringify(evalData));
			} else {
				setError("Invalid institutional passcode. Please verify your credentials.");
			}
		} catch (err: unknown) {
			console.error("Evaluation verification failed:", err);
			setError(
				"Unable to verify passcode at this time. Please check network connectivity or contact legal@animusproject.org.",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleLock = () => {
		sessionStorage.removeItem("animus_review_auth");
		setEvaluator(null);
		setPasscode("");
		setError(null);
	};

	if (initialLoading) {
		return (
			<main className="min-h-[calc(100svh-4rem)] flex items-center justify-center px-4 bg-[#e6ecf2] dark:bg-[#09090b]">
				<div className="flex flex-col items-center gap-3">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-black dark:border-white/20 dark:border-t-white" />
					<p className="font-michroma text-xs text-black/60 dark:text-white/60">
						Initializing review environment...
					</p>
				</div>
			</main>
		);
	}

	// 1. GATE STATE (Passcode Prompt)
	if (!evaluator) {
		return (
			<main className="min-h-[calc(100svh-4rem)] flex items-center justify-center px-4 py-16 bg-[#e6ecf2] dark:bg-[#09090b]">
				<div className="w-full max-w-md">
					<div className="glass-panel p-8 sm:p-10 border border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-[#111116]/90 rounded-3xl backdrop-blur-md shadow-xl text-center space-y-6">
						{/* Lock Icon */}
						<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-md">
							<FiLock className="h-6 w-6" />
						</div>

						<div className="space-y-2">
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-michroma font-bold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-black/80 dark:text-white/80">
								<FiShield className="h-3.5 w-3.5" />
								Restricted Access
							</span>
							<h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-black dark:text-white">
								Institutional Review
							</h1>
							<p className="text-xs sm:text-sm text-black/70 dark:text-white/70 font-sans leading-relaxed">
								Dedicated evaluation workspace for accredited foundation evaluators, grant officers, and institutional partners.
							</p>
						</div>

						{error && (
							<div className="rounded-xl border border-rose-300 dark:border-rose-900/50 bg-rose-500/10 p-3.5 text-xs text-rose-700 dark:text-rose-300 font-sans text-left leading-relaxed">
								{error}
							</div>
						)}

						<form onSubmit={handleVerify} className="space-y-4">
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40 dark:text-white/40">
									<FiKey className="h-4 w-4" />
								</div>
								<input
									type="password"
									value={passcode}
									onChange={(e) => setPasscode(e.target.value)}
									placeholder="Enter access passcode"
									disabled={loading}
									autoFocus
									required
									className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-black/40 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
								/>
							</div>

							<button
								type="submit"
								disabled={loading || !passcode.trim()}
								className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-michroma text-xs sm:text-sm font-bold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
							>
								{loading ? (
									<>
										<div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white dark:border-black/20 dark:border-t-black" />
										<span>Validating Passcode...</span>
									</>
								) : (
									<span>Unlock Review Portal</span>
								)}
							</button>
						</form>

						<div className="pt-2 text-[11px] text-black/50 dark:text-white/50 font-sans">
							Protected under standard non-disclosure terms. <br />
							Direct credential inquiries to{" "}
							<a
								href="mailto:legal@animusproject.org"
								className="underline hover:text-black dark:hover:text-white"
							>
								legal@animusproject.org
							</a>
							.
						</div>
					</div>
				</div>
			</main>
		);
	}

	// 2. UNLOCKED STATE (Institutional Dossier & 3 App Portals)
	return (
		<main className="min-h-[calc(100svh-4rem)] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#e6ecf2] dark:bg-[#09090b]">
			<div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
				{/* Top Status & Accreditation Bar */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-300 dark:border-white/10">
					<div>
						<div className="flex items-center gap-2 text-xs font-michroma text-emerald-600 dark:text-emerald-400 font-bold mb-1">
							<FiCheckCircle className="h-4 w-4" />
							<span>Authorized Institutional Review</span>
						</div>
						<h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-black dark:text-white">
							{evaluator.organization}
						</h1>
					</div>

					<div className="flex items-center gap-3">
						<div className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/10 text-xs font-mono text-black/80 dark:text-white/80">
							Status: <span className="text-emerald-600 dark:text-emerald-400 font-bold">Private Alpha</span>
						</div>
						<button
							type="button"
							onClick={handleLock}
							className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/10 text-xs font-michroma text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
							title="Lock session"
						>
							<FiLogOut className="h-3.5 w-3.5" />
							<span>Lock</span>
						</button>
					</div>
				</div>

				{/* Executive Note on Development Phase */}
				<div className="glass-panel p-6 sm:p-8 border border-slate-300/80 dark:border-white/10 bg-white/70 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm">
					<div className="flex items-start gap-4">
						<div className="p-3 rounded-2xl bg-black/5 dark:bg-white/10 text-black dark:text-white shrink-0 hidden sm:block">
							<FiLayers className="h-6 w-6" />
						</div>
						<div className="space-y-2">
							<h2 className="text-lg sm:text-xl font-bold font-michroma text-black dark:text-white">
								Current Phase: Private Alpha
							</h2>
							<p className="text-sm sm:text-base text-black/80 dark:text-white/80 font-sans leading-relaxed">
								All three platforms within the Animus Project suite are actively functioning under private alpha builds. Core protocol engines (Neo4j semantic deduplication, commit-to-unlock consensus, 3D WebGL neural memory, and mathematical concordance matching) are fully operational for evaluation purposes.
							</p>
						</div>
					</div>
				</div>

				{/* 3 Apps Grid */}
				<div className="space-y-4">
					<div className="text-xs font-bold font-michroma uppercase tracking-wider text-black/60 dark:text-white/60">
						Platforms Available for Review
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* 1. Animus */}
						<div className="glass-panel p-6 sm:p-8 flex flex-col justify-between border border-slate-300/80 dark:border-white/10 bg-white/70 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="h-10 w-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg shadow-sm">
										A
									</div>
									<span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 text-[11px] font-mono font-semibold">
										Private Alpha
									</span>
								</div>

								<div>
									<h3 className="text-xl font-bold font-michroma text-black dark:text-white mb-1">
										Animus
									</h3>
									<p className="text-xs font-michroma text-black/60 dark:text-white/60">
										animus.animusproject.org
									</p>
								</div>

								<p className="text-sm text-black/80 dark:text-white/80 font-sans leading-relaxed">
									The real-time human consensus network. Answer micro-dilemmas under strict commit-to-unlock protocols to eliminate crowd bias, with reciprocity credits and zero telemetry.
								</p>
							</div>

							<div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
								<a
									href="https://animus.animusproject.org"
									target="_blank"
									rel="noopener noreferrer"
									className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-michroma text-xs font-bold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-xs"
								>
									<span>Open Animus</span>
									<FiArrowUpRight className="h-4 w-4" />
								</a>
							</div>
						</div>

						{/* 2. Remnant */}
						<div className="glass-panel p-6 sm:p-8 flex flex-col justify-between border border-slate-300/80 dark:border-white/10 bg-white/70 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="h-10 w-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm shadow-sm">
										R
									</div>
									<span className="rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 px-2.5 py-0.5 text-[11px] font-mono font-semibold">
										Private Alpha
									</span>
								</div>

								<div>
									<h3 className="text-xl font-bold font-michroma text-black dark:text-white mb-1">
										Remnant
									</h3>
									<p className="text-xs font-michroma text-black/60 dark:text-white/60">
										remnant.animusproject.org
									</p>
								</div>

								<p className="text-sm text-black/80 dark:text-white/80 font-sans leading-relaxed">
									Personal AI assistant (Jarvis) and living voice mask (*persona*). Synthesizes personal episodic memory into private sovereign vaults with authentic neural voice cloning.
								</p>
							</div>

							<div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
								<a
									href="https://remnant.animusproject.org"
									target="_blank"
									rel="noopener noreferrer"
									className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-michroma text-xs font-bold border border-slate-300 dark:border-white/20 bg-black/5 dark:bg-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors shadow-xs"
								>
									<span>Open Remnant</span>
									<FiArrowUpRight className="h-4 w-4" />
								</a>
							</div>
						</div>

						{/* 3. Resonance */}
						<div className="glass-panel p-6 sm:p-8 flex flex-col justify-between border-2 border-cyan-500/30 dark:border-cyan-400/30 bg-white/70 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="h-10 w-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-cyan-500/20">
										⚡
									</div>
									<span className="rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 px-2.5 py-0.5 text-[11px] font-mono font-semibold">
										Private Alpha
									</span>
								</div>

								<div>
									<h3 className="text-xl font-bold font-michroma text-black dark:text-white mb-1">
										Resonance
									</h3>
									<p className="text-xs font-michroma text-black/60 dark:text-white/60">
										resonance.animusproject.org
									</p>
								</div>

								<p className="text-sm text-black/80 dark:text-white/80 font-sans leading-relaxed">
									The anti-superficial human connection layer. Pairs individuals based on &gt;90% ethical and philosophical concordance derived from Animus dilemmas with bilateral progressive reveal.
								</p>
							</div>

							<div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
								<a
									href="https://resonance.animusproject.org"
									target="_blank"
									rel="noopener noreferrer"
									className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-michroma text-xs font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors shadow-sm shadow-cyan-500/20"
								>
									<span>Open Resonance</span>
									<FiArrowUpRight className="h-4 w-4" />
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Institutional Notice & Support */}
				<div className="pt-8 border-t border-slate-300 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-black/60 dark:text-white/60 font-sans">
					<div>
						Animus Project LLC · Confidential Institutional Evaluation Environment
					</div>
					<div className="flex items-center gap-4">
						<a
							href="mailto:legal@animusproject.org"
							className="hover:text-black dark:hover:text-white transition-colors"
						>
							legal@animusproject.org
						</a>
						<span>·</span>
						<a
							href="https://animusproject.org"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors"
						>
							<span>Public Portal</span>
							<FiExternalLink className="h-3 w-3" />
						</a>
					</div>
				</div>
			</div>
		</main>
	);
}
