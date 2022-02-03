import { BlueBaseApp, getComponent } from '@bluebase/core';

import MUI from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
// import { ProgressiveImage } from '../ProgressiveImage';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const ProgressiveImage = getComponent('ProgressiveImage');
const stories = storiesOf('ProgressiveImage', module);
stories
	.add('should show ProgressiveImage with thumbnail as source', () => (
		<ProgressiveImage
			thumbnail={{ uri: 'https://robohash.org/1?set=set2&size=80x80' }}
			source={{ uri: 'https://robohash.org/1?set=set2&size=180x180' }}
			// placeholder={{ uri: 'https://robohash.org/1?set=set2&size=80x80' }}
			style={{ width: 200, height: 200 }}
			blurRadius={4}
		/>
	))
	.add('should show ProgressiveImage', () => (
		<ProgressiveImage
			thumbnail={{ uri: 'https://placeimg.com/50/50/any' }}
			source={{ uri: 'https://placeimg.com/200/200/any' }}
			style={{ width: 200, height: 200 }}
			placeholder=""
			blurRadius={8}
		/>
	))
	.add('should show Progressive Image when source is from Bluebase Assests', () => (
		<BlueBaseApp
			plugins={{ Plugin, MUI }}
			assets={{
				placeholder: 'https://robohash.org/1?set=set2&size=30x30',
				source: 'https://robohash.org/1?set=set2&size=180x180',
				thumbnail: 'https://robohash.org/1?set=set2&size=80x80',
			}}
		>
			<ProgressiveImage
				thumbnail="thumbnail"
				source="source"
				style={{ width: 200, height: 200 }}
				placeholder="placeholder"
				blurRadius={8}
			/>
		</BlueBaseApp>
	));
