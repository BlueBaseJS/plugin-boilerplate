jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(false),
}));

import { BlueBaseApp, isMobile } from '@bluebase/core';

import { Noop } from '@bluebase/components';
import React from 'react';
import { ThingProfileScreen } from '../ThingProfileScreen';
import { ThingProfileScreenDesktop } from '../Desktop';
import { ThingProfileScreenMobile } from '../Mobile';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThingProfileScreen', () => {
	it('should render ThingProfileScreenMobile on mobile', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);

		const wrapper = mount(
			<BlueBaseApp components={{ Navigator: Noop }}>
				<ThingProfileScreen thingId="123" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ThingProfileScreen);

		// Check if button pushs to another screen onPress
		expect(wrapper.find(ThingProfileScreenMobile).exists()).toBe(true);
	});

	it('should render ThingProfileScreenDesktop on desktop', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const wrapper = mount(
			<BlueBaseApp components={{ Navigator: Noop }}>
				<ThingProfileScreen thingId="123" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ThingProfileScreen);

		// Check if button pushs to another screen onPress
		expect(wrapper.find(ThingProfileScreenDesktop).exists()).toBe(true);
	});
});
