import { AvatarSettingView } from '../AvatarSettingView';
import { List } from '@bluebase/components';
import React from 'react';
import { SafeAreaView } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('AvatarSettingView', module)
	.add('With default props', () => (
		<SafeAreaView>
			<AvatarSettingView />
			<List.Item
				title="Display Picture"
				left={
					<List.Avatar
						type="image"
						variant="rounded"
						image={{ uri: 'https://placeimg.com/100/100/people' }}
					/>
				}
			/>
		</SafeAreaView>
	))
	.add('With Image', () => (
		<SafeAreaView>
			<AvatarSettingView
				description="Put your instructions here"
				source={{ uri: 'https://placeimg.com/100/100/people' }}
			/>
			<List.Item
				title="Display Picture"
				left={
					<List.Avatar
						type="image"
						variant="rounded"
						image={{ uri: 'https://placeimg.com/100/100/people' }}
					/>
				}
			/>
		</SafeAreaView>
	))
	.add('With Error', () => (
		<SafeAreaView>
			<AvatarSettingView
				description="A description"
				error={Error('Something bad happened!')}
				source={{ uri: 'https://placeimg.com/100/100/people' }}
			/>
			<List.Item
				title="Display Picture"
				left={
					<List.Avatar
						type="image"
						variant="rounded"
						image={{ uri: 'https://placeimg.com/100/100/people' }}
					/>
				}
			/>
		</SafeAreaView>
	))
	.add('Loading', () => (
		<SafeAreaView>
			<AvatarSettingView
				loading
				description="A description"
				source={{ uri: 'https://placeimg.com/100/100/people' }}
			/>
			<List.Item
				title="Display Picture"
				left={
					<List.Avatar
						type="image"
						variant="rounded"
						image={{ uri: 'https://placeimg.com/100/100/people' }}
					/>
				}
			/>
		</SafeAreaView>
	));
