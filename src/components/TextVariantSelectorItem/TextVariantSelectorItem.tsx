import { Body1, Body2, TouchableItem, View } from '@bluebase/components';
import { TextStyle, ViewStyle } from 'react-native';

import React from 'react';
import { Theme } from '@bluebase/core';
import { VariantSelectorItemProps } from '../VariantSelector';
import { or } from '../../helpers';

export interface TextVariantSelectorItemStyles {
	root: ViewStyle;
	hover: ViewStyle;
	active: ViewStyle;
	disabled: ViewStyle;
	title: TextStyle;
	description: TextStyle;
}

export interface TextVariantSelectorItemProps extends VariantSelectorItemProps {
	title: string;
	description?: string;
	styles?: Partial<TextVariantSelectorItemStyles>;
}

export class TextVariantSelectorItem extends React.Component<TextVariantSelectorItemProps> {
	static defaultProps: Partial<TextVariantSelectorItemProps> = {
		active: false,
		hovering: false,
		size: 'medium',
	};

	static defaultStyles: any = (theme: Theme): TextVariantSelectorItemStyles => ({
		root: {
			borderColor: theme.palette.divider,
			borderRadius: theme.spacing.unit,
			borderWidth: 2,
			paddingHorizontal: theme.spacing.unit * 2,
			paddingVertical: theme.spacing.unit * 1.5,
		},

		hover: {
			borderColor: '#aaa',
		},

		active: {
			borderColor: theme.palette.primary.main,
		},

		disabled: {
			borderStyle: 'dashed',
			opacity: 0.75,
		},

		title: {
			fontWeight: 'bold',
		},

		description: {
			color: theme.palette.text.secondary,
			marginTop: theme.spacing.unit,
		},
	});

	handlePress: any = () => {
		const { index, onPress } = this.props;

		if (onPress) {
			onPress(index);
		}
	};

	render() {
		const { active, hovering, disabled, title, description, styles } = this.props;

		const rootStyle: ViewStyle = {
			...styles!.root,
			...or(!!hovering, styles!.hover, {}),
			...or(!!active, styles!.active, {}),
			...or(!!disabled, styles!.disabled, {}),
			// ...style,
		};

		const node = (
			<View style={rootStyle} testID="selector-item-root">
				<Body1 style={styles!.title}>{title}</Body1>
				{description ? <Body2 style={styles!.description}>{description}</Body2> : null}
			</View>
		);

		return or(!!disabled, node, <TouchableItem onPress={this.handlePress}>{node}</TouchableItem>);
	}
}
