import { BlueBaseApp, Theme, getComponent } from '@bluebase/core';

import { PlaceholderLine } from 'rn-placeholder';
import Plugin from '../../..';
import { PriceProps } from '../Price';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [Plugin];

const Price = getComponent<PriceProps>('Price');

describe('Price', () => {
	it('should render small size prices', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Price size="small" price={24999} compareAtPrice={34999} percentage={10} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Price');

		const theme = new Theme();

		expect(
			wrapper
				.find('Text[testID="price"]')
				.last()
				.text()
		).toBe('Rs. 24,999');

		expect(
			wrapper
				.find('Text[testID="price"]')
				.first()
				.prop('style')!.fontSize
		).toBe(theme.typography.button.fontSize);
	});

	it('should render medium size prices', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Price size="medium" price={24999} compareAtPrice={34999} percentage={10} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Price');

		const theme = new Theme();

		expect(
			wrapper
				.find('Text[testID="price"]')
				.last()
				.text()
		).toBe('Rs. 24,999');

		expect(
			wrapper
				.find('Text[testID="price"]')
				.first()
				.prop('style')!.fontSize
		).toBe(theme.typography.body1.fontSize);
	});

	it('should render large size prices', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Price size="large" price={24999} compareAtPrice={34999} percentage={10} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Price');

		const theme = new Theme();

		expect(
			wrapper
				.find('Text[testID="price"]')
				.last()
				.text()
		).toBe('Rs. 24,999');

		expect(
			wrapper
				.find('Text[testID="price"]')
				.first()
				.prop('style')!.fontSize
		).toBe(theme.typography.h5.fontSize);
	});

	it('should fall back to medium size if no size is given', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Price size={null as any} price={24999} compareAtPrice={34999} percentage={10} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Price');

		const theme = new Theme();

		expect(
			wrapper
				.find('Text[testID="price"]')
				.last()
				.text()
		).toBe('Rs. 24,999');

		expect(
			wrapper
				.find('Text[testID="price"]')
				.first()
				.prop('style')!.fontSize
		).toBe(theme.typography.body1.fontSize);
	});

	it('should use column layout', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Price direction="column" price={24999} compareAtPrice={34999} percentage={10} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Price');

		expect(
			wrapper
				.find('View[testID="price-container"]')
				.first()
				.prop('style')!.flexDirection
		).toBe('column');
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Price loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Price');

		expect(wrapper.find(PlaceholderLine).length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
