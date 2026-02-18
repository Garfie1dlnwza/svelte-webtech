<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let isSubmitting = $state(false);

	const handleSubmit: SubmitFunction = () => {
		isSubmitting = true;

		return async ({ update }) => {
			await update();

			isSubmitting = false;
		};
	};
</script>

<div class="mx-auto mt-10 max-w-md rounded-lg border bg-white p-6 shadow-sm">
	<h1 class="mb-6 text-xl font-bold">Create New Artist</h1>

	<form method="POST" enctype="multipart/form-data" use:enhance={handleSubmit} class="space-y-4">
		<div>
			<label for="name" class="mb-1 block font-medium text-gray-700">Artist Name</label>
			<input
				type="text"
				name="name"
				disabled={isSubmitting}
				value={form?.data?.name ?? ''}
				class="w-full rounded border p-2 outline-none focus:ring-2 focus:ring-blue-500
                       {form?.errors?.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}"
			/>
			{#if form?.errors?.name}
				<p class="mt-1 text-sm text-red-500">{form.errors.name[0]}</p>
			{/if}
		</div>

		

		<button
			type="submit"
			disabled={isSubmitting}
			class="flex w-full items-center justify-center gap-2 rounded bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 disabled:bg-blue-300"
		>
			{#if isSubmitting}
				Saving...
			{:else}
				Save Artist
			{/if}
		</button>

		{#if form?.message}
			<div class="rounded bg-red-100 p-3 text-center text-sm text-red-700">
				{form.message}
			</div>
		{/if}
	</form>
</div>
