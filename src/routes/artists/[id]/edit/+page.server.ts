import type { PageServerLoad, Actions } from './$types';
import { apiClient } from '$lib/server/api-client';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;
	const response = await apiClient.get(`/api/artists/${id}`);

	if (response.status === 200) {
		return {
			artist: response.data.data
		};
	}

	throw error(404, 'Artist not found');
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const id = params.id;

		try {
			await apiClient.put(`/api/artists/${id}`, {
				name
			});
		} catch (err) {
			console.error('Error updating artist:', err);
			return fail(500, {
				message: 'Failed to update artist'
			});
		}

		throw redirect(303, `/artists/${id}`);
	}
};
