"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
	FiArrowUpRight,
	FiLogOut,
	FiDownload,
	FiFileText,
	FiSmartphone,
	FiMonitor,
	FiMail,
	FiCheck,
	FiCopy,
	FiX,
	FiEye,
	FiEyeOff,
	FiExternalLink,
} from "react-icons/fi";

interface EvaluatorData {
	id: string;
	organization: string;
}

interface ModalInfo {
	appName: string;
	platformType: "apk" | "desktop";
	webUrl: string;
}

export default function ReviewPage() {
	const [passcode, setPasscode] = useState("");
	const [showPasscode, setShowPasscode] = useState(false);
	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [evaluator, setEvaluator] = useState<EvaluatorData | null>(null);

	// Modal state for direct package downloads
	const [modalInfo, setModalInfo] = useState<ModalInfo | null>(null);
	const [copiedEmail, setCopiedEmail] = useState(false);

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
				"Unable to verify passcode at this time. Please check network connectivity or contact review@animusproject.org.",
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

	const copyEmail = () => {
		navigator.clipboard.writeText("review@animusproject.org");
		setCopiedEmail(true);
		setTimeout(() => setCopiedEmail(false), 2500);
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
						<div className="space-y-2">
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
								<input
									type={showPasscode ? "text" : "password"}
									value={passcode}
									onChange={(e) => setPasscode(e.target.value)}
									placeholder="Enter access passcode"
									disabled={loading}
									autoFocus
									required
									className="w-full pl-4 pr-11 py-3.5 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-black/40 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
								/>
								<button
									type="button"
									onClick={() => setShowPasscode((prev) => !prev)}
									className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white transition-colors"
									aria-label={showPasscode ? "Hide passcode" : "Show passcode"}
								>
									{showPasscode ? (
										<FiEyeOff className="h-4 w-4" />
									) : (
										<FiEye className="h-4 w-4" />
									)}
								</button>
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
							Protected under DTSA, Florida UTSA & 18 U.S.C. § 1905. <br />
							Direct credential inquiries to{" "}
							<a
								href="mailto:review@animusproject.org"
								className="underline hover:text-black dark:hover:text-white"
							>
								review@animusproject.org
							</a>
							.
						</div>
					</div>
				</div>
			</main>
		);
	}

	// Dynamic greeting for evaluator
	const welcomeTitle =
		evaluator.organization.toLowerCase().includes("mozilla")
			? "Welcome, Mozilla Technology Fund Selection Committee"
			: `Welcome, ${evaluator.organization} Selection Committee`;

	// 2. UNLOCKED STATE (Institutional Dossier & 4-Tier Structure)
	return (
		<main className="min-h-[calc(100svh-4rem)] py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#e6ecf2] dark:bg-[#09090b]">
			<div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
				{/* ───────────────────────────────────────────────────────────── */}
				{/* 1. ENCABEZADO PERSONALIZADO                                    */}
				{/* ───────────────────────────────────────────────────────────── */}
				<header className="glass-panel p-6 sm:p-8 border border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm">
					<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
						<div className="space-y-2.5">
							<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-black dark:text-white tracking-tight">
								{welcomeTitle}
							</h1>

							<div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-black/70 dark:text-white/70">
								<span>🔒</span>
								<span>
									Confidential Review Portal · Protected under{" "}
									<strong className="text-black dark:text-white font-semibold">
										DTSA, Florida UTSA & 18 U.S.C. § 1905
									</strong>
								</span>
							</div>
						</div>

						<div className="flex items-center gap-3 shrink-0 self-end md:self-center">
							<div className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/10 text-xs font-mono text-black/80 dark:text-white/80">
								Org: <span className="font-bold text-black dark:text-white">{evaluator.organization}</span>
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
				</header>

				{/* ───────────────────────────────────────────────────────────── */}
				{/* 2. EL DOSSIER EJECUTIVO (PDF DESCARGABLE)                      */}
				{/* ───────────────────────────────────────────────────────────── */}
				<section className="glass-panel p-6 sm:p-8 border border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm space-y-6">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
						<div>
							<div className="text-[11px] font-michroma font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-1">
								Section 2 · Technical Documentation
							</div>
							<h2 className="text-xl sm:text-2xl font-bold font-michroma text-black dark:text-white">
								Dossier Ejecutivo & Asignación Presupuestaria
							</h2>
						</div>

						{/* Primary PDF Download Action */}
						<a
							href="/docs/Animus_Technical_Brief_and_Budget_Allocation.pdf"
							download="Animus_Technical_Brief_and_Budget_Allocation.pdf"
							className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl font-michroma text-xs sm:text-sm font-bold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-md shrink-0"
						>
							<FiFileText className="h-4 w-4" />
							<span>Download Technical Brief & Budget Allocation (PDF)</span>
							<FiDownload className="h-4 w-4" />
						</a>
					</div>

					{/* 3 Pillars of the Dossier */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
						<div className="p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-2">
							<div className="font-michroma text-xs font-bold text-black dark:text-white">
								Diagramas en Bloques
							</div>
							<p className="text-xs text-black/75 dark:text-white/75 font-sans leading-relaxed">
								Arquitectura modular completa de tres capas (cliente soberano, pasarela de consenso commit-to-unlock y grafos Neo4j) con aislamiento estricto de código fuente propietario.
							</p>
						</div>

						<div className="p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-2">
							<div className="font-michroma text-xs font-bold text-black dark:text-white">
								Fases de Desarrollo
							</div>
							<p className="text-xs text-black/75 dark:text-white/75 font-sans leading-relaxed">
								Cronograma de 4 hitos ejecutables (Milestones 1 a 4): desde la Alpha privada actual hasta la migración de GPU, la cohorte auditada de 5,000 evaluadores y la federación mainnet.
							</p>
						</div>

						<div className="p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-2">
							<div className="font-michroma text-xs font-bold text-black dark:text-white">
								Asignación de Fondos
							</div>
							<p className="text-xs text-black/75 dark:text-white/75 font-sans leading-relaxed">
								Desglose exacto de los fondos solicitados: servidores GPU dedicados (Moonshine STT y Kokoro TTS), clusters Neo4j Aura Enterprise, registro de marcas registradas USPTO y cohortes de prueba.
							</p>
						</div>
					</div>
				</section>

				{/* ───────────────────────────────────────────────────────────── */}
				{/* 3. LAS APLICACIONES                                            */}
				{/* ───────────────────────────────────────────────────────────── */}
				<section className="space-y-6">
					<div>
						<div className="text-[11px] font-michroma font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-1">
							Section 3 · Suite Evaluation
						</div>
						<h2 className="text-xl sm:text-2xl font-bold font-michroma text-black dark:text-white">
							Las Aplicaciones: Descarga, Estado Real y Walkthrough
						</h2>
					</div>

					<div className="grid grid-cols-1 gap-6">
						{/* TARJETA 1: ANIMUS */}
						<div className="glass-panel p-6 sm:p-8 border border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm space-y-6">
							<div>
								<h3 className="text-xl font-bold font-michroma text-black dark:text-white">
									Animus
								</h3>
								<p className="text-xs font-mono text-black/60 dark:text-white/60 mb-2">
									animus.animusproject.org · Private Alpha (servidor de testeo interno)
								</p>
								<p className="text-sm text-black/80 dark:text-white/80 font-sans leading-relaxed">
									Red de consenso humano en tiempo real. Resuelve micro-dilemas bajo el protocolo estricto <em>commit-to-unlock</em> (dar para ver) para erradicar el sesgo de manada, con créditos de reciprocidad y cero telemetría publicitaria.
								</p>
							</div>

							{/* Buttons */}
							<div className="flex flex-wrap items-center gap-3 pt-2">
								<button
									type="button"
									onClick={() =>
										setModalInfo({
											appName: "Animus",
											platformType: "apk",
											webUrl: "https://animus.animusproject.org",
										})
									}
									className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-michroma text-xs font-bold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-sm"
								>
									<FiSmartphone className="h-4 w-4" />
									<span>Download Android APK</span>
								</button>

								<button
									type="button"
									onClick={() =>
										setModalInfo({
											appName: "Animus",
											platformType: "desktop",
											webUrl: "https://animus.animusproject.org",
										})
									}
									className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-michroma text-xs font-bold border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/10 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/20 transition-colors"
								>
									<FiMonitor className="h-4 w-4" />
									<span>Download Linux / Win</span>
								</button>

								<a
									href="https://animus.animusproject.org"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-michroma text-xs font-bold text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white underline underline-offset-4"
								>
									<span>Abrir Portal Web</span>
									<FiArrowUpRight className="h-3.5 w-3.5" />
								</a>
							</div>

							{/* Walkthrough */}
							<div className="rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 sm:p-5 space-y-3">
								<div className="text-xs font-michroma font-bold uppercase tracking-wider text-black/70 dark:text-white/70">
									Walkthrough de Prueba (Cómo probarla en 2 minutos):
								</div>
								<ol className="space-y-2 text-xs sm:text-sm text-black/85 dark:text-white/85 font-sans leading-relaxed list-decimal list-inside">
									<li>
										<strong>Abre la app</strong> y responde los dos dilemas precargados.
									</li>
									<li>
										<strong>Observa el bloqueo del consenso</strong> hasta que confirmas tu voto a ciegas (no hay distribución estadística visible previo al compromiso).
									</li>
									<li>
										<strong>Revisa la distribución estadística</strong> resultante en el grafo local con cruces demográficos inmediatos.
									</li>
								</ol>
							</div>
						</div>

						{/* TARJETA 2: ANIMUS RESONANCE */}
						<div className="glass-panel p-6 sm:p-8 border border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm space-y-6">
							<div>
								<h3 className="text-xl font-bold font-michroma text-black dark:text-white">
									Animus Resonance
								</h3>
								<p className="text-xs font-mono text-black/60 dark:text-white/60 mb-2">
									resonance.animusproject.org · Private Alpha (módulo de afinidad multidimensional)
								</p>
								<p className="text-sm text-black/80 dark:text-white/80 font-sans leading-relaxed">
									La capa de conexión humana anti-superficial. Empareja personas basándose exclusivamente en más del 90% de concordancia axiológica y ética calculada sobre dilemas de Animus, mediante revelación progresiva bilateral (revelación de máscara paso a paso).
								</p>
							</div>

							{/* Buttons */}
							<div className="flex flex-wrap items-center gap-3 pt-2">
								<a
									href="https://resonance.animusproject.org"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-michroma text-xs font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors shadow-sm shadow-cyan-500/20"
								>
									<span>Abrir Resonance Web</span>
									<FiArrowUpRight className="h-4 w-4" />
								</a>

								<button
									type="button"
									onClick={() =>
										setModalInfo({
											appName: "Animus Resonance",
											platformType: "apk",
											webUrl: "https://resonance.animusproject.org",
										})
									}
									className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-michroma text-xs font-bold border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/10 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/20 transition-colors"
								>
									<FiSmartphone className="h-4 w-4" />
									<span>Download Android APK</span>
								</button>
							</div>

							{/* Walkthrough */}
							<div className="rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 sm:p-5 space-y-3">
								<div className="text-xs font-michroma font-bold uppercase tracking-wider text-black/70 dark:text-white/70">
									Walkthrough de Prueba:
								</div>
								<ol className="space-y-2 text-xs sm:text-sm text-black/85 dark:text-white/85 font-sans leading-relaxed list-decimal list-inside">
									<li>
										<strong>Configura tus preferencias axiológicas</strong> y vectores de convicción ética.
									</li>
									<li>
										<strong>Observa la afinidad matemática</strong> calculada en tiempo real (&gt;90% de concordancia) sin fotos ni métricas de vanidad iniciales.
									</li>
									<li>
										<strong>Comprueba el protocolo de 4 fases</strong> de revelación progresiva mutua (doble ciego: si uno declina, la privacidad permanece 100% resguardada).
									</li>
								</ol>
							</div>
						</div>

						{/* TARJETA 3: ANIMUS REMNANT */}
						<div className="glass-panel p-6 sm:p-8 border border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-[#111116]/80 rounded-3xl backdrop-blur-md shadow-sm space-y-6">
							<div>
								<h3 className="text-xl font-bold font-michroma text-black dark:text-white">
									Animus Remnant
								</h3>
								<p className="text-xs font-mono text-black/60 dark:text-white/60 mb-2">
									remnant.animusproject.org · Alpha Prototype
								</p>
								<p className="text-sm text-black/80 dark:text-white/80 font-sans leading-relaxed">
									Compañero de IA soberano de escritorio y móvil (Jarvis) y máscara viva de voz (<em>persona</em>). Sintetiza la memoria episódica personal en bóvedas privadas con clonación neuronal de voz auténtica.
								</p>
							</div>

							{/* AVISO DE INGENIERÍA (Hardware Justification) */}
							<div className="rounded-2xl border-2 border-amber-500/30 dark:border-amber-400/30 bg-amber-500/5 dark:bg-amber-400/5 p-4 sm:p-5 space-y-1.5">
								<div className="font-michroma text-xs font-bold text-amber-800 dark:text-amber-300">
									Aviso de Ingeniería &amp; Justificación de Hardware:
								</div>
								<p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-sans leading-relaxed italic">
									&ldquo;Actualmente corre en cliente con Moonshine STT y Kokoro TTS en servidor ligero ($0 cost). La latencia y síntesis actuales justifican directamente los fondos de cómputo solicitados en esta propuesta.&rdquo;
								</p>
							</div>

							{/* Buttons */}
							<div className="flex flex-wrap items-center gap-3 pt-2">
								<a
									href="https://remnant.animusproject.org"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-michroma text-xs font-bold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-sm"
								>
									<span>Abrir Remnant Web</span>
									<FiArrowUpRight className="h-4 w-4" />
								</a>

								<button
									type="button"
									onClick={() =>
										setModalInfo({
											appName: "Animus Remnant",
											platformType: "desktop",
											webUrl: "https://remnant.animusproject.org",
										})
									}
									className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-michroma text-xs font-bold border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/10 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/20 transition-colors"
								>
									<FiMonitor className="h-4 w-4" />
									<span>Download Linux / Win</span>
								</button>

								<button
									type="button"
									onClick={() =>
										setModalInfo({
											appName: "Animus Remnant",
											platformType: "apk",
											webUrl: "https://remnant.animusproject.org",
										})
									}
									className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-michroma text-xs font-bold border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/10 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/20 transition-colors"
								>
									<FiSmartphone className="h-4 w-4" />
									<span>Download Android APK</span>
								</button>
							</div>

							{/* Walkthrough */}
							<div className="rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 sm:p-5 space-y-3">
								<div className="text-xs font-michroma font-bold uppercase tracking-wider text-black/70 dark:text-white/70">
									Walkthrough de Prueba:
								</div>
								<ol className="space-y-2 text-xs sm:text-sm text-black/85 dark:text-white/85 font-sans leading-relaxed list-decimal list-inside">
									<li>
										<strong>Di una frase por el micrófono</strong> y observa la transcripción local inmediata (Moonshine STT).
									</li>
									<li>
										<strong>Observa la respuesta determinista</strong> recuperada directamente del grafo de memoria episódica personal.
									</li>
									<li>
										<strong>Evalúa la síntesis neuronal Kokoro TTS</strong> generada en condiciones de servidor prototipo ligero.
									</li>
								</ol>
							</div>
						</div>
					</div>
				</section>

				{/* ───────────────────────────────────────────────────────────── */}
				{/* 4. CANAL DIRECTO DE EVALUACIÓN (Línea con los Fundadores)     */}
				{/* ───────────────────────────────────────────────────────────── */}
				<section className="glass-panel p-6 sm:p-8 md:p-10 border border-slate-300/80 dark:border-white/10 bg-white/90 dark:bg-[#111116]/90 rounded-3xl backdrop-blur-md shadow-md space-y-6">
					<div className="space-y-2">
						<h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-black dark:text-white">
							¿Dudas técnicas o problemas con la instalación?
						</h2>
						<p className="text-sm sm:text-base text-black/80 dark:text-white/80 font-sans leading-relaxed">
							Línea directa y confidencial con los fundadores para soporte técnico, auditoría de paquetes o sesiones en vivo de arquitectura:
						</p>
					</div>

					{/* Founders Info Box */}
					<div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<div className="space-y-1">
							<div className="text-xs font-michroma font-bold text-black/60 dark:text-white/60 uppercase tracking-wider">
								Contacto Directo con los Fundadores:
							</div>
							<div className="text-base sm:text-lg font-bold font-michroma text-black dark:text-white">
								Javier <span className="text-xs font-normal text-black/60 dark:text-white/60">(CEO / US Operations)</span> · Leo <span className="text-xs font-normal text-black/60 dark:text-white/60">(CTO / Lead Architect)</span>
							</div>
							<div className="text-sm font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
								review@animusproject.org
							</div>
						</div>

						<div className="flex items-center gap-2.5">
							<a
								href="mailto:review@animusproject.org?subject=Mozilla%20Evaluation%20Inquiry%20-%20Animus%20Project"
								className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-michroma text-xs font-bold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-sm"
							>
								<FiMail className="h-4 w-4" />
								<span>Escribir Correo</span>
							</a>

							<button
								type="button"
								onClick={copyEmail}
								className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl font-michroma text-xs font-bold border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/10 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/20 transition-colors"
								title="Copiar dirección de correo"
							>
								{copiedEmail ? (
									<>
										<FiCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
										<span>Copiado</span>
									</>
								) : (
									<>
										<FiCopy className="h-4 w-4" />
										<span>Copiar</span>
									</>
								)}
							</button>
						</div>
					</div>
				</section>

				{/* Institutional Notice & Support */}
				<footer className="pt-6 border-t border-slate-300 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-black/60 dark:text-white/60 font-sans">
					<div>
						Animus Project LLC · Confidential Institutional Evaluation Environment · Protected under DTSA, Florida UTSA & 18 U.S.C. § 1905
					</div>
					<div className="flex items-center gap-4">
						<a
							href="mailto:review@animusproject.org"
							className="hover:text-black dark:hover:text-white transition-colors"
						>
							review@animusproject.org
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
				</footer>
			</div>

			{/* Modal for Direct Package Downloads */}
			{modalInfo && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
					<div className="glass-panel w-full max-w-lg p-6 sm:p-8 border border-slate-300/80 dark:border-white/20 bg-white dark:bg-[#111116] rounded-3xl shadow-2xl space-y-5">
						<div className="flex items-start justify-between gap-3">
							<h3 className="text-xl font-bold font-michroma text-black dark:text-white">
								Descarga: {modalInfo.appName}
							</h3>
							<button
								type="button"
								onClick={() => setModalInfo(null)}
								className="p-2 rounded-xl text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition"
								aria-label="Cerrar ventana"
							>
								<FiX className="h-5 w-5" />
							</button>
						</div>

						<p className="text-xs sm:text-sm text-black/80 dark:text-white/80 font-sans leading-relaxed">
							Los paquetes binarios de evaluación (APK firmados para Android y binarios nativos para Linux/Windows) están disponibles para sideloading directo y pruebas aisladas en hardware evaluador.
						</p>

						<div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-xs font-sans text-black/70 dark:text-white/70">
							Para recibir el enlace de sideloading o paquete firmado con certificados de prueba del comité, solicita el archivo directamente a{" "}
							<strong className="text-black dark:text-white font-mono">review@animusproject.org</strong> o prueba la versión web activa de inmediato.
						</div>

						<div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
							<a
								href={modalInfo.webUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-michroma text-xs font-bold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-sm"
							>
								<span>Abrir Versión Web Activa</span>
								<FiArrowUpRight className="h-4 w-4" />
							</a>

							<a
								href={`mailto:review@animusproject.org?subject=Solicitud%20de%20Build%20Evaluador%20-%20${encodeURIComponent(modalInfo.appName)}`}
								className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-michroma text-xs font-bold border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/10 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/20 transition-colors"
							>
								<FiMail className="h-4 w-4" />
								<span>Solicitar Binario</span>
							</a>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
