import { BlueBaseApp } from '@bluebase/core';
import { Noop } from '@bluebase/components';
import React from 'react';
import { ThingProfileScreenMobile } from '../Mobile';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThingProfileScreenMobile', () => {
	it('should render navigator', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ Navigator: Noop }}>
				<ThingProfileScreenMobile thingId="123" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Navigator');

		// Check if button pushs to another screen onPress
		expect(
			wrapper
				.find('Navigator')
				.first()
				.prop('type')
		).toBe('tab');

		const routes: any = wrapper
			.find('Navigator')
			.first()
			.prop('routes');

		expect(routes).toHaveLength(2);
		expect(routes[0].options.tabBarIcon({ color: 'red' })).toBeTruthy();
		expect(routes[1].options.tabBarIcon({ color: 'red' })).toBeTruthy();
	});
});
