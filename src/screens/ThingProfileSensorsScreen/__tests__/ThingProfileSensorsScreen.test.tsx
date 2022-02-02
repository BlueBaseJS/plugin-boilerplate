import 'cross-fetch/polyfill';

import { BlueBase, BlueBaseApp, NavigationContext } from '@bluebase/core';

import BlueBasePluginApollo from '@bluebase/plugin-apollo';
import BlueBasePluginJsonSchemaComponents from '@bluebase/plugin-json-schema-components';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueBasePluginReactRouter from '@bluebase/plugin-react-router';
import BlueBasePluginResponsiveGrid from '@bluebase/plugin-responsive-grid';
import MevrisPluginDeviceControllers from '@mevris/client-plugin-device-controllers';
import MevrisPluginUI from '@mevris/client-plugin-ui';
import { Noop } from '@bluebase/components';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// const mockGetDimensions = jest.fn();

jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
	const DimentsionsActual = (require as any).requireActual(
		'react-native/Libraries/Utilities/Dimensions'
	);
	return class extends DimentsionsActual {
		static get = jest.fn().mockReturnValue({
			height: 800,
			width: 300,
		});
	};
});

const plugins = [
	Plugin,
	BlueBasePluginApollo,
	BlueBasePluginJsonSchemaComponents,
	BlueBasePluginMaterialUI,
	BlueBasePluginReactRouter,
	BlueBasePluginResponsiveGrid,
	MevrisPluginDeviceControllers,
	MevrisPluginUI,
];

describe('ThingProfileSensorsScreen', () => {
	it('should render a JsonLayout component', async () => {
		const ThingProfileSensorsScreen = require('../index').default;
		ThingProfileSensorsScreen.displayName = 'ThingProfileSensorsScreen';

		const wrapper = mount(
			<BlueBaseApp
				plugins={plugins}
				filters={{
					'bluebase.boot.end': async (bootOpts: any, _ctx: any, BB: BlueBase) => {
						// Adding mocked NavigationActions
						await BB.Components.register('MevrisUIView', Noop);

						return bootOpts;
					},
				}}
			>
				<NavigationContext.Provider value={{ getParam: () => '123' } as any}>
					<ThingProfileSensorsScreen />
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'ThingProfileSensorsScreen');

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('ThingProfileSensorsScreen JsonLayout').length).toBeGreaterThan(0);
	});

	// it('should render error when there is no thingId', async () => {
	// 	const ThingProfileSensorsScreen = require('../index').default;
	// 	ThingProfileSensorsScreen.displayName = 'ThingProfileSensorsScreen';

	// 	const wrapper = mount(
	// 		<BlueBaseApp
	// 			plugins={plugins}
	// 			filters={{
	// 				'bluebase.boot.end': async (bootOpts: any, _ctx: any, BB: BlueBase) => {
	// 					// Adding mocked NavigationActions
	// 					await BB.Components.register('MevrisUIView', Noop);

	// 					return bootOpts;
	// 				},
	// 			}}
	// 		>
	// 			<NavigationContext.Provider value={{ getParam: () => undefined } as any}>
	// 				<ThingProfileSensorsScreen />
	// 			</NavigationContext.Provider>
	// 		</BlueBaseApp>
	// 	);

	// 	await waitForElement(wrapper, 'ThingProfileSensorsScreen');

	// 	// expect(wrapper).toMatchSnapshot();
	// 	expect(wrapper.find('ErrorState').exists()).toBe(true);
	// });

	// it('should return IconButton component from options on a mobile device', async () => {
	// 	(Dimensions.get as any).mockReturnValue({
	// 		height: 300,
	// 		width: 600,
	// 	});

	// 	// Import component
	// 	const ThingProfileSensorsScreen = require('../index').default;

	// 	// Execute function
	// 	const options = ThingProfileSensorsScreen.options();

	// 	expect(options.title).toBe('Sensors');

	// 	// Mount header right to test icon
	// 	const wrapper = mount(
	// 		<BlueBaseApp plugins={plugins}>{options.tabBarIcon}</BlueBaseApp>
	// 	);

	// 	// Wait for render
	// 	await waitForElement(wrapper, 'Icon');

	// 	// Find Icon
	// 	const Icon = wrapper.find('Icon').first();

	// 	// Check if its the correct one
	// 	expect(Icon.prop('name')).toBe('gauge');
	// });
});
