import { BlueBase, BlueBaseApp, getComponent } from '@bluebase/core';

import { AvatarVariantSelectorItemProps } from '../../AvatarVariantSelectorItem';
import BootOptions from '../../../../boot';
import React from 'react';
import { VariantSelectorProps } from '../VariantSelector';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// const Noop = () => {
// 	return;
// };

// const NavigationActions = ({ children }: any) => children({ navigation: Noop });

const AvatarVariantSelectorItem = getComponent<AvatarVariantSelectorItemProps>(
	'AvatarVariantSelectorItem'
);
const VariantSelector = getComponent<VariantSelectorProps>('VariantSelector');

const BBWrapper = ({ children }: any) => (
	<BlueBaseApp
		{...BootOptions}
		filters={{
			'bluebase.boot.end': async (_b: any, _c: any, BB: BlueBase) => {
				// await BB.Components.register('NavigationActions', NavigationActions);
				await BB.Components.register('Link', ({ children: c }: any) => c);
			},
		}}
	>
		{children}
	</BlueBaseApp>
);

const items = [
	{
		style: { backgroundColor: 'red' },
		text: 'A',
		type: 'text',
	},
	{
		style: { backgroundColor: 'blue' },
		text: 'B',
		type: 'text',
	},
	{
		style: { backgroundColor: 'green' },
		text: 'C',
		type: 'text',
	},
];

describe('VariantSelector', () => {
	it('should render 3 Avatars', async () => {
		const onChangeIndex = jest.fn();
		const onChangeHover = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<VariantSelector
					ItemComponent={AvatarVariantSelectorItem}
					index={1}
					items={items}
					size="small"
					onChangeIndex={onChangeIndex}
					onChangeHover={onChangeHover}
				/>
			</BBWrapper>
		);

		await waitForElement(wrapper, 'VariantSelector');

		expect(wrapper.find(VariantSelector).find(AvatarVariantSelectorItem)).toHaveLength(3);

		wrapper.unmount();
	});

	it('should respond to hover states', async () => {
		const onChangeIndex = jest.fn();
		const onChangeHover = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<VariantSelector
					ItemComponent={AvatarVariantSelectorItem}
					index={1}
					items={items}
					size="small"
					onChangeIndex={onChangeIndex}
					onChangeHover={onChangeHover}
				/>
			</BBWrapper>
		);

		await waitForElement(wrapper, 'VariantSelector');

		// There should be no items in hovering state
		expect(
			wrapper
				.find(VariantSelector)
				.find('VariantSelector HoverObserver AvatarVariantSelectorItem[hovering=true]').length
		).toBe(0);

		// Extract onHover handler of an item
		const onHoverChangedHandler: any = wrapper
			.find(VariantSelector)
			.find('VariantSelector HoverObserver')
			.findWhere(node => node.key() === '1')
			.prop('onHoverChanged');

		// Simulate hover
		onHoverChangedHandler({ isHovering: true });

		// Update true
		wrapper.update();

		// There should be item with index 1 with hover state
		expect(
			wrapper
				.find(VariantSelector)
				.find('VariantSelector HoverObserver AvatarVariantSelectorItem[hovering=true]')
				.first()
				.prop('index')
		).toBe(1);

		expect(onChangeHover).toHaveBeenCalledTimes(1);
		expect(onChangeHover).toHaveBeenCalledWith(1, true);

		// Simulate hover out
		onHoverChangedHandler({ isHovering: false });

		// Update true
		wrapper.update();

		// There should be no items in hovering state
		expect(
			wrapper
				.find(VariantSelector)
				.find('VariantSelector HoverObserver AvatarVariantSelectorItem[hovering=true]').length
		).toBe(0);

		expect(onChangeHover).toHaveBeenCalledTimes(2);
		expect(onChangeHover).toHaveBeenCalledWith(1, false);

		wrapper.unmount();
	});

	it('should respond to hover states but onChangeHover should not fire when its undefined', async () => {
		const onChangeIndex = jest.fn();
		const onChangeHover = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<VariantSelector
					ItemComponent={AvatarVariantSelectorItem}
					index={1}
					items={items}
					size="small"
					onChangeIndex={onChangeIndex}
				/>
			</BBWrapper>
		);

		await waitForElement(wrapper, 'VariantSelector');

		// Extract onHover handler of an item
		const onHoverChangedHandler: any = wrapper
			.find(VariantSelector)
			.find('VariantSelector HoverObserver')
			.findWhere(node => node.key() === '1')
			.prop('onHoverChanged');

		// Simulate hover
		onHoverChangedHandler({ isHovering: true });

		// Update true
		wrapper.update();

		expect(onChangeHover).toHaveBeenCalledTimes(0);

		wrapper.unmount();
	});
});
