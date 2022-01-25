import { BlueBaseApp } from '@bluebase/core';
import { CameraPermissionAskView } from '../CameraPermissionAskView';
import MUIplugin from '@bluebase/plugin-material-ui';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

/**
 * Mocking expo Library
 */
jest.mock('expo-permissions', () => ({
	usePermissions:jest.fn(),
	askAsync: jest.fn(),
	getAsync: jest.fn(),
}));

jest.mock('expo', () => {});
jest.mock('expo-constants', () => ({
	isDevice: true,
}));

describe('CameraPermissionAskView', () => {
	it('Test Grant Access Button', async () => {
		const mockCallBack = jest.fn();

		const comp = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin, MaterialCommunityIcons]}>
				<CameraPermissionAskView
					requestPermission={mockCallBack}
					title="Camera Permission"
					message="Test"
				/>
			</BlueBaseApp>
		);

		await waitForElement(comp, CameraPermissionAskView);
		expect(comp.props().children.props.title).toBe('Camera Permission');
		expect(comp.props().children.props.message).toBe('Test');

	});

	it('Test Props for Permissions View', async () => {
		const mockCallBack = jest.fn();

		const comp = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin, MaterialCommunityIcons]}>
				<CameraPermissionAskView
					requestPermission={mockCallBack}
				/>
			</BlueBaseApp>
		);

		await waitForElement(comp, CameraPermissionAskView);

		// Component State
		expect(comp.find('ComponentState').first().prop('actionTitle')).toBe('Grant Access');
		expect(comp.find('ComponentState').first().prop('description')).toBe(
			// eslint-disable-next-line max-len
			'Mevris requires camera access to scan QR odes to add devices and take pictures to update display picture of your account profile, things and places.'
		);

	});
});
