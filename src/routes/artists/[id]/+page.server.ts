import type { PageServerLoad } from './$types';
import { apiClient } from '$lib/server/api-client';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;

	const response = await apiClient.get(`/api/artists/${id}`);
	let artist = null;
	try {
		if (response.status === 200) {
			artist = response.data.data;
		}
	} catch (err: any) {
		if (err.response.status === 404) {
			artist = null;
		}
	}

	return {
		artist
	};
};
