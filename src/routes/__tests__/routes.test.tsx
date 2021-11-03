import { BlueBase } from '@bluebase/core';

import { routes } from '../routes';

describe('routes', () => {
	it('should render routes', async () => {
		const BB = new BlueBase();
		const finalRoutes = await routes({
			BB,
			intl: { __: jest.fn().mockImplementation(i => i) },
		} as any);

		const placeAppRoute: any = finalRoutes.find(item => item.name === 'PlacesApp');

		expect(placeAppRoute.screen).toBe('PlacesAppScreen');
		expect(placeAppRoute.options().title).toBe('Places');
		expect(placeAppRoute.options().headerLeft).toBe(undefined);
		expect(placeAppRoute.options().headerRight()).toBeTruthy();

		const thingSettingsRoute: any = finalRoutes.find(item => item.name === 'PlaceSettings');

		// expect(thingSettingsRoute.screen).toBe('ThingSettingsScreen');
		expect(thingSettingsRoute.options().title).toBe('Place Settings');
		expect(thingSettingsRoute.options().headerLeft).toBe(undefined);
	});

});
