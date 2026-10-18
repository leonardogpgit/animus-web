"use client";

import { useEffect } from "react";

export default function SignupPage() {
	useEffect(() => {
		window.location.href = "https://app.animusproject.org/login";
	}, []);

	return (
		<div className="flex min-h-[60vh] items-center justify-center text-center p-4">
			<p className="font-michroma text-sm text-black dark:text-white">
				Redirecting to Access Animus Project...
			</p>
		</div>
	);
}
