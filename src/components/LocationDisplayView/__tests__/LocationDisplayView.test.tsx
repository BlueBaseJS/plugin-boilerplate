import { BlueBaseApp, createPlugin, getComponent } from '@bluebase/core';
import MUIplugin from '@bluebase/plugin-material-ui';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { View } from 'react-native';

import Plugin from '../../../index';
import { LocationDisplayViewProps } from '../LocationDisplayView';

/**
 * Mocking expo Library
 */

jest.mock('expo', () => ({}));

const MockMapView = (props: any) => <View {...props} />;
const MockMapMarker = (props: any) => <View {...props} />;

const LocationDisplayView = getComponent<LocationDisplayViewProps>('LocationDisplayView');

const MockPlugin = createPlugin({
	key: 'mock-plugin',
	name: 'mock-plugin',

	components: {
		MapMarker: MockMapMarker,
		MapView: MockMapView,
	},
});

describe('LocationAskPermissionView', () => {
	it('should render view with correct coordinates', async () => {
		const latitude = 31.582045;
		const longitude = 74.329376;

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin, MockPlugin]}>
				<LocationDisplayView latitude={latitude} longitude={longitude} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LocationDisplayView);

		expect((wrapper as any).find('MapView').first().prop('region').latitude).toBe(latitude);
		expect((wrapper as any).find('MapView').first().prop('region').longitude).toBe(longitude);
		wrapper.unmount();
	});
	it('should not throw any exceptions without BlueBase themes', async () => {
		const latitude = 31.582045;
		const longitude = 74.329376;

		const Component = require('../LocationDisplayView').LocationDisplayView;

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin, MockPlugin]}>
				<Component latitude={latitude} longitude={longitude} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Component);

		expect((wrapper as any).find('MapView').first().prop('region').latitude).toBe(latitude);
		expect((wrapper as any).find('MapView').first().prop('region').longitude).toBe(longitude);
		wrapper.unmount();
	});
});
