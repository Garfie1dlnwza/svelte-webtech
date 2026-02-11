<script lang="ts">
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
	const { artists } = data;
</script>

<h1 class="mb-6 text-2xl font-bold">รายชื่อศิลปิน</h1>

<ul>
	{#each artists as artist}
		<li class="mb-4 rounded border p-4 shadow-sm transition-shadow hover:shadow-md">
			<h2 class="text-xl font-bold">
				<a href={`/artists/${artist.id}`} class="text-blue-600 hover:underline">{artist.name}</a>
			</h2>
		</li>
	{/each}
</ul>
