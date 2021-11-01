import { BlueBaseApp, getComponent } from '@bluebase/core';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';

import Plugin from '../../../index';
const MyPluginIcon = getComponent('MyPluginIcon');

describe('MyPluginIcon', () => {
	it('should render list when data is fetched successfully', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<MyPluginIcon />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MyPluginIcon');

		expect(
			wrapper
				.find('MyPluginIcon DynamicIcon')
				.first()
				.prop('name')
		).toBe('lightbulb-outline');
	});
});
