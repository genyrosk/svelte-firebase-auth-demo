<script lang="ts">
	import '../app.css';
	import { Auth, User } from '$lib/components';

	export let data;
	console.log('App layout data:', data);

	import type { User as FirebaseUser } from 'firebase/auth';
	import { browser } from '$app/environment';
	import { app, initFirebase } from '$lib/client/firebase';
	import { userStore } from '$lib/stores';
	import { getAuth } from 'firebase/auth';

	let user: FirebaseUser | null;

	if (browser) {
		try {
			initFirebase();
			// Firebase app should be initialized now
			const auth = getAuth(app);
			let userSub = userStore(auth);
			userSub.subscribe((value) => {
				user = value;
			});
		} catch (err) {
			console.error(err);
		}
	}
</script>

<div>
	<Auth />
	{#if data.user}
		<User user={data.user} />
	{/if}
	<slot />
</div>
