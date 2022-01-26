import 'cross-fetch/polyfill';

import { BlueBaseApp } from '@bluebase/core';
import { PaymentMethodListEmptyState } from '../PaymentMethodListEmptyState';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// jest.mock('NativeAnimatedHelper');

describe('PaymentMethodListEmptyState', () => {
	it('should render ComponentState', async () => {
		// mount
		const wrapper = mount(
			<BlueBaseApp>
				<PaymentMethodListEmptyState />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, PaymentMethodListEmptyState);

		expect(wrapper.find('ComponentState').exists()).toBe(true);

		wrapper.unmount();
	});
});
