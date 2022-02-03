import { BlueBaseApp, getComponent } from '@bluebase/core';

import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const StatusIcon = getComponent('StatusIcon');

/**
 * Mocking expo Library
 */

jest.mock('expo', () => ({}));

describe('StatusIcon', () => {
	it('should show an orange icon', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI, MaterialCommunityIcons]}>
				<StatusIcon color={'orange'} />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, StatusIcon);
		expect(
			wrapper.find('StatusIcon DynamicIcon[testID="status-icon-color"]').last().props().color
		).toBe('#ff9800');
	});

	it('should show a red icon', async () => {
		// UnitTest With RedColor
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI, MaterialCommunityIcons]}>
				<StatusIcon color={'red'} />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, StatusIcon);
		expect(
			wrapper.find('StatusIcon DynamicIcon[testID="status-icon-color"]').last().props().color
		).toBe('#f44336');
	});

	it('should show a green icon', async () => {
		// UnitTest With GreenColor
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI, MaterialCommunityIcons]}>
				<StatusIcon color={'green'} />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, StatusIcon);
		expect(
			wrapper.find('StatusIcon DynamicIcon[testID="status-icon-color"]').last().props().color
		).toBe('#4caf50');
	});

	it('should show an orange icon by default', async () => {
		// UnitTest Without Color
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI, MaterialCommunityIcons]}>
				<StatusIcon />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, StatusIcon);
		expect(
			wrapper.find('StatusIcon DynamicIcon[testID="status-icon-color"]').last().props().color
		).toBe('#ff9800');
	});
});
