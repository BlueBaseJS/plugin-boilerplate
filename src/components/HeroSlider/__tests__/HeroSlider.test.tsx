import { BlueBase, BlueBaseApp, getComponent } from '@bluebase/core';

import BootOptions from '../../../../bluebase/storybook/bluebase';
// import { ComponentState } from '@bluebase/components';
import { HeroSliderProps } from '../HeroSlider';
import { MediaType } from '../../Media/Media';
// import { Pagination } from '../Pagination';
import React from 'react';
// import SwipeableViews from '../../../lib/react-swipeable-views';
import { View } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// import { Placeholder, PlaceholderMedia } from 'rn-placeholder';

const HeroSlider = getComponent<HeroSliderProps>('HeroSlider');

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
	await waitForElement(wrapper, HeroSlider);

	const onLayout = (wrapper as any)
		.find('[testID="hero-slider-container"]')
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
	it('should render slider on Mobile', async () => {
		const wrapper = mount(
			<BBWrapper>
				<HeroSlider webItems={items} mobileItems={items} height={300} />
			</BBWrapper>
		);

		await waitForSlider(wrapper);

		expect(wrapper).toBeDefined();

		wrapper.unmount();
	});

	it('should render slider on Web', async () => {
		jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
			addEventListener: jest.fn(),
			get: () => ({ width: 1200, height: 1200 }),
		}));
		const wrapper = mount(
			<BBWrapper>
				<HeroSlider webItems={items} mobileItems={items} height={300} />
			</BBWrapper>
		);

		await waitForSlider(wrapper);

		expect(wrapper).toBeDefined();

		wrapper.unmount();
	});
});
