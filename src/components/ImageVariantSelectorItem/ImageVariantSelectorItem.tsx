import { AvatarVariantSelectorItemProps } from '../AvatarVariantSelectorItem';
import React from 'react';
import { ViewStyle } from 'react-native';
import { getComponent } from '@bluebase/core';

const AvatarVariantSelectorItem = getComponent<AvatarVariantSelectorItemProps>(
	'AvatarVariantSelectorItem'
);

export interface ImageVariantSelectorItemStyles {
	root: ViewStyle;
	hover: ViewStyle;
	active: ViewStyle;
}

export interface ImageVariantSelectorItemProps extends AvatarVariantSelectorItemProps {}

export const ImageVariantSelectorItem = (props: ImageVariantSelectorItemProps) => (
	<AvatarVariantSelectorItem {...props} type="image" />
);
