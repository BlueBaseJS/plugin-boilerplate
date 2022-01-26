import { BlueBase, BlueBaseApp, buildTheme, getComponent } from '@bluebase/core';

import BootOptions from '../../../../boot';
import { Card } from '@bluebase/components';
import { MediaSliderProps } from '../MediaSlider';
import { MediaType } from '../../Media/Media';
import React from 'react';
import { SafeAreaView } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';

const MediaSlider = getComponent<MediaSliderProps>('MediaSlider');

const Noop = () => {
	return;
};

const NavigationActions = ({ children }: any) => children({ navigation: Noop });

const BBWrapper = ({ children }: any) => (
	<BlueBaseApp
		{...BootOptions}
		filters={{
			'bluebase.boot.end': async (_b: any, _c: any, BB: BlueBase) => {
				await BB.Components.register('NavigationActions', NavigationActions);
			},
		}}
	>
		{children}
	</BlueBaseApp>
);

const theme = buildTheme()();

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
		type: 'video',
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

storiesOf('MediaSlider/Main/MediaSlider', module)
	.add('Basic Example', () => (
		<BBWrapper>
			<MediaSlider items={items} height={300} />
		</BBWrapper>
	))
	.add('Custom Width', () => (
		<BBWrapper>
			<MediaSlider items={items} height={300} style={{ width: 400 }} />
		</BBWrapper>
	))
	.add('Loading', () => <MediaSlider loading items={items} height={300} style={{ width: 400 }} />)
	.add('Without Auto Play', () => (
		<SafeAreaView>
			<BBWrapper>
				<MediaSlider items={items} height={300} autoplay={false} />
			</BBWrapper>
		</SafeAreaView>
	))
	.add('Inside card', () => (
		<SafeAreaView>
			<BBWrapper>
				<Card
					style={{
						borderRadius: 8,
						margin: 16,
						...theme.elevation(10),
					}}
				>
					<MediaSlider items={items} height={200} style={{ borderRadius: 8 }} />
				</Card>
			</BBWrapper>
		</SafeAreaView>
	))
	.add('With Link', () => (
		<BBWrapper>
			<MediaSlider
				items={items}
				height={300}
				style={{ width: 400 }}
				autoplay={false}
				path="https://www.google.com"
			/>
		</BBWrapper>
	));
