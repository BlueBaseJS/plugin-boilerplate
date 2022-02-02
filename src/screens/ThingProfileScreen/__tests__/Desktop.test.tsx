import { LoadingState, Noop } from '@bluebase/components';

import { BlueBaseApp } from '@bluebase/core';
import React from 'react';
import { ThingProfileScreenDesktop } from '../Desktop';
import { mount } from 'enzyme';
import wait from 'waait';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThingProfileScreenDesktop', () => {
	it('should render loading state while filter is executing', async () => {
		const wrapper = mount(
			<BlueBaseApp
				components={{ Navigator: Noop }}
				filters={{
					'mevris.app.things.routes.thing-profile.desktop': async (bo: any) => {
						await wait(500);
						return bo;
					},
				}}
			>
				<ThingProfileScreenDesktop thingId="123" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LoadingState);

		// Check if button pushs to another screen onPress
		expect(wrapper.find('LoadingState').exists()).toBe(true);
	});

	it('should render navigator', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ Navigator: Noop }}>
				<ThingProfileScreenDesktop thingId="123" />
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

		expect(routes).toHaveLength(1);
		expect(routes[0].options.tabBarIcon({ color: 'red' })).toBeTruthy();
	});
});
