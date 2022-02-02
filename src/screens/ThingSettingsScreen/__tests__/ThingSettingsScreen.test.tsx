import { BlueBaseApp } from '@bluebase/core';
import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThingSettingsScreen', () => {
	it('should render children as is', async () => {
		const ThingSettingsScreen = require('../index').default;
		const wrapper = mount(
			<BlueBaseApp>
				<ThingSettingsScreen>
					<Text>Hello</Text>
				</ThingSettingsScreen>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ThingSettingsScreen);

		expect(wrapper.text()).toBe('Hello');
	});
});
