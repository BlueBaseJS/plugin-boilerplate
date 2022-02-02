import { BlueBaseApp, NavigationContext } from '@bluebase/core';
import { IconButton, Noop } from '@bluebase/components';

import React from 'react';
import { ThingAppAddButton } from '../ThingAppAddButton';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThingAppAddButton', () => {
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
			<BlueBaseApp components={{ IconButton: Noop }}>
				<NavigationContext.Provider value={navigation as any}>
					<ThingAppAddButton />
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ThingAppAddButton);

		expect(
			wrapper
				.find(IconButton)
				.first()
				.prop('name')
		).toBe('plus');

		const onPress: any = wrapper.find(IconButton).prop('onPress');

		onPress();

		expect(navigation.navigate).toHaveBeenCalledTimes(1);
		expect(navigation.navigate).toHaveBeenCalledWith('ProductsApp',{placeId: null});

		wrapper.unmount();
	});
});
