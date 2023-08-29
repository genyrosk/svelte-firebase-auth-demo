declare const { UserSession }: import('$lib/models/types');
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			userSession: DecodedIdToken | undefined;
		}
		interface PageData {
			userSession?: DecodedIdToken;
		}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
