<script lang="ts">
	import GoogleSignIn from './Google.svelte';
	import AnonymousSignIn from './Anonymous.svelte';
</script>

<!-- Put here the various sign in options -->
<div>
	<div>
		<GoogleSignIn />
	</div>
	<div>
		<AnonymousSignIn />
	</div>
</div>
