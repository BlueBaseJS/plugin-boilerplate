import { BlueBaseApp, getComponent } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';

import Plugin from '../../../index';
import { PulseProps } from '../Pulse';

/**
 * Mocking expo Library
 */

jest.mock('expo', () => ({}));

const Pulse = getComponent<PulseProps>('Pulse');

describe('Pulse', () => {
	it('should render a view with default width', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI, MaterialCommunityIcons]}>
				<Pulse />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Pulse);

		expect((wrapper as any).find('View[testID="pulse-view"]').first().prop('style').width).toBe(30);

		wrapper.unmount();
	});

	it('should render a view with default size', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI, MaterialCommunityIcons]}>
				<Pulse size={undefined} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Pulse);

		expect((wrapper as any).find('View[testID="pulse-view"]').first().prop('style').width).toBe(30);

		wrapper.unmount();
	});

	it('should render a view with custom width', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI, MaterialCommunityIcons]}>
				<Pulse size={100} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Pulse);

		expect((wrapper as any).find('View[testID="pulse-view"]').first().prop('style').width).toBe(
			100
		);

		wrapper.unmount();
	});

	it('should not throw exceptions even when used directly without BlueBase', async () => {
		const PulseComponent = require('../Pulse').Pulse;

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI, MaterialCommunityIcons]}>
				<PulseComponent />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, PulseComponent);

		expect((wrapper as any).find('View[testID="pulse-view"]').first().prop('style').width).toBe(30);

		wrapper.unmount();
	});
});
