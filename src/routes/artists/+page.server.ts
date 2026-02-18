import type { PageServerLoad } from './$types';
import apiClient from '$lib/server/api-client.server';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const page = url.searchParams.get('page') || '1';
		const response = await apiClient.get(`/artists?page=${page}`); // เรียกข้อมูลจาก API GET /api/artists

		if (response.status === 200) {
			return {
				artists: response.data.data,
				pagination: response.data.meta
			};
		}
	} catch (err) {
		console.error('Error fetching artists:', err);
	}
};
