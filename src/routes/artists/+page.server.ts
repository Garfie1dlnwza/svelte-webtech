import type { PageServerLoad } from './$types';
import { apiClient } from '$lib/server/api-client';
export const load: PageServerLoad = async () => {
	const response = await apiClient.get('/api/artists');
	let artistsList = [];
	if (response.status === 200) {
		artistsList = response.data.data;
	}

	return {
		artists: artistsList
	};
};
