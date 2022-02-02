const mockGetDimensions = jest.fn().mockReturnValue({
	height: 800,
	width: 300,
});

jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
	const DimentsionsActual = (require as any).requireActual(
		'react-native/Libraries/Utilities/Dimensions'
	);
	return class extends DimentsionsActual {
		static get = mockGetDimensions;
	};
});

import { BlueBase, BlueBaseApp, NavigationContext } from '@bluebase/core';

import BEPluginUI from '@blueeast/client-plugin-ui';
import BlueBasePluginJsonSchemaComponents from '@bluebase/plugin-json-schema-components';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueBasePluginReactRouter from '@bluebase/plugin-react-router';
import BlueBasePluginResponsiveGrid from '@bluebase/plugin-responsive-grid';
import MevrisPluginUI from '@mevris/client-plugin-ui';
import Plugin from '../../..';
import React from 'react';
import ThingProfileOverviewScreenDesktop from '../Desktop';
import { View } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [
	Plugin,
	BlueBasePluginJsonSchemaComponents,
	BlueBasePluginMaterialUI,
	BlueBasePluginReactRouter,
	BlueBasePluginResponsiveGrid,
	MevrisPluginUI,
	BEPluginUI,
];

describe('ThingProfileOverviewScreen', () => {
	it('should not crash when improted directly', async () => {
		const ThingProfileOverviewScreen = require('../index').default;
		ThingProfileOverviewScreen.displayName = 'ThingProfileOverviewScreen';

		const NavigationActions = ({ children }: any) => children({ getParam: () => '123' });

		const wrapper = mount(
			<BlueBaseApp
				plugins={plugins}
				filters={{
					'bluebase.boot.end': async (bootOpts: any, _ctx: any, BB: BlueBase) => {
						// Adding mocked NavigationActions
						await BB.Components.register('NavigationActions', NavigationActions);
						await BB.Components.register('DynamicControlUI', View);

						return bootOpts;
					},
				}}
			>
				<ThingProfileOverviewScreen />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'ThingProfileOverviewScreen JsonLayout');

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('ThingProfileOverviewScreen JsonLayout').length).toBeGreaterThan(0);
	});

	it('should render a SidebarLayout on desktop', async () => {
		mockGetDimensions.mockReturnValue({
			height: 1300,
			width: 1200,
		});

		const ThingProfileOverviewScreen = require('../ThingProfileOverviewScreen')
			.ThingProfileOverviewScreen;
		ThingProfileOverviewScreen.displayName = 'ThingProfileOverviewScreen';

		const wrapper = mount(
			<BlueBaseApp
				plugins={plugins}
				filters={{
					'bluebase.boot.end': async (bootOpts: any, _ctx: any, BB: BlueBase) => {
						await BB.Components.register('DynamicControlUI', View);
						await BB.Components.register('MevrisUIView', View);

						return bootOpts;
					},
				}}
			>
				<NavigationContext.Provider value={{ getParam: () => '123' } as any}>
					<ThingProfileOverviewScreen />
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'ThingProfileOverviewScreen');

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find(ThingProfileOverviewScreenDesktop).exists()).toBe(true);
	});

	// it('should render null on desktop if there is not thingId', async () => {
	// 	mockGetDimensions.mockReturnValue({
	// 		height: 1300,
	// 		width: 1200,
	// 	});

	// 	const ThingProfileOverviewScreen = getComponent('ThingProfileOverviewScreen');
	// 	ThingProfileOverviewScreen.displayName = 'ThingProfileOverviewScreen';

	// 	const NavigationActions = ({ children }: any) => children({ getParam: () => undefined });

	// 	const wrapper = mount(
	// 		<BlueBaseApp
	// 			plugins={plugins}
	// 			filters={{
	// 				'bluebase.boot.end': async (bootOpts: any, _ctx: any, BB: BlueBase) => {
	// 					// Adding mocked NavigationActions
	// 					await BB.Components.register('NavigationActions', NavigationActions);
	// 					await BB.Components.register('DynamicControlUI', View);
	// 					await BB.Components.register('MevrisUIView', View);

	// 					return bootOpts;
	// 				},
	// 			}}
	// 		>
	// 			<ThingProfileOverviewScreen />
	// 		</BlueBaseApp>
	// 	);

	// 	await waitForElement(wrapper, 'ThingProfileOverviewScreen');

	// 	// expect(wrapper).toMatchSnapshot();
	// 	expect(
	// 		wrapper
	// 			.find('ThingProfileOverviewScreen NavigationActions')
	// 			.last()
	// 			.text()
	// 	).toBe('');
	// });

	// it('should return IconButton component from options on a mobile device', async () => {
	// 	mockGetDimensions.mockReturnValue({
	// 		height: 300,
	// 		width: 600,
	// 	});

	// 	// Import component
	// 	const ThingProfileOverviewScreen = require('../index').default;

	// 	// Execute function
	// 	const options = ThingProfileOverviewScreen.options();

	// 	expect(options.title).toBe('Controls');

	// 	// Mount header right to test icon
	// 	const wrapper = mount(
	// 		<BlueBaseApp plugins={plugins}>{options.tabBarIcon}</BlueBaseApp>
	// 	);

	// 	// Wait for render
	// 	await waitForElement(wrapper, 'Icon');

	// 	// Find Icon
	// 	const Icon = wrapper.find('Icon').first();

	// 	// Check if its the correct one
	// 	expect(Icon.prop('name')).toBe('google-controller');
	// });

	// it('should return Button component from options on a desktop device', async () => {
	// 	mockGetDimensions.mockReturnValue({
	// 		height: 1300,
	// 		width: 1200,
	// 	});

	// 	// Import component
	// 	const ThingProfileOverviewScreen = require('../index').default;

	// 	// Execute function
	// 	const options = ThingProfileOverviewScreen.options();

	// 	expect(options.title).toBe('Overview');
	// 	expect(options.tabBarIcon).toBeUndefined();
	// });
});
