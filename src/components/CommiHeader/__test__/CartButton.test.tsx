import { BlueBaseApp } from '@bluebase/core';
import BlueBaseMaterialUI from '@bluebase/plugin-material-ui';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { CartButton } from '../CartButton';
import { IconButton } from '@bluebase/components';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, BlueBaseMaterialUI, Plugin];

describe('CartButton', () => {
	it('should render icon without badge', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<CartButton />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, CartButton);

		expect(wrapper.find(IconButton).prop('name')).toBe('cart');
		expect(wrapper.find('[testID="cart-button-badge"]').exists()).toBe(false);

		wrapper.unmount();
	});

	it('should render icon with single digit badge', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<CartButton count={5} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, CartButton);

		expect(wrapper.find(IconButton).prop('name')).toBe('cart');
		expect(
			wrapper
				.find('[testID="cart-button-badge"] Text')
				.last()
				.text()
		).toBe('5');

		wrapper.unmount();
	});

	it('should render icon with tripple digit badge', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<CartButton count={555} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, CartButton);

		expect(wrapper.find(IconButton).prop('name')).toBe('cart');
		expect(
			wrapper
				.find('[testID="cart-button-badge"] Text')
				.last()
				.text()
		).toBe('99+');

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<CartButton loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, CartButton);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
