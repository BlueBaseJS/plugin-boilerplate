import { Avatar, AvatarProps, TouchableItem, View } from '@bluebase/components';
import { Omit, Theme } from '@bluebase/core';

import React from 'react';
import { VariantSelectorItemProps } from '../VariantSelector';
import { ViewStyle } from 'react-native';

const SIZES = {
	large: 48,
	medium: 36,
	small: 16,
};

export interface AvatarVariantSelectorItemStyles {
	root: ViewStyle;
	hover: ViewStyle;
	active: ViewStyle;
	disabled: ViewStyle;
}

export interface AvatarVariantSelectorItemProps
	extends VariantSelectorItemProps,
		Omit<Partial<AvatarProps>, 'style' | 'size'> {
	styles?: Partial<AvatarVariantSelectorItemStyles>;
}

export class AvatarVariantSelectorItem extends React.Component<AvatarVariantSelectorItemProps> {
	static defaultProps: Partial<AvatarVariantSelectorItemProps> = {
		active: false,
		hovering: false,
		size: 'medium',
	};

	static defaultStyles: any = (theme: Theme): AvatarVariantSelectorItemStyles => ({
		root: {
			borderColor: 'transparent',
			borderRadius: 100,
			borderWidth: 1,
			padding: 2,
		},

		hover: {
			borderColor: '#aaa',
		},

		active: {
			borderColor: theme.palette.primary.main,
		},

		disabled: {
			borderColor: theme.palette.divider,
			borderStyle: 'dashed',
			opacity: 0.5,
		},
	});

	handlePress: any = () => {
		const { onPress } = this.props;

		if (onPress) {
			onPress(this.props.index);
		}
	};

	render() {
		const { active, hovering, disabled, index, onPress, size, styles, ...rest } = this.props;

		const rootStyle: ViewStyle = {
			...styles!.root,
			...(hovering ? styles!.hover : {}),
			...(active ? styles!.active : {}),
			...(disabled ? styles!.disabled : {}),
			// ...style,
		};

		const node = (
			<View style={rootStyle} testID="selector-item-root">
				<Avatar {...(rest as any)} size={SIZES[size!]} />
			</View>
		);

		return disabled ? node : <TouchableItem onPress={this.handlePress}>{node}</TouchableItem>;
	}
}
