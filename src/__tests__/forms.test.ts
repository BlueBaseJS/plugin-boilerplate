import { isPromise } from '@bluebase/core';

test('should load forms on web', async () => {
	const { forms } = require('../forms/index.web');
	expect(isPromise(forms.ThingNameForm)).toBe(true);
});
