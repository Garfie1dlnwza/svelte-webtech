<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	let price = $state(1000);

	// เรียกใช้ Function ที่ถูกส่งมาจาก +page.ts
	// $derived ใช้สำหรับสร้าง reactive value ที่คำนวณจาก state อื่น
	let finalPrice = $derived(data.calculateFinalPrice(price));
</script>

<div class="mx-auto max-w-md space-y-4 rounded-xl bg-white p-8 shadow-md">
	<h1 class="text-2xl font-bold text-gray-900">ระบบคำนวณราคาพิเศษ</h1>
	<p class="text-gray-500">ส่วนลดพิเศษสำหรับสมาชิก </p>

	<div>
		<label for="price" class="block text-sm font-medium text-gray-700">ราคาตั้งต้น</label>
		<div class="relative mt-1 rounded-md shadow-sm">
			<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<span class="text-gray-500 sm:text-sm">฿</span>
			</div>
			<input
				type="number"
				name="price"
				id="price"
				bind:value={price}
				class="block w-full rounded-md border-gray-300 pr-12 pl-7 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="0.00"
			/>
		</div>
	</div>

	<div class="rounded-lg bg-indigo-50 p-4">
		<p class="text-sm font-medium text-indigo-700">ราคาหลังหักส่วนลด:</p>
		<p class="text-3xl font-bold text-indigo-900">฿{finalPrice.toFixed(2)}</p>
	</div>
</div>
