import { ColorVariantSelectorItemProps } from '../ColorVariantSelectorItem';
import React from 'react';
import { View } from 'react-native';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const ColorVariantSelectorItem = getComponent<ColorVariantSelectorItemProps>(
	'ColorVariantSelectorItem'
);

storiesOf('Variants/Parts/ColorVariantSelectorItem', module)
	.add('Small Size', () => (
		<View style={{ flexDirection: 'row' }}>
			<ColorVariantSelectorItem size="small" color="red" index={0} />
			<ColorVariantSelectorItem size="small" color="green" index={1} active />
			<ColorVariantSelectorItem size="small" color="blue" index={2} />
		</View>
	))
	.add('Medium Size', () => (
		<View style={{ flexDirection: 'row' }}>
			<ColorVariantSelectorItem size="medium" color="red" index={0} />
			<ColorVariantSelectorItem size="medium" color="green" index={1} active />
			<ColorVariantSelectorItem size="medium" color="blue" index={2} />
		</View>
	))
	.add('Large Size', () => (
		<View style={{ flexDirection: 'row' }}>
			<ColorVariantSelectorItem size="large" color="red" index={0} />
			<ColorVariantSelectorItem size="large" color="green" index={1} active />
			<ColorVariantSelectorItem size="large" color="blue" index={2} />
		</View>
	));
