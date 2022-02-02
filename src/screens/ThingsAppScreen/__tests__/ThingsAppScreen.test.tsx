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

import { BlueBaseApp, getComponent } from '@bluebase/core';

import BEPluginUI from '@blueeast/client-plugin-ui';
import BlueBasePluginJsonSchemaComponents from '@bluebase/plugin-json-schema-components';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueBasePluginReactRouter from '@bluebase/plugin-react-router';
import BlueBasePluginResponsiveGrid from '@bluebase/plugin-responsive-grid';
import MevrisPluginUI from '@mevris/client-plugin-ui';
import Plugin from '../../..';
import React from 'react';
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

describe('ThingsAppScreen', () => {
	it('should render a ThingGrid', async () => {
		const ThingsAppScreen = getComponent('ThingsAppScreen');

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<ThingsAppScreen />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'ThingsAppScreen');
	});

	it('should not crash when improted directly', async () => {
		const ThingsAppScreen = require('../index').default;

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<ThingsAppScreen />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'ThingGrid');

		expect(wrapper.find('ThingGrid').length).toBeGreaterThan(0);
	});

	// it('should return IconButton component from options on a mobile device', async () => {
	// 	mockGetDimensions.mockReturnValue({
	// 		height: 300,
	// 		width: 600,
	// 	});

	// 	// Import component
	// 	const ThingsAppScreen = require('../index').default;

	// 	// Create mock navigation options
	// 	const navigation = { navigate: jest.fn() };
	// 	const screenProps = { intl: { __: jest.fn().mockImplementation(i => i) } };

	// 	// Execute function
	// 	const options = ThingsAppScreen.options({ navigation, screenProps });

	// 	// Check page title
	// 	expect(options.title).toBe('Things');

	// 	// Mount header right to test icon
	// 	const wrapper = mount(<BlueBaseApp plugins={plugins}>{options.headerRight}</BlueBaseApp>);

	// 	// Wait for render
	// 	await waitForElement(wrapper, 'IconButton');

	// 	// Find Icon
	// 	const IconButton = wrapper.find('IconButton').first();

	// 	// Check if its the correct one
	// 	expect(IconButton.prop('name')).toBe('plus');

	// 	// Extract onPress listener
	// 	const onPress: () => void = IconButton.prop('onPress');

	// 	// Press button
	// 	onPress();

	// 	// Check if button navigates to another screen onPress
	// 	expect(navigation.navigate).toHaveBeenCalledTimes(1);
	// 	expect(navigation.navigate).toHaveBeenLastCalledWith('ProductsApp');
	// });

	// it('should return custom back button on web', async () => {
	// 	jest.mock('react-native/Libraries/Utilities/Platform', () => {
	// 		const Platform = (require as any).requireActual('react-native/Libraries/Utilities/Platform');
	// 		Platform.OS = 'web';
	// 		return Platform;
	// 	});

	// 	// Import component
	// 	const ThingsAppScreen = require('../index').default;

	// 	// Create mock navigation options
	// 	const navigation = { navigate: jest.fn() };
	// 	const screenProps = { intl: { __: jest.fn().mockImplementation(i => i) } };

	// 	// Execute function
	// 	const options = ThingsAppScreen.options({ navigation, screenProps });

	// 	// Check page title
	// 	expect(options.title).toBe('Things');

	// 	// Mount header right to test icon
	// 	const wrapper = mount(<BlueBaseApp plugins={plugins}>{options.headerLeft}</BlueBaseApp>);

	// 	// Wait for render
	// 	await waitForElement(wrapper, 'HeaderBackButton');

	// 	// Find Icon
	// 	const Button = wrapper.find('HeaderBackButton').first();

	// 	// Extract onPress listener
	// 	const onPress: () => void = Button.prop('onPress');

	// 	// Press button
	// 	onPress();

	// 	// Check if button navigates to another screen onPress
	// 	expect(navigation.navigate).toHaveBeenCalledTimes(1);
	// 	expect(navigation.navigate).toHaveBeenLastCalledWith('Home');
	// });
});
