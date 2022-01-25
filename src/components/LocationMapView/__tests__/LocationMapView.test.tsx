import { BlueBaseApp, createPlugin, getComponent } from '@bluebase/core';
import MUIplugin from '@bluebase/plugin-material-ui';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { View } from 'react-native';

import Plugin from '../../../index';
import { LocationMapViewProps } from '../LocationMapView';

/**
 * Mocking expo Library
 */

jest.mock('expo', () => ({}));

const MockMapView = (props: any) => <View {...props} />;
const MockMapMarker = (props: any) => <View {...props} />;

const LocationMapView = getComponent<LocationMapViewProps>('LocationMapView');

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
				<LocationMapView latitude={latitude} longitude={longitude} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LocationMapView);

		expect((wrapper as any).find('MapView').first().prop('region').latitude).toBe(latitude);
		expect((wrapper as any).find('MapView').first().prop('region').longitude).toBe(longitude);
		wrapper.unmount();
	});
	it('should render pulse with location Marker', async () => {
		const latitude = 31.582045;
		const longitude = 74.329376;

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin, MockPlugin]}>
				<LocationMapView latitude={latitude} longitude={longitude} pulse />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LocationMapView);

		// expect((wrapper as any).find('MapView').prop('region').latitude).toBe(latitude);
		expect((wrapper as any).find('Pulse').first().exists()).toBe(true);

		wrapper.unmount();
	});
});
