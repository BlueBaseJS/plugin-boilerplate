import { isPromise } from '@bluebase/core';

test('should load screens on web', async () => {
	const { screens } = require('../screens/index.web');
	expect(isPromise(screens.ThingProfileOverviewScreen)).toBe(true);
});
