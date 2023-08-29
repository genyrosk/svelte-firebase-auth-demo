import { decodeToken } from '$lib/server/firebase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('Server Hook');
	const token = event.cookies.get('token') || '';
	const decodedToken = await decodeToken(token);

	if (decodedToken) {
		event.locals.userSession = decodedToken;
	}

	console.log('Server Hook: decodedToken:', decodedToken);
	const response = await resolve(event);

	return response;
};
