<script lang="ts">
	import { page } from '$app/stores';
	import { globalCounter } from '$lib/stores/counter.svelte';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import ThemeToggle from './theme-toggle.svelte';
	let { brand } = $props();

	function getLinkClass(path: string) {
		const currentPath = $page.url.pathname;
		const isActive = path === '/' ? currentPath === '/' : currentPath.startsWith(path);

		return `px-3 py-1.5 text-sm transition-colors duration-200 ${
			isActive
				? 'text-black dark:text-white font-medium'
				: 'text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
		}`;
	}

	onMount(() => {
		const isDark =
			document.documentElement.classList.contains('dark') ||
			localStorage.getItem('theme') === 'dark';
		theme.set(isDark);
	});

	$effect(() => {
		const isDark = theme.isDark;
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	});
</script>

<nav
	class="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/70 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/70"
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
		<a href="/" class="group flex items-center gap-2">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 transition-transform group-hover:scale-95 dark:bg-white"
			>
				<svg
					class="h-5 w-5 text-white dark:text-slate-900"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="m2 17 10 5 10-5" />
				</svg>
			</div>
			<span class="text-sm font-bold tracking-widest text-slate-900 uppercase dark:text-white">
				{brand}
			</span>
		</a>

		<ul class="hidden items-center gap-2 md:flex">
			<li><a href="/" class={getLinkClass('/')}>Home</a></li>
			<li><a href="/directory" class={getLinkClass('/directory')}>Directory</a></li>
			<li><a href="/artists" class={getLinkClass('/artists')}>Artists</a></li>
			<li><a href="/shop" class={getLinkClass('/shop')}>Shop</a></li>
			<li><a href="/emoji-hub" class={getLinkClass('/emoji-hub')}>Emoji Hub</a></li>
			<li><a href="/contact" class={getLinkClass('/contact')}>Contact</a></li>
			<li><a href="/add" class={getLinkClass('/add')}>Add</a></li>
		</ul>

		<div class="flex items-center gap-6">
			<div
				class="hidden items-center gap-4 border-r border-slate-200 pr-6 md:flex dark:border-slate-800"
			>
				<ThemeToggle />
				<span class="font-mono text-xs text-slate-400">Count:{globalCounter.count}</span>
			</div>

			<a
				href="/login"
				class="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
			>
				Log in
			</a>
			<a
				href="/signup"
				class="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
			>
				Join
			</a>
		</div>
	</div>
</nav>
