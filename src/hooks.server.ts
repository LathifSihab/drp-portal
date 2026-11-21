import { error } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';
import { dev } from '$app/env';
import { CF_ACCESS_AUD, CF_ACCESS_TEAM_DOMAIN, DEV_USER_EMAIL } from '$app/env/private';
import { AccessError, verifyAccessJwt } from '#lib/server/access.ts';

/**
 * Same check as DRP Operational: the portal also answers on its workers.dev address, so it
 * verifies the Access token itself instead of trusting that Access stood in front.
 */
async function identify(request: Request): Promise<string> {
	const token = request.headers.get('cf-access-jwt-assertion');
	// Local dev only: `dev` is false in every build, so this can never apply on Workers.
	if (dev && !token && DEV_USER_EMAIL) return DEV_USER_EMAIL.trim().toLowerCase();

	if (!CF_ACCESS_TEAM_DOMAIN || !CF_ACCESS_AUD) {
		error(500, 'Cloudflare Access is not configured (CF_ACCESS_TEAM_DOMAIN, CF_ACCESS_AUD)');
	}
	try {
		const { email } = await verifyAccessJwt(token, {
			teamDomain: CF_ACCESS_TEAM_DOMAIN,
			audience: CF_ACCESS_AUD
		});
		return email;
	} catch (e) {
		if (e instanceof AccessError) {
			console.warn('access denied:', e.message); // never log the token itself
			error(401, 'Sign in through Cloudflare Access');
		}
		throw e;
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = { email: await identify(event.request) };
	const response = await resolve(event);
	// Internal tool: never indexed, never framed.
	response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'same-origin');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	return response;
};
