<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	let isModalOpen = $state(false);

	let email = $state('');
	let message = $state('');

	let maxChars = 200;
	let remainingChars = $derived(maxChars - message.length);

	let counterColor = $derived(remainingChars < 20 ? 'text-red-500' : 'text-gray-400');

	function handleSubmit(e: Event) {
		e.preventDefault();
		console.log(`Sending to ${email}: ${message}`);

		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		message = '';
		email = '';
	}

	$effect(() => {
		if (message.length > 0) {
			document.title = 'Typing...';
		} else {
			document.title = 'Contact Us';
		}
	});
</script>

<div class="mx-auto max-w-3xl py-10">
	<header class="mb-12">
		<h1
			class="mb-2 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase dark:text-slate-500"
		>
			Get in Touch
		</h1>
		<h2 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
			Contact Us<span class="text-blue-600">.</span>
		</h2>
	</header>

	<div class="max-w-xl">
		<p class="mb-8 text-lg text-slate-500 dark:text-slate-400">
			Have something to say? We'd love to hear from you. Send us a message and we'll reply as soon
			as possible.
		</p>

		<form onsubmit={handleSubmit} class="space-y-8">
			<div class="group relative">
				<label
					for="email"
					class="mb-2 block text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
				>
					Your Email
				</label>
				<input
					type="email"
					id="email"
					required
					bind:value={email}
					class="peer block w-full border-b-2 border-slate-200 bg-transparent py-3 text-lg text-slate-900 placeholder-slate-300 transition-colors focus:border-slate-900 focus:outline-none dark:border-slate-800 dark:text-white dark:focus:border-white"
					placeholder="you@example.com"
				/>
			</div>

			<div class="group relative">
				<div class="mb-2 flex items-center justify-between">
					<label
						for="message"
						class="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
					>
						Message
					</label>
					<span class={`${counterColor} text-[10px] font-bold tracking-wider uppercase`}>
						{remainingChars} chars left
					</span>
				</div>
				<textarea
					id="message"
					rows="4"
					required
					bind:value={message}
					class="peer block w-full rounded-none border-b-2 border-slate-200 bg-transparent py-3 text-lg text-slate-900 placeholder-slate-300 transition-colors focus:border-slate-900 focus:outline-none dark:border-slate-800 dark:text-white dark:focus:border-white"
					placeholder="Type your message here..."
				></textarea>
			</div>

			<button
				type="submit"
				class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-white dark:text-slate-900"
			>
				Send Message
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M14 5l7 7m0 0l-7 7m7-7H3"
					/>
				</svg>
			</button>
		</form>
	</div>
</div>

{#if isModalOpen}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
		onclick={closeModal}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
	>
		<div
			transition:fly={{ y: 20, duration: 300 }}
			class="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl"
			onclick={(e) => e.stopPropagation()}
			role="document"
		>
			<div
				class="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-green-400 to-emerald-500"
			></div>

			<div
				class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
			>
				<svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>

			<h3 class="mb-2 text-xl font-bold text-slate-900">Success!</h3>
			<p class="mb-6 text-slate-500">
				Thanks for reaching out! We've received your message and will get back to you shortly.
			</p>

			<button
				onclick={closeModal}
				class="inline-flex w-full justify-center rounded-lg border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none sm:text-sm"
			>
				OK, Got it
			</button>
		</div>
	</div>
{/if}
