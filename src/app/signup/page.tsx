"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/login");
	}, [router]);

	return (
		<div className="flex min-h-[60vh] items-center justify-center text-center p-4">
			<p className="font-michroma text-sm text-black dark:text-white">
				Cargando formulario de acceso...
			</p>
		</div>
	);
}
