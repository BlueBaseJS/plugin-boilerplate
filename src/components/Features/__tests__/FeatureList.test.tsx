import { BlueBaseApp, isMobile } from '@bluebase/core';

import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { FeatureList } from '../FeatureList';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

const features = [
	{
		description:
			// tslint:disable-next-line: max-line-length
			'The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor, f/1.8 Aperture, 1.4μm Pixel Size, a Dual PD AI Portrait Mode, and an AI Scene Detection function to let you click life-like photos with impressive details.',
		title: 'AI Dual Camera',

		media: {
			height: 150,
			thumbnail: 'https://placeimg.com/5/5/tech',
			uri: 'https://placeimg.com/400/400/tech',
		},
	},
	{
		description:
			// tslint:disable-next-line: max-line-length
			'The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor, f/1.8 Aperture, 1.4μm Pixel Size, a Dual PD AI Portrait Mode, and an AI Scene Detection function to let you click life-like photos with impressive details.',
		title: 'AI Dual Camera',

		media: {
			height: 150,
			thumbnail: 'https://placeimg.com/5/5/tech',
			uri: 'https://placeimg.com/400/400/tech',
		},

		background: {
			imageStyle: { opacity: 0.25 },
			source: { uri: 'https://picsum.photos/200/300/?blur=2' },
		},
	},
	{
		description:
			// tslint:disable-next-line: max-line-length
			'The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor, f/1.8 Aperture, 1.4μm Pixel Size, a Dual PD AI Portrait Mode, and an AI Scene Detection function to let you click life-like photos with impressive details.',
		title: 'AI Dual Camera',

		media: {
			height: 150,
			thumbnail: 'https://placeimg.com/5/5/tech',
			uri: 'https://placeimg.com/400/400/tech',
		},
	},
];

describe('FeatureList', () => {
	it('should render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureList items={features} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureList');

		expect(wrapper.find('FeatureItem').length).toBe(3);
	});

	it('should render alternate sided items on desktop', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureList items={features} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureList');

		expect(
			wrapper
				.find('FeatureItem')
				.at(0)
				.prop('style')!.flexDirection
		).toBe(undefined);
		expect(
			wrapper
				.find('FeatureItem')
				.at(1)
				.prop('style')!.flexDirection
		).toBe('row-reverse');
	});

	it('should render list with bordered items', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureList items={features} variant="border" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureList');

		expect(
			wrapper
				.find('FeatureItem')
				.first()
				.prop('style')!.borderWidth
		).toBe(1);
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureList loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureList');

		expect(
			wrapper
				.find('FeatureItem')
				.first()
				.prop('loading')
		).toBe(true);

		wrapper.unmount();
	});
});
