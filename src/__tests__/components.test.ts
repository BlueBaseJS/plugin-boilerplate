import { isPromise } from '@bluebase/core';

test('Plugin should load Components from web', async () => {
	const { components } = require('../components/index.web');
	expect(isPromise(components.AvatarMarker)).toBe(true);
});
