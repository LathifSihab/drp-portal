import { defineEnvVars } from '@sveltejs/kit/env';
import { z } from 'zod';

const optional = z
	.string()
	.trim()
	.optional()
	.transform((v) => v || undefined);

/** An app address for a tile: http(s) only, so nothing else ever becomes a link. */
const appUrl = z
	.string()
	.trim()
	.optional()
	.transform((v) => v || undefined)
	.pipe(z.url({ protocol: /^https?$/ }).optional());

export const variables = defineEnvVars({
	CF_ACCESS_TEAM_DOMAIN: {
		description:
			'Cloudflare Access team domain, e.g. drp.cloudflareaccess.com. Required outside local dev.',
		schema: optional
	},
	CF_ACCESS_AUD: {
		description:
			"Audience (AUD) tag of the portal's own Cloudflare Access application. Required outside local dev.",
		schema: optional
	},
	DEV_USER_EMAIL: {
		description:
			'Local dev only: signed-in user when there is no Cloudflare Access header. Ignored outside `vite dev`.',
		schema: optional
	},
	OPERATIONAL_URL: {
		description: 'DRP Operational address for its tile.',
		schema: appUrl
	},
	CMS_URL: {
		description: 'CMS address for its tile.',
		schema: appUrl
	},
	CLIENTZONE_ADMIN_URL: {
		description: 'Client zone admin pages address (…/admin) for its tile.',
		schema: appUrl
	}
});
