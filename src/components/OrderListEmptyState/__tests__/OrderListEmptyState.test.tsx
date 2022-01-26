import 'cross-fetch/polyfill';

import { BlueBaseApp } from '@bluebase/core';
import { OrderListEmptyState } from '../OrderListEmptyState';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// jest.mock('NativeAnimatedHelper');

describe('OrderListEmptyState', () => {
	it('should render ComponentState', async () => {
		// mount
		const wrapper = mount(
			<BlueBaseApp >
				<OrderListEmptyState />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, OrderListEmptyState);

		expect(wrapper.find('ComponentState').exists()).toBe(true);

		wrapper.unmount();
	});
});
