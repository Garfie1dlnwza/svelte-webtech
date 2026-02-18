<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	let price = $state(1000);

	// เรียกใช้ Function ที่ถูกส่งมาจาก +page.ts
	// $derived ใช้สำหรับสร้าง reactive value ที่คำนวณจาก state อื่น
	let finalPrice = $derived(data.calculateFinalPrice(price));
</script>

<div class="mx-auto max-w-3xl py-10">
	<header class="mb-12">
		<h1
			class="mb-2 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase dark:text-slate-500"
		>
			Commerce
		</h1>
		<h2 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
			Shop<span class="text-blue-600">.</span>
		</h2>
	</header>

	<div class="max-w-xl">
		<div class="mb-10">
			<label
				for="price"
				class="mb-2 block text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
			>
				Base Price
			</label>
			<div class="group relative">
				<div
					class="absolute inset-y-0 left-0 flex items-center pt-1 text-lg font-bold text-slate-400"
				>
					฿
				</div>
				<input
					type="number"
					name="price"
					id="price"
					bind:value={price}
					class="peer block w-full border-b-2 border-slate-200 bg-transparent py-2 pl-6 text-3xl font-bold text-slate-900 placeholder-slate-200 transition-colors focus:border-slate-900 focus:outline-none dark:border-slate-800 dark:text-white dark:focus:border-white"
					placeholder="0.00"
				/>
			</div>
			<p class="mt-4 text-sm text-slate-500">
				Enter the base price to calculate the special member discount.
			</p>
		</div>

		<div class="border-l-4 border-blue-600 pl-6">
			<p class="text-xs font-bold tracking-wider text-slate-500 uppercase">Final Price</p>
			<div class="mt-1 flex items-baseline gap-2">
				<span class="text-4xl font-extrabold text-slate-900 dark:text-white">
					฿{finalPrice.toFixed(2)}
				</span>
				<span class="text-sm font-medium text-slate-400 line-through">
					฿{price.toFixed(2)}
				</span>
			</div>
			<p class="mt-2 text-sm text-blue-600">Includes special membership discount.</p>
		</div>
	</div>
</div>
