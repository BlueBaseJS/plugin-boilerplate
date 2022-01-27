import { BlueBaseApp, ThemeProvider, getComponent } from '@bluebase/core';
// import { ProgressiveImage } from '../ProgressiveImage';
import React, { useCallback } from 'react';

import { Button } from '@bluebase/components';
import MUI from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import storiesOf from '@bluebase/storybook-addon';

const ProgressiveImageBackground = getComponent('ProgressiveImageBackground');
const Text = getComponent('Text');
const stories = storiesOf('ProgressiveImageBackground', module);
stories
	.add('should show ProgressiveImageBackground with thumbnail as source', () => (
		<ProgressiveImageBackground
			thumbnail={{ uri: 'https://robohash.org/1?set=set2&size=80x80' }}
			source={{ uri: 'https://robohash.org/1?set=set2&size=180x180' }}
			// placeholder={{ uri: 'https://robohash.org/1?set=set2&size=80x80' }}
			style={{ width: 200, height: 200 }}
			blurRadius={4}
		>
			<Text>Pakistan</Text>
		</ProgressiveImageBackground>
	))
	.add('should show ProgressiveImageBackground', () => (
		<ProgressiveImageBackground
			thumbnail={{ uri: 'https://placeimg.com/50/50/any' }}
			source={{ uri: 'https://placeimg.com/200/200/any' }}
			style={{ width: 200, height: 200 }}
			placeholder=""
			blurRadius={8}
		>
			<Text>Pakistan</Text>
			<Button
				title="Hello"
				style={{ alignSelf: 'center' }}
				onPress={useCallback(() => console.log('Pressed'), [])}
			/>
		</ProgressiveImageBackground>
	))
	.add('should show Progressive Image Background when source is from Bluebase Assests', () => (
		<BlueBaseApp
			plugins={{ Plugin, MUI }}
			assets={{
				placeholder: 'https://robohash.org/1?set=set2&size=30x30',
				source: 'https://robohash.org/1?set=set2&size=180x180',
				thumbnail: 'https://robohash.org/1?set=set2&size=80x80',
			}}
		>
			<ThemeProvider mode="dark">
				<ProgressiveImageBackground
					thumbnail="thumbnail"
					source="source"
					style={{ width: 200, height: 200 }}
					placeholder="placeholder"
					blurRadius={8}
				>
					<Text>Pakistan</Text>
				</ProgressiveImageBackground>
			</ThemeProvider>
		</BlueBaseApp>
	));
