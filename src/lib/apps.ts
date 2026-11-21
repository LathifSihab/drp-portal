/** The internal apps shown as tiles on the portal, in this order. */
export type AppId = 'operational' | 'cms' | 'clientzone';

export type AppTile = {
	id: AppId;
	name: string;
	description: string;
	/** Undefined when the address is not configured: the tile shows but does not link. */
	url: string | undefined;
	/** Host shown under the description, so people see where they are going. */
	host: string | undefined;
};

const APPS: { id: AppId; name: string; description: string }[] = [
	{
		id: 'operational',
		name: 'DRP Operational',
		description: 'Projects, clients, tasks and the phase board.'
	},
	{
		id: 'cms',
		name: 'CMS',
		description: 'Blog articles, reader comments, and newsletter and website insights.'
	},
	{
		id: 'clientzone',
		name: 'Client zone admin',
		description: 'Leads, quotes, sales, partners and payouts.'
	}
];

export function appTiles(urls: Partial<Record<AppId, string | undefined>>): AppTile[] {
	return APPS.map((app) => {
		const url = urls[app.id] || undefined;
		return { ...app, url, host: url ? new URL(url).host : undefined };
	});
}
