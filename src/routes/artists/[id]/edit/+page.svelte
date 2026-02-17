<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData, ActionData } from './$types';
    import { goto } from '$app/navigation'

    const { data, form } : {data: PageData, form: ActionData } = $props();
    const { artist } = data;
    
    let previewUrl: string | null = $state(artist.image_path);
    let isSubmitting = $state(false)
    
    const handleFileChange = (e: Event) => {
        const input = e.target as HTMLInputElement;
        if (input.files?.[0]) {
            previewUrl = URL.createObjectURL(input.files[0]);
        }
    };
    
    function handleSubmit() {
        isSubmitting = true;
        
        return async ({ update }) => {
            await update();
            isSubmitting = false;
        }
        
    }
</script>

<div class="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-white">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-bold">Edit Artist</h1>
        <a href="/artists/{artist.id}" class="text-sm text-gray-500 hover:text-blue-600">Cancel</a>
    </div>

    <form 
        method="POST" 
        enctype="multipart/form-data" 
        use:enhance={handleSubmit} 
        class="space-y-4"
    >
        <div>
            <label for="name" class="block mb-1 font-medium">Name</label>
            <input 
                type="text" 
                name="name"
                disabled={isSubmitting}
                value={form?.data?.name ?? artist.name}
                class="w-full p-2 border rounded"
            />
            {#if form?.errors?.name}
                <p class="text-red-500 text-sm mt-1">{form.errors.name[0]}</p>
            {/if}
        </div>

        <div>
            <label for="image" class="block mb-1 font-medium">Profile Image</label>
            
            <div class="mb-3">
                {#if previewUrl}
                    <img src={previewUrl} alt="Preview" class="w-24 h-24 object-cover rounded-lg border" />
                {:else}
                    <div class="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border">No Image</div>
                {/if}
            </div>

            <input 
                type="file" 
                name="image"
                accept="image/*"
                onchange={handleFileChange}
                disabled={isSubmitting}
                class="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {#if form?.errors?.image}
                <p class="text-red-500 text-sm mt-1">{form.errors.image[0]}</p>
            {/if}
        </div>

        <button 
            type="submit" 
            disabled={isSubmitting}
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
            {isSubmitting ? 'Updating...' : 'Update Artist'}
        </button>
    </form>
</div>
