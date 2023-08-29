<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '$lib/client/firebase';
</script>

<div class="flex flex-col items-start">
	(Auth)
	{#if $page.data.userSession}
		<button
			type="button"
			class="btn text-gray-900 hover:text-white border border-gray-800
			 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300
			 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
			on:click={() => signOut()}>Sign Out</button
		>
		<div>
			<div>
				{$page.data.userSession.name} ({$page.data.userSession.email})
			</div>
			<div>
				Provider: {$page.data.userSession.firebase.sign_in_provider}
			</div>
		</div>
	{:else}
		<a data-sveltekit-preload-code="eager" href="/login">
			<div
				class="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
				focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
			>
				Sign in or Create an Account
			</div>
		</a>
	{/if}
</div>
