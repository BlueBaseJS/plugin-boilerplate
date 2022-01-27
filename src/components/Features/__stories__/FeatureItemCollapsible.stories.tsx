import { FeatureItemCollapsible } from '../FeatureItemCollapsible';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('Features/Parts/FeatureItemCollapsible', module)
	.add('Normal State', () => (
		<FeatureItemCollapsible
			title="AI Dual Camera"
			// tslint:disable-next-line: max-line-length
			description="The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor, f/1.8 Aperture, 1.4μm Pixel Size, a Dual PD AI Portrait Mode, and an AI Scene Detection function to let you click life-like photos with impressive details."
			media={{
				thumbnail: 'https://placeimg.com/5/5/tech',
				uri: 'https://placeimg.com/400/400/tech',
			}}
		/>
	))
	.add('Loading State', () => <FeatureItemCollapsible loading />);
