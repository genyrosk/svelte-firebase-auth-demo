import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = ({ url }) => {
	console.log('/login/load +page:load => PageLoad', { url });

	const provider = url.searchParams.get('provider');
	return {
		provider
	};
};
