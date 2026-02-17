import type { PageServerLoad } from './$types';
import apiClient from '$lib/server/api-client.server';

export const load: PageServerLoad = async () => {
	try {
		const response = await apiClient.get('/artists'); // เรียกข้อมูลจาก API GET /api/artists

		if (response.status === 200) {
			return {
				artists: response.data.data,
				pagination: response.data.meta
			};
		}
	} catch (err: any) {}
};
