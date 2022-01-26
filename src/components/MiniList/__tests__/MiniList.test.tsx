import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { MiniList } from '../MiniList';
import { MiniListItem } from '../../MiniListItem';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [BlueBasePluginMaterialUI, BlueBaseRnPlaceholder, Plugin];

describe('MiniList', () => {
	it('should render content', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MiniList
					items={[
						{
							icon: 'decagram',
							title: 'Brand Warranty',
						},
						{
							action: 'Learn More',
							icon: 'truck-fast',
							title: 'Same Day Delivery',
						},
						{
							icon: 'cash',
							title: 'Cash on Delivery',
						},
						{
							icon: 'swap-horizontal',
							title: 'Easy Returns & Exchanges',
						},
					]}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MiniList');

		expect(wrapper.find(MiniListItem).length).toBe(4);
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MiniList loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MiniList');

		expect(
			wrapper
				.find(MiniList)
				.first()
				.prop('loading')
		).toBe(true);

		wrapper.unmount();
	});
});
