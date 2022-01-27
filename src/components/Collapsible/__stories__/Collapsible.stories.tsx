import { BlueBase, BlueBaseApp, getComponent } from '@bluebase/core';

import BootOptions from '../../../../boot';
import { CollapsibleProps } from '../Collapsible';
import { Image } from 'react-native';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const Collapsible = getComponent<CollapsibleProps>('Collapsible');

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

storiesOf('Collapsible', module)
	.add('Open', () => (
		<BBWrapper>
			<Collapsible title="Image">
				<Image source={{ uri: 'https://placeimg.com/500/500/any' }} style={{ height: 500 }} />
			</Collapsible>
		</BBWrapper>
	))
	.add('Closed', () => (
		<BBWrapper>
			<Collapsible title="Image" open={false}>
				<Image source={{ uri: 'https://placeimg.com/500/500/any' }} style={{ height: 500 }} />
			</Collapsible>
		</BBWrapper>
	))
	.add('Open loading', () => (
		<BBWrapper>
			<Collapsible title="Image" loading>
				<Image source={{ uri: 'https://placeimg.com/500/500/any' }} style={{ height: 500 }} />
			</Collapsible>
		</BBWrapper>
	))
	.add('Closed loading', () => (
		<BBWrapper>
			<Collapsible title="Image" open={false} loading>
				<Image source={{ uri: 'https://placeimg.com/500/500/any' }} style={{ height: 500 }} />
			</Collapsible>
		</BBWrapper>
	));
