const mockAlert = jest.fn();
jest.mock('@blueeast/client-plugin-ui/dist/components/Alert/useAlert', () => ({
	useAlert: () => ({ alert: mockAlert }),
}));

const mockAskPermission = jest.fn();
const mockUsePermissions = jest.fn();
jest.mock('expo-permissions', () => {
	const actual = jest.requireActual('expo-permissions');

	return {
		...actual,
		usePermissions: mockUsePermissions,
	};
});

import * as Location from 'expo-location';

import BBPluginMaterialUI from '@bluebase/plugin-material-ui';
import { BlueBaseApp } from '@bluebase/core';
import { LocateMeButton } from '../LocateMeButton';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// mock of permission
jest.mock('expo-location', () => ({
	getCurrentPositionAsync: jest.fn(),
}));

describe('LocationInputView', () => {
	beforeEach(() => {
		mockAlert.mockReset();
		mockAskPermission.mockReset();
		mockUsePermissions.mockReset();

		mockUsePermissions.mockReturnValue([
			{ status: 'undetermined' },
			async () => {
				mockAskPermission();
			},
		]);
	});

	it('should get location is permission is granted', async () => {
		// Mock Expo API response
		mockUsePermissions.mockReturnValue([
			{ status: 'granted' },
			async () => {
				mockAskPermission();
			},
		]);

		// Create mock callback function
		const onLocationUpdate = jest.fn();

		// Mount component
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BBPluginMaterialUI]}>
				<LocateMeButton onLocationUpdate={onLocationUpdate} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, LocateMeButton);

		// Extract onPress function
		const buttonOnPress: () => Promise<void> = wrapper.find('Button').first().prop('onPress');

		await buttonOnPress();
		wrapper.update();

		expect(Location.getCurrentPositionAsync).toHaveBeenCalledTimes(0);

		wrapper.unmount();
	});

	it('should ask permission and then get location if permission is not granted', async () => {
		// Mock Expo API response
		mockUsePermissions.mockReturnValue([
			{ status: 'undetermined', canAskAgain: true },
			async () => {
				mockAskPermission();

				return;
			},
		]);

		// Create mock callback function
		const onLocationUpdate = jest.fn();

		// Mount component
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BBPluginMaterialUI]}>
				<LocateMeButton onLocationUpdate={onLocationUpdate} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, LocateMeButton);

		// Extract onPress function
		const buttonOnPress: () => Promise<void> = wrapper.find('Button').first().prop('onPress');

		buttonOnPress();

		const onAllow: any = mockAlert.mock.calls[0][2][1].onPress;
		onAllow();

		wrapper.update();

		expect(mockAskPermission).toHaveBeenCalledTimes(1);
		expect(Location.getCurrentPositionAsync).toHaveBeenCalledTimes(0);

		wrapper.unmount();
	});

	it('should show error message when permission is not granted', async () => {
		// Mock Expo API response
		(Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
			coords: {
				latitude: 31.582045,
				longitude: 74.329376,
			},
		});

		// Create mock callback function
		const onLocationUpdate = jest.fn();

		// Mount component
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BBPluginMaterialUI]}>
				<LocateMeButton onLocationUpdate={onLocationUpdate} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper, LocateMeButton);

		// Extract onPress function
		const buttonOnPress: () => Promise<void> = wrapper.find('Button').first().prop('onPress');

		await buttonOnPress();
		wrapper.update();

		expect(mockAlert).toHaveBeenCalledTimes(1);
		expect(mockAlert).toHaveBeenLastCalledWith('Location permission required');

		wrapper.unmount();
	});
});
