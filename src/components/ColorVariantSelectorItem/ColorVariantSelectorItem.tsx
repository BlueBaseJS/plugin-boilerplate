import { AvatarVariantSelectorItemProps } from '../AvatarVariantSelectorItem';
import React from 'react';
import { ViewStyle } from 'react-native';
import { getComponent } from '@bluebase/core';

const AvatarVariantSelectorItem = getComponent<AvatarVariantSelectorItemProps>(
	'AvatarVariantSelectorItem'
);

export interface ColorVariantSelectorItemStyles {
	root: ViewStyle;
	hover: ViewStyle;
	active: ViewStyle;
}

export interface ColorVariantSelectorItemProps extends AvatarVariantSelectorItemProps {}

export const ColorVariantSelectorItem = ({
	color,
	style,
	...rest
}: ColorVariantSelectorItemProps) => (
	<AvatarVariantSelectorItem
		{...rest}
		style={{ ...style, backgroundColor: color }}
		type="text"
		text=""
	/>
);
