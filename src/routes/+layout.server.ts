import type { LayoutServerLoad } from './$types';
import { getAuth } from 'firebase-admin/auth';
import type { UserInfo } from '$lib/models/types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { userSession } = locals;
	console.log('Root layout load:', userSession);

	if (!userSession) {
		return {};
	}

	const userRecord = await getAuth().getUser(userSession.uid);
	const { displayName, email, photoURL } = userRecord;

	const nomens = (displayName || '').split(' ');
	const initials =
		nomens.length > 1
			? (nomens?.at(0)?.at(0) || '').concat(nomens?.at(1)?.at(0) || '')
			: nomens?.at(0)?.slice(0, 2) || '';

	const user: UserInfo = {
		displayName: displayName || '',
		email: email || '',
		photoURL,
		initials
	};

	return { userSession, user };
};
