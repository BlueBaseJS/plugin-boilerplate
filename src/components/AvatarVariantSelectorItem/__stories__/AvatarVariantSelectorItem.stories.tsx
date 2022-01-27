import { AvatarVariantSelectorItemProps } from '../AvatarVariantSelectorItem';
import React from 'react';
import { View } from 'react-native';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const AvatarVariantSelectorItem = getComponent<AvatarVariantSelectorItemProps>(
	'AvatarVariantSelectorItem'
);

storiesOf('Variants/Parts/AvatarVariantSelectorItem', module)
	.add('Medium Size', () => (
		<View style={{ flexDirection: 'row' }}>
			<AvatarVariantSelectorItem
				type="text"
				text="A"
				index={0}
				style={{ backgroundColor: 'red' }}
				onPress={() => console.log('Index 0 pressed')}
			/>
			<AvatarVariantSelectorItem
				type="text"
				text="B"
				index={1}
				style={{ backgroundColor: 'green' }}
				onPress={() => console.log('Index 1 pressed')}
				active
			/>
			<AvatarVariantSelectorItem
				type="text"
				text="C"
				index={2}
				disabled
				style={{ backgroundColor: 'blue' }}
				onPress={() => console.log('Index 2 pressed')}
			/>
		</View>
	))
	.add('Large Size', () => (
		<View style={{ flexDirection: 'row' }}>
			<AvatarVariantSelectorItem
				type="text"
				text="A"
				index={0}
				size="large"
				style={{ backgroundColor: 'red' }}
				onPress={() => console.log('Index 0 pressed')}
			/>
			<AvatarVariantSelectorItem
				type="text"
				text="B"
				index={1}
				size="large"
				style={{ backgroundColor: 'green' }}
				onPress={() => console.log('Index 1 pressed')}
				active
			/>
			<AvatarVariantSelectorItem
				type="text"
				text="C"
				index={2}
				size="large"
				style={{ backgroundColor: 'blue' }}
				onPress={() => console.log('Index 2 pressed')}
			/>
		</View>
	))
	.add('Small Size', () => (
		<View style={{ flexDirection: 'row' }}>
			<AvatarVariantSelectorItem
				type="text"
				text="A"
				index={0}
				size="small"
				style={{ backgroundColor: 'red' }}
				onPress={() => console.log('Index 0 pressed')}
			/>
			<AvatarVariantSelectorItem
				type="text"
				text="B"
				index={1}
				size="small"
				style={{ backgroundColor: 'green' }}
				onPress={() => console.log('Index 1 pressed')}
				active
			/>
			<AvatarVariantSelectorItem
				type="text"
				text="C"
				index={2}
				size="small"
				style={{ backgroundColor: 'blue' }}
				onPress={() => console.log('Index 2 pressed')}
			/>
		</View>
	));
