import { FeatureItem } from '../FeatureItem';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('Features/Parts/FeatureItem', module)
	.add('Normal State', () => (
		<FeatureItem
			title="AI Dual Camera"
			// tslint:disable-next-line: max-line-length
			description="The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor, f/1.8 Aperture, 1.4μm Pixel Size, a Dual PD AI Portrait Mode, and an AI Scene Detection function to let you click life-like photos with impressive details."
			media={{
				thumbnail: 'https://placeimg.com/5/5/tech',
				uri: 'https://placeimg.com/400/400/tech',
			}}
			background={{
				imageStyle: { opacity: 0.25 },
				source: { uri: 'https://picsum.photos/200/300/?blur=2' },
			}}
		/>
	))
	.add('Loading State', () => <FeatureItem loading />);
