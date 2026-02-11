import type { PageServerLoad } from './$types';
import { apiClient } from '$lib/server/api-client';
export const load: PageServerLoad = async () => {
	const response = await apiClient.get('/api/artists');
	let artistsList = [];
	let pagination = null 
	if (response.status === 200) {
		artistsList = response.data.data;
		pagination = response.data.meta;

	}

	return {
		artists: artistsList,
		pagination : pagination
	};
};
