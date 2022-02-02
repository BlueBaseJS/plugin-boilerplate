import { BlueBaseApp, NavigationContext } from '@bluebase/core';
import { HeaderBackButton, Noop } from '@bluebase/components';

import React from 'react';
import { ThingSettingsBackButton } from '../ThingSettingsBackButton';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThingSettingsBackButton', () => {
	it('should render list when data is fetched successfully', async () => {
		const navigation = {
			navigate: jest.fn(),
			state: {
				params: {
					thingId: '123',
				},
			},
		};

		const wrapper = mount(
			<BlueBaseApp components={{ HeaderBackButton: Noop }}>
				<NavigationContext.Provider value={navigation as any}>
					<ThingSettingsBackButton />
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ThingSettingsBackButton);

		const onPress: any = wrapper.find(HeaderBackButton).prop('onPress');

		onPress();

		expect(navigation.navigate).toHaveBeenCalledTimes(1);
		expect(navigation.navigate).toHaveBeenCalledWith('ThingProfile', {
			thingId: '123',
		});

		wrapper.unmount();
	});
});
