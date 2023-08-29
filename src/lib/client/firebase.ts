import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Database } from '@firebase/database';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from '@firebase/database';
import {
	getAuth,
	signInWithRedirect,
	signOut as _signOut,
	GoogleAuthProvider,
	signInAnonymously,
	onIdTokenChanged
} from 'firebase/auth';
import { browser } from '$app/environment';
import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_FIREBASE_MEASUREMENT_ID
} from '$env/static/public';
import { invalidateAll } from '$app/navigation';

const clientCredentials: FirebaseOptions = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID,
	measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
};

export let app: FirebaseApp;
export let db: Firestore;
export let realDB: Database;

export function initFirebase() {
	if (!browser) {
		throw new Error("Can't use the Firebase client on the server.");
	}
	if (!app) {
		app = initializeApp(clientCredentials);
		db = getFirestore(app);
		realDB = getDatabase(app);
		listenForAuthChanges();
		console.log('Firebase has been initialized successfully');
	}
}

function providerFor(name: string) {
	switch (name) {
		case 'google':
			return new GoogleAuthProvider();
		default:
			throw 'unknown provider ' + name;
	}
}

export async function signInWith(name: string) {
	const auth = getAuth(app);
	console.log('signInWithRedirect');
	if (name == 'anon') {
		signInAnonymously(auth);
	} else {
		const provider = providerFor(name);
		await signInWithRedirect(auth, provider);
	}
}

export async function signOut() {
	const auth = getAuth(app);
	await _signOut(auth);
}

async function setToken(token: string) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({ token })
	};

	await fetch('/api/token', options);
}

function listenForAuthChanges() {
	const auth = getAuth(app);

	onIdTokenChanged(
		auth,
		async (user) => {
			console.log('onIdTokenChanged called');
			if (user) {
				const token = await user.getIdToken();
				console.log('onIdTokenChanged: token SET', token);
				await setToken(token);
			} else {
				console.log('onIdTokenChanged: token UNSET');
				await setToken('');
			}
			await invalidateAll();
		},
		(err) => console.error(err.message)
	);
}
