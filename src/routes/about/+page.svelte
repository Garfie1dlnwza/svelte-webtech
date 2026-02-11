<script lang="ts">
	import { globalCounter } from '$lib/stores/counter.svelte';
</script>

<div>
	<button onclick={() => globalCounter.increment()} class="rounded bg-blue-500 px-4 py-2 text-white">เพิ่ม</button>
</div>
