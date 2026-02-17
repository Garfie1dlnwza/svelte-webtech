<script lang="ts">
    import type { PageProps, SubmitFunction } from './$types';
    import { enhance } from '$app/forms';
    let { data }: PageProps = $props();
    let artist = $derived(data.artist);
    
    let isDeleting = $state(false);
    
    const handleDelete: SubmitFunction = ({ cancel }) => {
        const confirmed = confirm(`คุณแน่ใจหรือไม่ที่จะลบ "${artist.name}"?`);
        
        if (!confirmed) {
            cancel();
            return;
        }

        isDeleting = true;

        return async ({ update }) => {
            await update(); 
            isDeleting = false;
        };
    };
</script>

<div class="max-w-4xl mx-auto py-10 px-4">
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        <div class="w-full md:w-80 h-80 bg-slate-100 shrink-0 relative">
            {#if artist.image_path}
                <img 
                    src={artist.image_path} 
                    alt={artist.name} 
                    class="w-full h-full object-cover" 
                />
            {:else}
                <div class="w-full h-full flex items-center justify-center text-slate-400">
                    <span class="text-sm">No Image</span>
                </div>
            {/if}
        </div>

        <div class="p-8 flex flex-col justify-center w-full">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h1 class="text-4xl font-bold text-slate-900 tracking-tight mb-2">
                        {artist.name}
                    </h1>
                    <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                        Artist
                    </span>
                </div>
                
                <span class="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded border">
                    ID: {artist.id}
                </span>
            </div>

            <div class="mt-auto pt-6 border-t border-slate-100">
                <p class="text-xs text-slate-400 break-all">
                    <span class="font-semibold text-slate-500">Source:</span> {artist.image_path}
                </p>
            </div>
            
            <div class="mt-6 flex gap-3">
                <a 
                    href="/artists/{artist.id}/edit" 
                    class="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition text-sm font-medium"
                >
                    Edit Artist
                </a>
            </div>
        </div>
    </div>
</div>

<form 
    action="?/delete" 
    method="POST" 
    use:enhance={handleDelete}
>
    <button 
        type="submit" 
        disabled={isDeleting}
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300 transition-colors flex items-center gap-2"
    >
        {#if isDeleting}
            <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Deleting...
        {:else}
            Delete Artist
        {/if}
    </button>
</form>
