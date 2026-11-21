import { CLIENTZONE_ADMIN_URL, CMS_URL, OPERATIONAL_URL } from '$app/env/private';
import { appTiles } from '#lib/apps.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({
	apps: appTiles({ operational: OPERATIONAL_URL, cms: CMS_URL, clientzone: CLIENTZONE_ADMIN_URL })
});
