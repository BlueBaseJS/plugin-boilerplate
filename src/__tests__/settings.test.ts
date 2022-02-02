import { isPromise } from '@bluebase/core';

test('should load settings on web', async () => {
	const { settings } = require('../settings/index.web');
	expect(isPromise(settings.ThingDangerSettings)).toBe(true);
});
