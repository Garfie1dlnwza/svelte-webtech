<script lang="ts">
	import type { PageProps } from './$types';
	let isSubmitting = $state(false);
	let { data } = $props();
	const { artist } = data;
</script>

<form method="POST">
	<div>
		<label for="name">Artist Name</label>
		<input type="text" id="name" name="name" value={artist.name} disabled={isSubmitting} />
	</div>

	<button type="submit" disabled={isSubmitting}>
		{#if isSubmitting}
			กำลังแก้ไข
		{:else}
			แก้ไขข้อมูล
		{/if}
	</button>
</form>
