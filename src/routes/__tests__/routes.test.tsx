import { BlueBase, isMobile } from '@bluebase/core';

import { routes } from '..';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));
describe('routes', () => {
	it('should render routes', async () => {
		const BB = new BlueBase();
		const finalRoutes = await routes({
			BB,
			intl: { __: jest.fn().mockImplementation(i => i) },
		} as any);

		const thingAppRoute: any = finalRoutes.find(item => item.name === 'ThingsApp');

		expect(thingAppRoute.screen).toBe('ThingsAppScreen');
	});
	it('should render routes on Web', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);
		const BB = new BlueBase();
		const finalRoutes = await routes({
			BB,
			intl: { __: jest.fn().mockImplementation(i => i) },
		} as any);

		const thingAppRoute: any = finalRoutes.find(item => item.name === 'ThingsApp');

		expect(thingAppRoute.screen).toBe('ThingsAppScreen');
	});
	it('should render routes', async () => {
		const BB = new BlueBase();
		const finalRoutes = await routes({
			BB,
			intl: { __: jest.fn().mockImplementation(i => i) },
		} as any);

		const thingAppRoute: any = finalRoutes.find(item => item.name === 'ThingsApp');

		expect(thingAppRoute.screen).toBe('ThingsAppScreen');
		expect(thingAppRoute.options().title).toBe('Things');
		expect(thingAppRoute.options().headerLeft).toBe(undefined);
		expect(thingAppRoute.options().headerRight()).toBeTruthy();

		const thingSettingsRoute: any = finalRoutes.find(item => item.name === 'ThingSettings');

		// expect(thingSettingsRoute.screen).toBe('ThingSettingsScreen');
		expect(thingSettingsRoute.options().title).toBe('Thing Settings');
		expect(thingSettingsRoute.options().headerLeft).toBe(undefined);
	});

	it('should render custom back button on web', async () => {
		jest.mock('react-native/Libraries/Utilities/Platform', () => {
			const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
			Platform.OS = 'web';
			return Platform;
		});

		const BB = new BlueBase();
		const finalRoutes = await routes({
			BB,
			intl: { __: jest.fn().mockImplementation(i => i) },
		} as any);

		const thingAppRoute: any = finalRoutes.find(item => item.name === 'ThingsApp');

		expect(thingAppRoute.screen).toBe('ThingsAppScreen');
		expect(thingAppRoute.options().title).toBe('Things');
		expect(thingAppRoute.options().headerLeft()).toBeTruthy();
		expect(thingAppRoute.options().headerRight()).toBeTruthy();

		const thingSettingsRoute: any = finalRoutes.find(item => item.name === 'ThingSettings');

		// expect(thingSettingsRoute.screen).toBe('ThingSettingsScreen');
		expect(thingSettingsRoute.options().title).toBe('Thing Settings');
		// expect(thingSettingsRoute.options().headerLeft()).toBeTruthy();
	});
});
