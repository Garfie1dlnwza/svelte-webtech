<script lang="ts">
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
	const { artist } = data;
</script>

<div class="rounded border p-4 shadow">
	<h1 class="mb-4 text-2xl font-bold">Artist Details</h1>
	<p class="text-lg"><strong>ID:</strong> {artist.id}</p>
	<p class="text-lg"><strong>Name:</strong> {artist.name}</p>

	<div class="mt-4">
		<a href="{artist.id}/edit" class="text-blue-500 hover:underline">แก้ไขข้อมูล</a>
	</div>
</div>
