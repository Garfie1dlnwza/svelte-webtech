<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	let artists = $derived(data.artists);
	let pagination = $derived(data.pagination);
</script>

<div class="mx-auto max-w-3xl py-10">
	<header class="mb-12 flex items-center justify-between">
		<div>
			<h1
				class="mb-2 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase dark:text-slate-500"
			>
				Archive
			</h1>
			<h2 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
				Artists Index<span class="text-blue-600">.</span>
			</h2>
		</div>
		<a
			href="/artists/create"
			class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
		>
			Create New Artist
		</a>
	</header>

	<ul class="mb-12 divide-y divide-slate-100 dark:divide-slate-900">
		{#each artists as artist, i (artist.id)}
			<li class="group animate-fade transition-all" style="animation-delay: {i * 50}ms">
				<a
					href={`/artists/${artist.id}`}
					class="flex items-center justify-between py-8 transition-all group-hover:px-2"
				>
					<div class="flex items-baseline gap-4">
						<span class="font-mono text-[10px] text-slate-300 dark:text-slate-700">
							{artist.id.toString().padStart(3, '0')}
						</span>
						<h3
							class="text-xl font-medium text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white"
						>
							{artist.name}
						</h3>
					</div>
					<svg
						class="h-5 w-5 -translate-x-4 text-slate-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</a>
			</li>
		{/each}
	</ul>

	{#if pagination}
		<div
			class="mt-8 flex items-center justify-between border-t border-slate-100 pt-8 dark:border-slate-800"
		>
			<p class="text-sm text-slate-500 dark:text-slate-400">
				Showing <span class="font-medium text-slate-900 dark:text-white"
					>{pagination.from || 0}</span
				>
				to
				<span class="font-medium text-slate-900 dark:text-white">{pagination.to || 0}</span>
				of
				<span class="font-medium text-slate-900 dark:text-white">{pagination.total}</span>
				results
			</p>
			<div class="flex gap-2">
				<a
					href={pagination.current_page > 1 ? `?page=${pagination.current_page - 1}` : '#'}
					class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white {pagination.current_page <=
					1
						? 'pointer-events-none opacity-50'
						: ''}"
				>
					Previous
				</a>
				<a
					href={pagination.current_page < pagination.last_page
						? `?page=${pagination.current_page + 1}`
						: '#'}
					class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white {pagination.current_page >=
					pagination.last_page
						? 'pointer-events-none opacity-50'
						: ''}"
				>
					Next
				</a>
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes fade {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade {
		animation: fade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
	}
</style>
