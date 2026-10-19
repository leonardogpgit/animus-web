"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/login?mode=signup");
	}, [router]);

	return (
		<div className="flex min-h-[60vh] items-center justify-center p-4">
			<div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-black dark:border-white/20 dark:border-t-white" />
		</div>
	);
}
