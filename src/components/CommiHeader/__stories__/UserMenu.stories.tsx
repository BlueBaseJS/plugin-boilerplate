import React from 'react';
import { UserMenu } from '../UserMenu';
import { View } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('CommiHeader/Parts/UserMenu', module)
	.add('Normal State', () => (
		<View style={{ alignItems: 'flex-start' }}>
			<UserMenu />
		</View>
	))
	.add('Loggedin State', () => (
		<View style={{ alignItems: 'flex-start' }}>
			<UserMenu loggedIn />
		</View>
	))
	.add('Loggedin with Use Details', () => (
		<View style={{ alignItems: 'flex-start' }}>
			<UserMenu
				loggedIn
				name="Abdul Rehman"
				email="rehman@blueeast.com"
				avatar="https://placeimg.com/100/100/people"
			/>
		</View>
	))
	.add('Loading State', () => (
		<View style={{ alignItems: 'flex-start' }}>
			<UserMenu loading />
		</View>
	));
