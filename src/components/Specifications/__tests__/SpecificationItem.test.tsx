import { BlueBaseApp, isMobile } from '@bluebase/core';

import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { PlaceholderLine } from 'rn-placeholder';
import Plugin from '../../..';
import React from 'react';
import { SpecificationItem } from '../SpecificationItem';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

describe('SpecificationItem', () => {
	it('should render content on mobile', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<SpecificationItem label="SIM Size" value="Nano SIM" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'SpecificationItem');

		expect(
			wrapper
				.find('[testID="specification-item-label-container"]')
				.first()
				.prop('style')!.width
		).toBe('35%');

		expect(
			wrapper
				.find('[testID="specification-item-value-container"]')
				.first()
				.prop('style')!.width
		).toBe('65%');

		expect(
			wrapper
				.find('Body2[testID="specification-item-label"]')
				.last()
				.text()
		).toBe('SIM Size');

		expect(
			wrapper
				.find('Body2[testID="specification-item-value"]')
				.last()
				.text()
		).toBe('Nano SIM');
	});

	it('should render content on desktop', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<SpecificationItem label="SIM Size" value="Nano SIM" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'SpecificationItem');

		expect(
			wrapper
				.find('[testID="specification-item-label-container"]')
				.first()
				.prop('style')!.width
		).toBe('25%');

		expect(
			wrapper
				.find('[testID="specification-item-value-container"]')
				.first()
				.prop('style')!.width
		).toBe('75%');

		expect(
			wrapper
				.find('Body2[testID="specification-item-label"]')
				.last()
				.text()
		).toBe('SIM Size');

		expect(
			wrapper
				.find('Body2[testID="specification-item-value"]')
				.last()
				.text()
		).toBe('Nano SIM');
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<SpecificationItem loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'SpecificationItem');

		expect(wrapper.find(PlaceholderLine).length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
