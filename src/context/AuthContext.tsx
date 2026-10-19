"use client";

import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	onIdTokenChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut as firebaseSignOut,
	type User,
} from "firebase/auth";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { auth, googleProvider } from "@/lib/firebase";
import {
	clearSharedSession,
	getSharedSession,
	setSharedSession,
	type SharedSessionData,
} from "@/lib/cookieAuth";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	signInWithGoogle: () => Promise<void>;
	signInWithEmail: (email: string, pass: string) => Promise<void>;
	signUpWithEmail: (email: string, pass: string) => Promise<void>;
	logout: () => Promise<void>;
	getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	signInWithGoogle: async () => {},
	signInWithEmail: async () => {},
	signUpWithEmail: async () => {},
	logout: async () => {},
	getIdToken: async () => null,
});

function createSyntheticUser(session: SharedSessionData): any {
	return {
		uid: session.uid,
		email: session.email,
		displayName: session.displayName,
		photoURL: session.photoURL,
		getIdToken: async () => session.token,
		metadata: {
			creationTime: new Date(session.updatedAt).toUTCString(),
			lastSignInTime: new Date(session.updatedAt).toUTCString(),
		},
	};
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Eagerly hydrate from shared session cookie if present
		const initialSession = getSharedSession();
		if (initialSession) {
			setUser(createSyntheticUser(initialSession));
			setLoading(false);
		}

		// Listen to token changes and auth state
		const syncToken = async (currentUser: User | null) => {
			if (currentUser) {
				setUser(currentUser);
				setLoading(false);
				try {
					const token = await currentUser.getIdToken();
					setSharedSession({
						uid: currentUser.uid,
						email: currentUser.email,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
						token,
						updatedAt: Date.now(),
					});
				} catch (err) {
					console.error("Failed to sync ID token to shared session:", err);
				}
			} else {
				const cookieSession = getSharedSession();
				if (cookieSession) {
					setUser(createSyntheticUser(cookieSession));
				} else {
					setUser(null);
				}
				setLoading(false);
			}
		};

		const unsubAuth = onAuthStateChanged(auth, syncToken);
		const unsubToken = onIdTokenChanged(auth, syncToken);

		return () => {
			unsubAuth();
			unsubToken();
		};
	}, []);

	const signInWithGoogle = async () => {
		try {
			const cred = await signInWithPopup(auth, googleProvider);
			if (cred?.user) {
				const token = await cred.user.getIdToken();
				setSharedSession({
					uid: cred.user.uid,
					email: cred.user.email,
					displayName: cred.user.displayName,
					photoURL: cred.user.photoURL,
					token,
					updatedAt: Date.now(),
				});
				setUser(cred.user);
			}
		} catch (error) {
			console.error("Google sign-in error:", error);
			throw error;
		}
	};

	const signInWithEmail = async (email: string, pass: string) => {
		try {
			const cred = await signInWithEmailAndPassword(auth, email, pass);
			if (cred?.user) {
				const token = await cred.user.getIdToken();
				setSharedSession({
					uid: cred.user.uid,
					email: cred.user.email,
					displayName: cred.user.displayName,
					photoURL: cred.user.photoURL,
					token,
					updatedAt: Date.now(),
				});
				setUser(cred.user);
			}
		} catch (error) {
			console.error("Email sign-in error:", error);
			throw error;
		}
	};

	const signUpWithEmail = async (email: string, pass: string) => {
		try {
			const cred = await createUserWithEmailAndPassword(auth, email, pass);
			if (cred?.user) {
				const token = await cred.user.getIdToken();
				setSharedSession({
					uid: cred.user.uid,
					email: cred.user.email,
					displayName: cred.user.displayName,
					photoURL: cred.user.photoURL,
					token,
					updatedAt: Date.now(),
				});
				setUser(cred.user);
			}
		} catch (error) {
			console.error("Email sign-up error:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			clearSharedSession();
			await firebaseSignOut(auth);
			setUser(null);
		} catch (error) {
			console.error("Sign-out error:", error);
			clearSharedSession();
			setUser(null);
			throw error;
		}
	};

	const getIdToken = async () => {
		if (auth.currentUser) {
			const token = await auth.currentUser.getIdToken();
			const session = getSharedSession();
			if (session) {
				setSharedSession({ ...session, token, updatedAt: Date.now() });
			}
			return token;
		}
		const session = getSharedSession();
		return session ? session.token : null;
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				signInWithGoogle,
				signInWithEmail,
				signUpWithEmail,
				logout,
				getIdToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
