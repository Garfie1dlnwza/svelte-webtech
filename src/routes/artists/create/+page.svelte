<script lang="ts">
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from './$types';
    import type { ActionData } from './$types';

    let { form }: { form: ActionData } = $props();

    let isSubmitting = $state(false);

    const handleSubmit: SubmitFunction = () => {
        isSubmitting = true;

        return async ({ update }) => {
            await update();

            isSubmitting = false;
        };
    };
</script>

<div class="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-white">
    <h1 class="text-xl font-bold mb-6">Create New Artist</h1>

    <form 
        method="POST" 
        enctype="multipart/form-data" 
        use:enhance={handleSubmit} 
        class="space-y-4"
    >
        
        <div>
            <label for="name" class="block mb-1 font-medium text-gray-700">Artist Name</label>
            <input 
                type="text" 
                name="name"
                disabled={isSubmitting} 
                value={form?.data?.name ?? ''}
                class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none
                       {form?.errors?.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}"
            />
            {#if form?.errors?.name}
                <p class="text-red-500 text-sm mt-1">{form.errors.name[0]}</p>
            {/if}
        </div>

        <div>
            <label for="image" class="block mb-1 font-medium text-gray-700">Profile Image</label>
            <input 
                type="file" 
                name="image"
                accept="image/*"
                disabled={isSubmitting}
                class="w-full p-2 border rounded bg-gray-50 text-sm
                       file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                       file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
            />
            {#if form?.errors?.image}
                <p class="text-red-500 text-sm mt-1">{form.errors.image[0]}</p>
            {/if}
        </div>

        <button 
            type="submit" 
            disabled={isSubmitting}
            class="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition disabled:bg-blue-300 flex justify-center items-center gap-2"
        >
            {#if isSubmitting}
                Saving...
            {:else}
                Save Artist
            {/if}
        </button>

        {#if form?.message}
            <div class="p-3 bg-red-100 text-red-700 rounded text-sm text-center">
                {form.message}
            </div>
        {/if}

    </form>
</div>
