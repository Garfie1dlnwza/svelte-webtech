<script lang="ts">
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { data }: PageProps = $props();
	// const departments = ['ทั้งหมด', 'วิศวกรรม', 'การตลาด', 'การจัดการ'];
	const departments = ['All', 'Engineering', 'Marketing', 'Management'];

	function updateFilter(key: string, value: string) {
		const newUrl = new URL($page.url);
		if (value && value !== 'All') {
			newUrl.searchParams.set(key, value);
		} else {
			newUrl.searchParams.delete(key);
		}
		goto(newUrl, { keepFocus: true, replaceState: true, noScroll: true });
	}
</script>

<div class="mx-auto max-w-3xl py-10">
	<header class="mb-12">
		<h1
			class="mb-2 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase dark:text-slate-500"
		>
			Team Directory
		</h1>
		<h2 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
			Our People<span class="text-blue-600">.</span>
		</h2>
	</header>

	<div class="mb-10 space-y-6">
		<div class="group relative">
			<input
				type="text"
				value={data.filters.q}
				oninput={(e) => updateFilter('q', e.currentTarget.value)}
				placeholder="Search by name..."
				class="w-full border-b border-slate-200 bg-transparent px-1 py-3 text-lg
                       transition-colors outline-none placeholder:text-slate-300 focus:border-slate-900 dark:border-slate-800
                       dark:placeholder:text-slate-700 dark:focus:border-white"
			/>
			<div
				class="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-900 transition-all duration-300 group-focus-within:w-full dark:bg-white"
			></div>
		</div>

		<div class="flex flex-wrap gap-3">
			{#each departments as d}
				<button
					onclick={() => updateFilter('dept', d)}
					class="text-xs font-bold tracking-widest uppercase transition-all
                           {data.filters.dept === d || (!data.filters.dept && d === 'All')
						? 'text-slate-900 underline decoration-2 underline-offset-8 dark:text-white'
						: 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}"
				>
					{d}
				</button>
			{/each}
		</div>
	</div>

	<div class="divide-y divide-slate-100 dark:divide-slate-900">
		{#if data.employees.length === 0}
			<div class="py-20 text-center text-sm font-medium text-slate-400">No results found.</div>
		{:else}
			{#each data.employees as emp (emp.id)}
				<div class="group animate-fade flex items-center justify-between py-6 transition-all">
					<div class="space-y-1">
						<h3
							class="text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white"
						>
							{emp.name}
						</h3>
						<p class="text-sm text-slate-500 dark:text-slate-400">
							{emp.role}
						</p>
					</div>
					<div class="text-right">
						<span
							class="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold tracking-tighter text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400"
						>
							{emp.dept}
						</span>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	@keyframes fade {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade {
		animation: fade 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards;
	}
</style>
