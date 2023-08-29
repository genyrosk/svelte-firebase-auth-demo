import admin, { type ServiceAccount } from 'firebase-admin';
import { FIREBASE_SERVICE_ACCOUNT } from '$env/static/private';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

function initializeFirebaseAdmin() {
	if (!admin.apps.length) {
		console.info('Initialize Firebase Admin');
		const serviceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT);
		// needed when loading from an environment variable
		serviceAccount.private_key = serviceAccount.private_key
			? serviceAccount.private_key.replace(/\\n/gm, '\n')
			: undefined;
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
		});
	}
}

export async function decodeToken(token: string): Promise<DecodedIdToken | null> {
	if (!token || token === 'null' || token === 'undefined') return null;
	try {
		initializeFirebaseAdmin();
		const decoded = await admin.auth().verifyIdToken(token);
		return decoded;
	} catch (err) {
		console.error('Failed to decode Token');
		console.error(err);
		return null;
	}
}
