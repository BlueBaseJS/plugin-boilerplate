import { BlueBase, BlueBaseApp, getComponent } from '@bluebase/core';
import { Placeholder, PlaceholderMedia } from 'rn-placeholder';

import BootOptions from '../../../../bluebase/storybook/bluebase';
import { ComponentState } from '@bluebase/components';
import { MediaSliderProps } from '../MediaSlider';
import { MediaType } from '../../Media/Media';
import { Pagination } from '../Pagination';
import React from 'react';
import SwipeableViews from '../../../lib/react-swipeable-views';
import { View } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const MediaSlider = getComponent<MediaSliderProps>('MediaSlider');

const items: MediaType[] = [
	{
		type: 'image',
		uri: 'https://placeimg.com/640/480/animals',
	},
	{
		type: 'image',
		uri: 'https://placeimg.com/640/480/arch',
	},
	{
		type: 'image',
		uri: 'https://placeimg.com/640/480/nature',
	},
	{
		type: 'image',
		uri: 'https://placeimg.com/640/480/people',
	},
	{
		type: 'image',
		uri: 'https://placeimg.com/640/480/tech',
	},
];

// const Noop = () => {
// 	return;
// };

// const NavigationActions = ({ children }: any) => children({ navigation: Noop });

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
		<View style={{ width: 500 }}>{children}</View>
	</BlueBaseApp>
);

async function waitForSlider(wrapper: any) {
	await waitForElement(wrapper, MediaSlider);

	const onLayout = (wrapper as any)
		.find('[testID="media-slider-container"]')
		.first()
		.prop('onLayout');

	onLayout({
		nativeEvent: {
			layout: {
				width: 500,
			},
		},
	});

	wrapper.update();
}

describe('MediaSlider', () => {
	it('should render slider with 5 slides', async () => {
		const wrapper = mount(
			<BBWrapper>
				<MediaSlider items={items} height={300} />
			</BBWrapper>
		);

		await waitForSlider(wrapper);

		expect(
			wrapper
				.find(Pagination)
				.last()
				.prop('dots')
		).toBe(5);

		wrapper.unmount();
	});

	it('should show error message for unknow media types', async () => {
		const _items: MediaType[] = [{ type: 'video', uri: 'https://placeimg.com/640/480/tech' }];

		const wrapper = mount(
			<BBWrapper>
				<MediaSlider items={_items} height={300} />
			</BBWrapper>
		);

		await waitForSlider(wrapper);

		expect(
			wrapper
				.find(ComponentState)
				.last()
				.prop('title')
		).toBe('Unknown Media Type');

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BBWrapper>
				<MediaSlider items={items} height={300} loading />
			</BBWrapper>
		);

		await waitForElement(wrapper, Placeholder);

		expect(wrapper.find(PlaceholderMedia)).toHaveLength(1);

		wrapper.unmount();
	});

	it('should handle switching if type is end', async () => {
		const wrapper = mount(
			<BBWrapper>
				<MediaSlider items={items} height={300} />
			</BBWrapper>
		);

		await waitForSlider(wrapper);

		const onSwitching: any = wrapper.find(SwipeableViews).prop('onSwitching');

		onSwitching(2, 'end');
		wrapper.update();

		const index = wrapper.find(SwipeableViews).prop('index');

		expect(index).toBe(2);

		wrapper.unmount();
	});

	it('should not handle switching if type is move', async () => {
		const wrapper = mount(
			<BBWrapper>
				<MediaSlider items={items} height={300} />
			</BBWrapper>
		);

		await waitForSlider(wrapper);

		const onSwitching: any = wrapper.find(SwipeableViews).prop('onSwitching');

		onSwitching(2, 'move');
		wrapper.update();

		const index = wrapper.find(SwipeableViews).prop('index');

		expect(index).toBe(0);

		wrapper.unmount();
	});
});
