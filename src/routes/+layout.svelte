<script lang="ts">
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';
    import MainMenu from '$lib/components/main-menu.svelte'

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>MyBrand | Minimal Demo</title>
</svelte:head>

<div class="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 dark:bg-slate-950 dark:text-slate-100">
    
    <MainMenu brand="MyBrand" />

    <main class="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div class="animate-in fade-in slide-in-from-bottom-2 duration-700">
            {@render children()}
        </div>
    </main>

    <div class="h-[100vh] opacity-0 pointer-events-none">
        Spacer for scroll testing
    </div>
</div>

<style>
    /* Custom Selection Color for that "Minimalist" touch */
    :global(::selection) {
        background: #dbeafe; /* blue-100 */
        color: #1e3a8a; /* blue-900 */
    }
    
    :global(.dark ::selection) {
        background: #1e3a8a;
        color: #dbeafe;
    }
</style>