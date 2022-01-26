import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { FeatureItemCollapsible } from '../FeatureItemCollapsible';
import { FeatureListCollapsible } from '../FeatureListCollapsible';
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
			thumbnail: 'https://placeimg.com/5/5/tech',
			uri: 'https://placeimg.com/400/400/tech',
		},
	},
];

describe('FeatureListCollapsible', () => {
	it('should render content', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureListCollapsible items={features} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureListCollapsible');

		expect(wrapper.find(FeatureItemCollapsible).length).toBe(3);
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureListCollapsible loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureListCollapsible');

		expect(
			wrapper
				.find(FeatureItemCollapsible)
				.first()
				.prop('loading')
		).toBe(true);

		wrapper.unmount();
	});
});
