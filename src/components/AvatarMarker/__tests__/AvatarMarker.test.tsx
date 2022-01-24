import { BlueBaseApp, getComponent } from '@bluebase/core';

import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

/**
 * Mocking expo Library
 */

jest.mock('expo', () => ({}));

const AvatarMarker = getComponent('AvatarMarker');

describe('AvatarMarker', () => {
	it('should show a ComponentState with "Location" title ', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI, MaterialCommunityIcons]}>
				<AvatarMarker type="image" image={{ uri: 'https://placeimg.com/200/200/people' }} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Avatar');

		expect(
			wrapper
				.find('Avatar')
				.first()
				.prop('type')
		).toBe('image');

		expect(
			wrapper
				.find('Avatar')
				.first()
				.prop('image')
		).toMatchObject({ uri: 'https://placeimg.com/200/200/people' });
	});

	it('should not throw exceptions even when used directly without BlueBase', async () => {
		const AvatarMarkerComponent = require('../AvatarMarker').AvatarMarker;

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI, MaterialCommunityIcons]}>
				<AvatarMarkerComponent
					type="image"
					image={{ uri: 'https://placeimg.com/200/200/people' }}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Avatar');

		expect(
			wrapper
				.find('Avatar')
				.first()
				.prop('type')
		).toBe('image');

		expect(
			wrapper
				.find('Avatar')
				.first()
				.prop('image')
		).toMatchObject({ uri: 'https://placeimg.com/200/200/people' });
	});
});
