import 'cross-fetch/polyfill';

import { BlueBaseApp } from '@bluebase/core';
import React from 'react';
import { ShippingMethodListEmptyState } from '../ShippingMethodListEmptyState';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// jest.mock('NativeAnimatedHelper');

describe('ShippingMethodListEmptyState', () => {
	it('should render ComponentState', async () => {
		// mount
		const wrapper = mount(
			<BlueBaseApp >
				<ShippingMethodListEmptyState />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ShippingMethodListEmptyState);

		expect(wrapper.find('ComponentState').exists()).toBe(true);

		wrapper.unmount();
	});
});
