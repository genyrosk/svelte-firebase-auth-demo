<!-- Put here the loading indicator -->
<!-- This is where the sign in provider should redirect -->
<script lang="ts">
	/**
	 * this is an ephemeral page that will direct
	 * the user to the provider login
	 * which will then redirect back here
	 * then the page will redirect the user to the app
	 */
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { signInWith } from '$lib/client/firebase';
	import { app } from '$lib/client/firebase';
	import { getAuth, getRedirectResult } from 'firebase/auth';
	import { goto } from '$app/navigation';

	export let data: PageData;
	console.log('$page.data', $page.data);

	class BadProviderName extends Error {}

	const signInUserWithProvider = async () => {
		if (data.provider === 'google') {
			console.log('signInUserWithProvider: Google');
			await signInWith('google'); // requires redirect
		} else if (data.provider === 'anon') {
			console.log('signInUserWithProvider: Anonymous');
			await signInWith('anon'); // doesn't require redirect
			return await goto('/');
		} else {
			throw new BadProviderName();
		}
	};

	const loadRedirect = async () => {
		console.log('loadRedirect: start');
		// check if user is already signed in
		if ($page.data.userSession) {
			console.log('loadRedirect: user credentials have been found, goto root');
			return await goto('/');
		}

		// This page get loaded for 1 of 2 reasons:
		// 1. We're getting a redirect back from the Auth provider
		const auth = getAuth(app);
		const userCred = await getRedirectResult(auth);
		console.log('loadRedirect: userCred:', userCred);
		if (userCred) {
			console.log('loadRedirect: user credentials have been found, goto root');
			userCred.providerId;
			return await goto('/');
		}

		// 2. We're getting routed here by the app from the login screen
		console.log('loadRedirect: sign user with provider:', data.provider);
		return await signInUserWithProvider();
	};

	const loading = loadRedirect();
</script>

<div>
	{#await loading}
		<div>Loading...</div>
	{:then}
		<p>Redirecting</p>
	{:catch error}
		{#if error instanceof BadProviderName}
			<div>
				<p>
					Seems like you've inficated a bad Provider.
					<a href="/login">Take me back to the login page</a>
				</p>
			</div>
		{:else}
			<div>
				<p>
					Oops, something went wrong.
					<a href="/">Return home</a>
				</p>
			</div>
		{/if}
	{/await}
</div>
