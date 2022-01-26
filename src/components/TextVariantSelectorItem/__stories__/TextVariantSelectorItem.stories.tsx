/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { TextVariantSelectorItemProps } from '../TextVariantSelectorItem';
import { View } from 'react-native';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const TextVariantSelectorItem = getComponent<TextVariantSelectorItemProps>(
	'TextVariantSelectorItem'
);

storiesOf('Variants/Parts/TextVariantSelectorItem', module)
	.add('With title only', () => (
		<View style={{ flexDirection: 'row' }}>
			<TextVariantSelectorItem title="8" index={0} onPress={() => console.log('Index 0 pressed')} />
			<TextVariantSelectorItem
				title="10"
				index={1}
				onPress={() => console.log('Index 1 pressed')}
				active
			/>
			<TextVariantSelectorItem
				title="12"
				index={2}
				onPress={() => console.log('Index 2 pressed')}
				disabled
			/>
		</View>
	))
	.add('With title & description', () => (
		<View style={{ flexDirection: 'row' }}>
			<TextVariantSelectorItem
				title="Foo"
				description="A detailed description"
				index={0}
				onPress={() => console.log('Index 0 pressed')}
			/>
			<TextVariantSelectorItem
				title="Foo"
				description="A detailed description"
				index={1}
				onPress={() => console.log('Index 1 pressed')}
				active
			/>
		</View>
	));
