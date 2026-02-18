<script lang="ts">
	import type { PageProps, SubmitFunction } from './$types';
	import { enhance } from '$app/forms';
	let { data }: PageProps = $props();
	let artist = $derived(data.artist);

	let isDeleting = $state(false);

	const handleDelete: SubmitFunction = ({ cancel }) => {
		const confirmed = confirm(`Are you sure you want to delete "${artist.name}"?`);

		if (!confirmed) {
			cancel();
			return;
		}

		isDeleting = true;

		return async ({ update }) => {
			await update();
			isDeleting = false;
		};
	};
</script>

<div class="mx-auto max-w-4xl px-4 py-10">
	<div
		class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:flex-row"
	>
		<!-- <div class="w-full md:w-80 h-80 bg-slate-100 shrink-0 relative">
            {#if artist.image_path}
                <img 
                    src={artist.image_path} 
                    alt={artist.name} 
                    class="w-full h-full object-cover" 
                />
            {:else}
                <div class="w-full h-full flex items-center justify-center text-slate-400">
                    <span class="text-sm">No Image</span>
                </div>
            {/if}
        </div> -->

		<div class="flex w-full flex-col justify-center p-8">
			<div class="mb-4 flex items-start justify-between">
				<div>
					<h1 class="mb-2 text-4xl font-bold tracking-tight text-slate-900">
						{artist.name}
					</h1>
					<span
						class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
					>
						Artist
					</span>
				</div>

				<span class="rounded border bg-slate-50 px-2 py-1 font-mono text-xs text-slate-400">
					ID: {artist.id}
				</span>
			</div>

			<div class="mt-6 flex gap-3">
				<a
					href="/artists/{artist.id}/edit"
					class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
				>
					Edit Artist
				</a>
			</div>
		</div>
	</div>
</div>

<form action="?/delete" method="POST" use:enhance={handleDelete}>
	<button
		type="submit"
		disabled={isDeleting}
		class="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:bg-red-300"
	>
		{#if isDeleting}
			<svg
				class="h-4 w-4 animate-spin text-white"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle><path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path></svg
			>
			Deleting...
		{:else}
			Delete Artist
		{/if}
	</button>
</form>
