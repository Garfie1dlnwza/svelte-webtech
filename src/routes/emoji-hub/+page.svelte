<script lang="ts">
	import type { PageProps } from './$types';

	// รับ "กล่องข้อมูล" (data) ที่ส่งมา +page.ts ด้วยคำสั่ง $props()
	let { data }: PageProps = $props();

	// สร้าง state สำหรับหน้าปัจจุบัน
	let currentPage = $state(1);

	// ดึงฟังก์ชันและข้อมูลอื่น ๆ ออกจาก data prop
	const { getEmojisByPage, totalEmojis, pageSize } = data;

	// สร้างข้อมูล emojis จาก getEmojisByPage โดยอ้างอิง currentPage
	// เมื่อ currentPage เปลี่ยน ค่า emojis นี้จะเปลี่ยนตาม
	let emojis = $derived(getEmojisByPage(currentPage));

	// คำนวณจำนวนหน้าทั้งหมด
	const totalPages = Math.ceil(totalEmojis / pageSize);

	function goToNextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function goToPrevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}
</script>

<div class="container mx-auto p-4">
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each emojis as emoji}
			<div
				class="flex min-h-[150px] flex-col items-center justify-between rounded border border-gray-100 bg-white p-4 text-center shadow transition-shadow hover:shadow-lg"
			>
				<div class="mb-2 text-5xl">{@html emoji.htmlCode[0]}</div>
				<h3 class="w-full truncate font-bold text-gray-700" title={emoji.name}>{emoji.name}</h3>
				<p class="text-xs text-gray-500">{emoji.category} - {emoji.group}</p>
			</div>
		{/each}
	</div>

	<!-- Pagination Controls -->
	<div class="mt-8 flex items-center justify-center space-x-4">
		<button
			onclick={goToPrevPage}
			disabled={currentPage === 1}
			class="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
		>
			Previous
		</button>

		<span class="font-medium text-gray-700">
			Page {currentPage} of {totalPages} (Total: {totalEmojis})
		</span>

		<button
			onclick={goToNextPage}
			disabled={currentPage === totalPages}
			class="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
		>
			Next
		</button>
	</div>
</div>
