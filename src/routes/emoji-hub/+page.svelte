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

<div class="mx-auto max-w-5xl px-4 py-10">
	<header class="mb-12">
		<h1
			class="mb-2 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase dark:text-slate-500"
		>
			Fun Zone
		</h1>
		<h2 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
			Emoji Hub<span class="text-blue-600">.</span>
		</h2>
	</header>

	<div
		class="grid grid-cols-2 gap-px bg-slate-200 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 dark:bg-slate-800"
	>
		{#each emojis as emoji}
			<div
				class="group flex min-h-[160px] flex-col items-center justify-between bg-white p-6 transition-colors hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900"
			>
				<div class="mb-4 text-5xl transition-transform group-hover:scale-110">
					{@html emoji.htmlCode[0]}
				</div>
				<div class="w-full text-center">
					<h3 class="truncate text-sm font-bold text-slate-900 dark:text-white" title={emoji.name}>
						{emoji.name}
					</h3>
					<p class="mt-1 text-[10px] tracking-wide text-slate-400 uppercase">{emoji.group}</p>
				</div>
			</div>
		{/each}
	</div>

	<!-- Pagination Controls -->
	<div
		class="mt-12 flex items-center justify-between border-t border-slate-100 pt-8 dark:border-slate-900"
	>
		<button
			onclick={goToPrevPage}
			disabled={currentPage === 1}
			class="group flex items-center gap-2 text-xs font-bold tracking-widest text-slate-900 uppercase disabled:cursor-not-allowed disabled:opacity-20 dark:text-white"
		>
			<svg
				class="h-4 w-4 transition-transform group-hover:-translate-x-1"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2.5"
					d="M7 16l-4-4m0 0l4-4m-4 4h18"
				/>
			</svg>
			Previous
		</button>

		<span class="text-xs font-medium text-slate-400">
			<span class="text-slate-900 dark:text-white">{currentPage}</span>
			<span class="mx-1">/</span>
			{totalPages}
		</span>

		<button
			onclick={goToNextPage}
			disabled={currentPage === totalPages}
			class="group flex items-center gap-2 text-xs font-bold tracking-widest text-slate-900 uppercase disabled:cursor-not-allowed disabled:opacity-20 dark:text-white"
		>
			Next
			<svg
				class="h-4 w-4 transition-transform group-hover:translate-x-1"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2.5"
					d="M17 8l4 4m0 0l-4 4m4-4H3"
				/>
			</svg>
		</button>
	</div>
</div>
