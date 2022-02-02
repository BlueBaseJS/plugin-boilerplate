import { isPromise } from '@bluebase/core';

test('should load components on web', async () => {
	const { components } = require('../components/index.web');
	expect(isPromise(components.SensorsList)).toBe(true);
});
