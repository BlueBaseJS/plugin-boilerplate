import { BlueBaseApp, getComponent } from '@bluebase/core';

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

const CameraPermissionDeniedView = getComponent('CameraPermissionDeniedView');


describe('CameraPermissionDeniedView', () => {
	it('Testing Props', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin, MaterialCommunityIcons]}>
				<CameraPermissionDeniedView
					styles={{
						root: {
							justifyContent: 'center',
							padding: 30,
						},

						componentState: {
							root: {
								marginBottom: 10,
								paddingHorizontal: 10,
							},
						},
						image: {
							height: 250,
							resizeMode: 'contain',
							width: 250,
						},
					}}
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, CameraPermissionDeniedView);

		// expect(
		// 	wrapper
		// 		.find('ComponentState')
		// 		.first()
		// 		.find('H6').length
		// ).toBe(1);
		expect(
			wrapper
				.find('ComponentState')
				.first()
				.prop('description')
		).toBe(
			// eslint-disable-next-line max-len
			'Without this permission, the app is unable to access your photo gallery to take or update pictures for your profile, things and places.'
		);
		expect(
			wrapper
				.find('ComponentState')
				.first()
				.prop('styles')
		).toEqual({
			root: {
				marginBottom: 10,
				paddingHorizontal: 10,
			},
		});
		expect(
			wrapper
				.find('ComponentState')
				.first()
				.prop('description')
		).toBe(
			// eslint-disable-next-line max-len
			'Without this permission, the app is unable to access your photo gallery to take or update pictures for your profile, things and places.'
		);

		const node = wrapper.find('ComponentState BlueBaseImage');

		expect(node.last().prop('style')).toEqual({
			height: 250,
			resizeMode: 'contain',
			width: 250,
		});

		wrapper.unmount();
	});
});
