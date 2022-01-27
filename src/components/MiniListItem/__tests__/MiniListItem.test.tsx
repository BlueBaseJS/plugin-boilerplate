import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { MiniListItem } from '../MiniListItem';
import { PlaceholderLine } from 'rn-placeholder';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [BlueBaseRnPlaceholder, Plugin];

describe('MiniListItem', () => {
	it('should render content on mobile', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MiniListItem title="Brand Warranty" icon="decagram" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MiniListItem');

		expect(
			wrapper
				.find('[testID="specification-item-icon-container"] Icon')
				.first()
				.prop('name')
		).toBe('decagram');

		expect(
			wrapper
				.find('[testID="specification-item-title-container"] Text')
				.last()
				.text()
		).toBe('Brand Warranty');
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<MiniListItem loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'MiniListItem');

		expect(wrapper.find(PlaceholderLine).length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
