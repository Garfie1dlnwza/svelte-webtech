<section class="max-w-2xl px-6 py-20">
	<span
		class="mb-3 block text-xs font-bold tracking-[0.2em] text-slate-400 uppercase dark:text-slate-500"
	>
		SvelteKit Framework
	</span>

	<h1
		class="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white"
	>
		Routing Demo<span class="text-blue-600">.</span>
	</h1>

	<p class="mb-10 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
		A technical showcase of modern web patterns, focusing on speed, structure, and seamless
		transitions.
	</p>

	<div class="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each ['Basic Routing', 'Shared Layouts', 'Dynamic Paths', 'Server Loading'] as feature}
			<div class="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
				<div class="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
				{feature}
			</div>
		{/each}
	</div>

	<a
		href="/artists"
		class="group inline-flex items-center gap-2 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white"
	>
		<span>Explore Artists</span>
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
	</a>
</section>
