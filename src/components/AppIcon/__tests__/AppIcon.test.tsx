import { BlueBaseApp, getComponent } from '@bluebase/core';

import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [Plugin];

const ThingsAppIcon = getComponent('ThingsAppIcon');

describe('ThingsAppIcon', () => {
	it('should render list when data is fetched successfully', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<ThingsAppIcon />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'ThingsAppIcon');

		expect(
			wrapper
				.find('ThingsAppIcon DynamicIcon')
				.first()
				.prop('name')
		).toBe('lightbulb-outline');
	});
});
