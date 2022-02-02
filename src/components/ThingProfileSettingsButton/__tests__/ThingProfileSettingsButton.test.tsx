import { BlueBaseApp, NavigationContext } from '@bluebase/core';
import { IconButton, Noop } from '@bluebase/components';

import React from 'react';
import { ThingProfileSettingsButton } from '../ThingProfileSettingsButton';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ThingProfileSettingsButton', () => {
	it('should render list when data is fetched successfully', async () => {
		const navigation = {
			push: jest.fn(),
			state: {
				params: {
					foo: 'bar',
				},
			},
		};

		const route = {
			params: {
				foo:"bar"
			}
		}

		const wrapper = mount(
			<BlueBaseApp components={{ IconButton: Noop }}>
				<NavigationContext.Provider value={navigation as any}>
					<ThingProfileSettingsButton params={route.params} />
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ThingProfileSettingsButton);

		expect(
			wrapper
				.find(IconButton)
				.first()
				.prop('name')
		).toBe('cog');

		const onPress: any = wrapper.find(IconButton).prop('onPress');

		onPress();

		expect(navigation.push).toHaveBeenCalledTimes(1);
		expect(navigation.push).toHaveBeenCalledWith('ThingSettings', {
			foo: 'bar',
		});

		wrapper.unmount();
	});
});
