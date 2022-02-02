import { BlueBase, Theme } from '@bluebase/core';

import { mobileRoutes } from '../mobile';

describe('mobileRoutes', () => {
	it('should return desktop routes', async () => {
		const BB = new BlueBase();
		const finalRoutes = await mobileRoutes({
			BB,
			intl: { __: jest.fn().mockImplementation(i => i) },
			theme: new Theme(),
		} as any);

		expect(finalRoutes).toHaveLength(1);

		expect(finalRoutes[0].name).toBe('ThingProfile');

		const options = finalRoutes[0].options({ route: { params: { title: 'Hello' } } });

		expect(options.title).toBe('Hello');
		expect(options.headerLeft).toBe(undefined);
		expect(options.headerRight()).toBeTruthy();
	});

	it('should return default title', async () => {
		const BB = new BlueBase();
		const finalRoutes = await mobileRoutes({
			BB,
			intl: { __: jest.fn().mockImplementation(i => i) },
			theme: new Theme(),
		} as any);

		expect(finalRoutes).toHaveLength(1);

		expect(finalRoutes[0].name).toBe('ThingProfile');

		const options = finalRoutes[0].options({ route: { params: {} } });

		expect(options.title).toBe('Thing');
		expect(options.headerLeft).toBe(undefined);
		expect(options.headerRight()).toBeTruthy();
	});

	it('should show custom back button on web', async () => {
		jest.mock('react-native/Libraries/Utilities/Platform', () => {
			const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
			Platform.OS = 'web';
			return Platform;
		});

		const BB = new BlueBase();
		const finalRoutes = await mobileRoutes({
			BB,
			intl: { __: jest.fn().mockImplementation(i => i) },
			theme: new Theme(),
		} as any);

		expect(finalRoutes).toHaveLength(1);

		expect(finalRoutes[0].name).toBe('ThingProfile');

		const options = finalRoutes[0].options({ route: { params: {} } });

		expect(options.title).toBe('Thing');
		expect(options.headerLeft()).toBeTruthy();
		expect(options.headerRight()).toBeTruthy();
	});
});
