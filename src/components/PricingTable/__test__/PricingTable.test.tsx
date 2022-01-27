import { PricingTable, calculateTotal } from '../';

import { BlueBaseApp } from '@bluebase/core';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('PricingTable', () => {
	it('should not crash when only subTotal prop is given', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<PricingTable subTotal={463} tax={33} shipping={40} discount={20} />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'PricingTable');
		expect(wrapper.find('View[testID="ItemView"]').exists()).toBe(true);
		const root: any = wrapper
			.find('Body2[testID="valueView"]')
			.first()
			.children()
			.props();
		expect(root.children).toBe('Rs. 463');
		expect(calculateTotal({})).toBe(0);
		wrapper.unmount();
	});

	it('should check if total is calcuating properly on mobile', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<PricingTable subTotal={300} />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'PricingTable');
		expect(wrapper.find('View[testID="ItemView"]').exists()).toBe(true);

		const root: any = wrapper
			.find('Body2[testID="valueView"]')
			.last()
			.children()
			.props();
		expect(root.children).toBe('Rs. 300');

		const title: any = wrapper
			.find('Body2[testID="labelView"]')
			.last()
			.children()
			.last()
			.text();
		expect(title).toBe('Subtotal');
		wrapper.unmount();
	});

	it('should check if total is calcuating properly on mobile', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<PricingTable subTotal={300} loading />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'PricingTable');
		expect(wrapper.find('PricingTableSkeleton').exists()).toBe(true);
		wrapper.unmount();
	});

	it('should check if total is calcuating properly on web', async () => {

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<PricingTable />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'PricingTable');
		expect(wrapper.find('View[testID="ItemView"]').exists()).toBe(true);

		const root: any = wrapper
			.find('Body2[testID="valueView"]')
			.last()
			.children()
			.props();
		expect(root.children).toBe('Rs. 0');

		const title: any = wrapper
			.find('Body2[testID="labelView"]')
			.last()
			.children()
			.last()
			.text();
		expect(title).toBe('Subtotal');
		wrapper.unmount();
	});
});
