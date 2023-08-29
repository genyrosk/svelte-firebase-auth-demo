<script lang="ts">
	export let href: string;
	let clazz: string = '';
	export { clazz as class };
</script>

<a
	type="button"
	class="btn bg-initial px-5 py-2.5 flex justify-center
        mr-2 mb-2 bg-white border border-gray-300 hover:border-gray-500 font-medium rounded-lg
        hover:bg-gray-200 {clazz || ''}"
	{href}
>
	<slot />
</a>
