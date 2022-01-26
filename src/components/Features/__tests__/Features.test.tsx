import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { Features } from '../Features';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [BlueBasePluginMaterialUI, BlueBaseRnPlaceholder, Plugin];

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

describe('Features', () => {
	it('should render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Features items={features} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Features');

		expect(wrapper.find('FeatureList').exists()).toBe(true);
	});

	it('should render collapsible', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Features items={features} type="collapsible" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Features');

		expect(wrapper.find('FeatureListCollapsible').exists()).toBe(true);
	});
});
