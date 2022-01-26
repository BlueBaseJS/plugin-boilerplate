import { FeatureListCollapsible } from '../FeatureListCollapsible';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

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

storiesOf('Features/Parts/FeatureListCollapsible', module)
	.add('Normal State', () => <FeatureListCollapsible items={features} />)
	.add('Loading State', () => <FeatureListCollapsible loading />);
