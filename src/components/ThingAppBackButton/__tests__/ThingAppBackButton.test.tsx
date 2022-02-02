import { BlueBaseApp, NavigationContext } from '@bluebase/core';
import { HeaderBackButton, Noop } from '@bluebase/components';

import React from 'react';
import { ThingAppBackButton } from '../ThingAppBackButton';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThingAppBackButton', () => {
	it('should render list when data is fetched successfully', async () => {
		const navigation = {
			navigate: jest.fn(),
			state: {
				params: {
					foo: 'bar',
				},
			},
		};

		const wrapper = mount(
			<BlueBaseApp components={{ HeaderBackButton: Noop }}>
				<NavigationContext.Provider value={navigation as any}>
					<ThingAppBackButton />
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ThingAppBackButton);

		const onPress: any = wrapper.find(HeaderBackButton).prop('onPress');

		onPress();

		expect(navigation.navigate).toHaveBeenCalledTimes(1);
		expect(navigation.navigate).toHaveBeenCalledWith('Home');

		wrapper.unmount();
	});
});
