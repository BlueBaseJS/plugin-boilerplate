import { BlueBaseApp, getComponent } from '@bluebase/core';
import BBPluginJsonForm from '@bluebase/plugin-json-schema-components';
import BBPluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueeastClientPluginPermissionUi from '@blueeast/client-plugin-permissions-ui';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { View } from 'react-native';
import wait from 'waait';

// import { FormikContext } from 'formik';
import Plugin from '../../../index';

/**
 * Mocking expo Library
 */

jest.mock('expo', () => ({}));
// jest.mock('react-native-animatable', () => ({
// 	warnOnce: () => null,
// }));

const MockedMapView = View;
const LocationInputView = getComponent('LocationInputView');
describe('LocationInputView', () => {
	it('should display a map with default coordinates', async () => {
		const wrapper = mount(
			// tslint:disable-next-line: max-line-length
			<BlueBaseApp
				plugins={[Plugin, BlueeastClientPluginPermissionUi, BBPluginMaterialUI]}
				components={{ MapView: MockedMapView }}
			>
				<LocationInputView />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LocationInputView);

		expect((wrapper as any).find('MapView').first().prop('region').latitude).toEqual(0);
		expect((wrapper as any).find('MapView').first().prop('region').longitude).toEqual(0);

		wrapper.unmount();
	});

	it('should not do anything if same location is set again', async () => {
		const wrapper = mount(
			// tslint:disable-next-line: max-line-length
			<BlueBaseApp
				plugins={[Plugin, BlueeastClientPluginPermissionUi, BBPluginMaterialUI]}
				components={{ MapView: MockedMapView }}
			>
				<LocationInputView latitude={31.582045} longitude={74.329376} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LocationInputView);

		const updateCoordinates: any = wrapper.find('LocateMeButton').first().prop('onLocationUpdate');

		updateCoordinates({
			latitude: 31.582045,
			longitude: 74.329376,
		});

		expect((wrapper as any).find('MapView').first().prop('region').latitude).toEqual(31.582045);
		expect((wrapper as any).find('MapView').first().prop('region').longitude).toEqual(74.329376);

		wrapper.unmount();
	});

	it('should update if location is different', async () => {
		const wrapper = mount(
			// tslint:disable-next-line: max-line-length
			<BlueBaseApp
				plugins={[Plugin, BlueeastClientPluginPermissionUi, BBPluginMaterialUI]}
				components={{ MapView: MockedMapView }}
			>
				<LocationInputView latitude={31.582045} longitude={74.329376} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LocationInputView);

		const updateCoordinates: any = wrapper.find('LocateMeButton').first().prop('onLocationUpdate');

		updateCoordinates({
			latitude: 31.5,
			longitude: 74.3,
		});

		expect((wrapper as any).find('MapView').first().prop('region').latitude).toEqual(31.582045);
		expect((wrapper as any).find('MapView').first().prop('region').longitude).toEqual(74.329376);

		wrapper.unmount();
	});

	it('should work ok when submit button press', async () => {
		const wrapper = mount(
			// tslint:disable-next-line: max-line-length
			<BlueBaseApp
				plugins={[Plugin, BlueeastClientPluginPermissionUi, BBPluginMaterialUI, BBPluginJsonForm]}
				components={{ MapView: MockedMapView }}
			>
				<LocationInputView latitude={31.582045} longitude={74.329376} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LocationInputView);

		const handleSubmit: any = wrapper.find('LocationInputDialog').first().prop('onSubmit');

		handleSubmit({
			latitude: 31.82045,
			longitude: 74.29376,
		});

		expect((wrapper as any).find('MapView').first().prop('region').latitude).toEqual(31.582045);
		expect((wrapper as any).find('MapView').first().prop('region').longitude).toEqual(74.329376);

		wrapper.unmount();
	});

	it('should display a map with the given coordinates', async () => {
		const wrapper = mount(
			// tslint:disable-next-line: max-line-length
			<BlueBaseApp
				plugins={[Plugin, BlueeastClientPluginPermissionUi, BBPluginMaterialUI]}
				components={{ MapView: MockedMapView }}
			>
				<LocationInputView latitude={31.582045} longitude={74.329376} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LocationInputView);

		expect((wrapper as any).find('MapView').first().prop('region').latitude).toEqual(31.582045);
		expect((wrapper as any).find('MapView').first().prop('region').longitude).toEqual(74.329376);

		wrapper.unmount();
	});

	it('should display a dialog when menu button is pressed', async () => {
		const wrapper = mount(
			<BlueBaseApp
				plugins={[Plugin, BlueeastClientPluginPermissionUi, BBPluginMaterialUI, BBPluginJsonForm]}
				components={{ MapView: MockedMapView }}
			>
				<LocationInputView latitude={31.582045} longitude={74.329376} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, LocationInputView);

		// Find Menu button & press it
		const buttonOnPress: any = wrapper.find('IconButton').first().prop('onPress');

		buttonOnPress();

		// Update tree
		wrapper.update();

		// Check if dialog is rendered
		expect(wrapper.find('LocationInputDialog').first().prop('visible')).toBe(true);

		// Find dialog for button
		// const Button = wrapper.find('LocationInputDialog Button[name="submit"]').last();

		// Extract formik context
		// const formik: FormikContext<{ itemName: string }> = Button.prop('formik');

		// // Fill form
		// formik.setFieldValue('latitude', '32.582045');
		// formik.setFieldValue('longitude', '73.329376');
		// formik.handleSubmit();

		// wait for formik to do its thing
		await wait(500);

		// Update tree
		wrapper.update();

		// Check if map was updated
		expect((wrapper as any).find('MapView').first().prop('region').latitude).toEqual(31.582045);
		expect((wrapper as any).find('MapView').first().prop('region').longitude).toEqual(74.329376);

		// Have a cup of tea ☕️
		wrapper.unmount();
	});

	it('should call onSubmit prop fn when save button is pressed', async () => {
		const onSubmit = jest.fn();

		const wrapper = mount(
			<BlueBaseApp
				plugins={[Plugin, BlueeastClientPluginPermissionUi, BBPluginMaterialUI, BBPluginJsonForm]}
				components={{ MapView: MockedMapView }}
			>
				<LocationInputView latitude={31.582045} longitude={74.329376} onSubmit={onSubmit} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, LocationInputView);

		// Find Menu button & press it
		const buttonOnPress: jest.Mock = wrapper.find('Button[title="Save"]').first().prop('onPress');

		buttonOnPress();

		// Check callback value
		expect(onSubmit).toHaveBeenCalledTimes(1);
		expect(onSubmit.mock.calls[0][0].coordinates).toMatchObject({
			latitude: 31.582045,
			longitude: 74.329376,
		});

		wrapper.update();

		// // isSubmitting callback
		// const isSubmitting = onSubmit.mock.calls[0][0].isSubmitting;
		// const ins = wrapper
		// 	.find(LocationInputView)
		// 	.last()
		// 	.instance();
		// expect((ins.state as any).isSubmitting).toBe(false);
		// isSubmitting(true);
		// expect((ins.state as any).isSubmitting).toBe(true);

		wrapper.unmount();
	});

	it('should not throw exceptions even when used directly without BlueBase', async () => {
		const LocationInputViewComponent = require('../LocationInputView').LocationInputView;

		const wrapper = mount(
			// tslint:disable-next-line: max-line-length
			<BlueBaseApp
				plugins={[BlueeastClientPluginPermissionUi, BBPluginMaterialUI, Plugin]}
				components={{ MapView: MockedMapView }}
			>
				<LocationInputViewComponent latitude={31.582045} longitude={74.329376} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LocationInputViewComponent);

		expect((wrapper as any).find('MapView').first().prop('region').latitude).toEqual(31.582045);
		expect((wrapper as any).find('MapView').first().prop('region').longitude).toEqual(74.329376);

		wrapper.unmount();
	});
});
