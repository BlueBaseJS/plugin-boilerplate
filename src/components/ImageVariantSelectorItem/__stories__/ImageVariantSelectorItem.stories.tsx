import { ImageVariantSelectorItemProps } from '../ImageVariantSelectorItem';
import React from 'react';
import { View } from 'react-native';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const ImageVariantSelectorItem = getComponent<ImageVariantSelectorItemProps>(
	'ImageVariantSelectorItem'
);

storiesOf('Variants/Parts/ImageVariantSelectorItem', module).add('Medium Size', () => (
	<View style={{ flexDirection: 'row' }}>
		<ImageVariantSelectorItem
			size="medium"
			image={{ uri: 'https://placeimg.com/50/50/animals' }}
			index={0}
		/>
		<ImageVariantSelectorItem
			size="medium"
			image={{ uri: 'https://placeimg.com/50/50/arch' }}
			index={1}
			active
		/>
		<ImageVariantSelectorItem
			size="medium"
			image={{ uri: 'https://placeimg.com/50/50/nature' }}
			index={2}
		/>
	</View>
));
