import { isPromise } from '@bluebase/core';

test('Plugin should load components from web', async () => {
	const { components } = require('../components/index.web');
	expect(isPromise(components.AvatarSetting)).toBe(true);
});
