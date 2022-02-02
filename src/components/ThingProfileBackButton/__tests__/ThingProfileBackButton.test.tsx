import { BlueBaseApp, NavigationContext } from '@bluebase/core';
import { HeaderBackButton, Noop } from '@bluebase/components';

import React from 'react';
import { ThingProfileBackButton } from '../ThingProfileBackButton';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThingProfileBackButton', () => {
	it('should render list when data is fetched successfully', async () => {
		const navigation = {
			goBack: jest.fn(),
			state: {
				params: {
					foo: 'bar',
				},
			},
		};

		const wrapper = mount(
			<BlueBaseApp components={{ HeaderBackButton: Noop }}>
				<NavigationContext.Provider value={navigation as any}>
					<ThingProfileBackButton />
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ThingProfileBackButton);

		const onPress: any = wrapper.find(HeaderBackButton).prop('onPress');

		onPress();

		expect(navigation.goBack).toHaveBeenCalledTimes(1);
		expect(navigation.goBack).toHaveBeenCalled();

		wrapper.unmount();
	});
});
