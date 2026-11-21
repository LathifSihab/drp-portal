import { describe, expect, it } from 'vitest';
import { appTiles } from './apps.ts';

describe('appTiles', () => {
	it('lists the three apps in a fixed order', () => {
		expect(appTiles({}).map((t) => t.id)).toEqual(['operational', 'cms', 'clientzone']);
	});

	it('links a configured app and shows its host', () => {
		const [, cms] = appTiles({ cms: 'https://cms.drpbuildlab.com' });
		expect(cms.url).toBe('https://cms.drpbuildlab.com');
		expect(cms.host).toBe('cms.drpbuildlab.com');
	});

	it('leaves an unconfigured app without a link', () => {
		const [operational] = appTiles({ operational: '' });
		expect(operational.url).toBeUndefined();
		expect(operational.host).toBeUndefined();
	});
});
