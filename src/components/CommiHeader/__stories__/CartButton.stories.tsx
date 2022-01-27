import { CartButton } from '../CartButton';
import React from 'react';
import { View } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('CommiHeader/Parts/CartButton', module)
	.add('Normal State', () => (
		<View style={{ alignItems: 'flex-start' }}>
			<CartButton />
		</View>
	))
	.add('Item Count 8', () => (
		<View style={{ alignItems: 'flex-start' }}>
			<CartButton count={8} />
		</View>
	))
	.add('Item Count 88', () => (
		<View style={{ alignItems: 'flex-start' }}>
			<CartButton count={88} />
		</View>
	))
	.add('Item Count 888', () => (
		<View style={{ alignItems: 'flex-start' }}>
			<CartButton count={888} />
		</View>
	))
	.add('Loading State', () => (
		<View style={{ alignItems: 'flex-start' }}>
			<CartButton count={888} loading />
		</View>
	));
