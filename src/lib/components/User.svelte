<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '$lib/client/firebase';

	export let user: {
		initials: string;
		displayName: string;
		email: string;
	};
	const { initials, displayName, email } = user;
	// export let initials: string;
	// export let displayName: string;
	// export let email: string;
</script>

{#if $page.data.userSession}
	<div>
		(User)
		<div>
			<div>{initials}</div>
			<div>{displayName}</div>
			<div>{email}</div>
		</div>
		<div>
			<button
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
				on:click={() => signOut()}
			>
				Sign Out
			</button>
		</div>
	</div>
{/if}
