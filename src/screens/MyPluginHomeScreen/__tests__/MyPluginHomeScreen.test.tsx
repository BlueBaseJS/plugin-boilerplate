
import { BlueBaseApp, getComponent } from '@bluebase/core';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';

import Plugin from '../../..';

const plugins = [
	Plugin,
];

describe('MyPluginHomeScreen', () => {
	it('should render a PlaceGrid', async () => {
		const MyPluginHomeScreen = getComponent('MyPluginHomeScreen');

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MyPluginHomeScreen />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MyPluginHomeScreen');

		expect(wrapper.find('MyPluginHomeScreen Button').length).toBeGreaterThan(0);
	});

});
