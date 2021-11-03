
import { BlueBaseApp, getComponent } from '@bluebase/core';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';

import Plugin from '../../..';

const plugins = [
	Plugin,
];

describe('MyPluginSecondScreen', () => {
	it('should render a PlaceGrid', async () => {
		const MyPluginSecondScreen = getComponent('MyPluginSecondScreen');

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MyPluginSecondScreen />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MyPluginSecondScreen');

		expect(wrapper.find('MyPluginSecondScreen Button').length).toBeGreaterThan(0);
	});

});
