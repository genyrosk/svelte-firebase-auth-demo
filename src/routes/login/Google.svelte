<script lang="ts">
	import Button from './Button.svelte';
	import GoogleLogo from './GoogleLogo.svelte';
</script>

<Button href="login/load?provider=google">
	<div class="flex content-between">
		<GoogleLogo class="mr-2 w-6 h-6" />Sign in with Google
	</div>
</Button>
