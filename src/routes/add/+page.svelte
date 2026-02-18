<script lang="ts">
	import { globalCounter } from '$lib/stores/counter.svelte';
</script>

<div class="mx-auto max-w-3xl py-10">
	<header class="mb-12">
		<h1
			class="mb-2 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase dark:text-slate-500"
		>
			State Management
		</h1>
		<h2 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
			Global Counter<span class="text-blue-600">.</span>
		</h2>
	</header>

	<div class="flex gap-4">
		<button
			onclick={() => globalCounter.increment()}
			class="rounded-lg bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95 dark:bg-white dark:text-slate-900"
		>
			Increment
		</button>
		<button
			onclick={() => globalCounter.decrement()}
			class="rounded-lg border border-slate-200 px-6 py-3 text-sm font-bold text-slate-900 transition-transform hover:scale-105 hover:bg-slate-50 active:scale-95 dark:border-slate-800 dark:text-white dark:hover:bg-slate-900"
		>
			Decrement
		</button>
	</div>
</div>
