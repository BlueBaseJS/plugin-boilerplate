import { HoverObserver, HoverObserverState, View } from '@bluebase/components';
import React, { useState } from 'react';
import { Theme, useStyles } from '@bluebase/core';

import { ViewStyle } from 'react-native';
import { getItemComponent } from './getItemComponent';
import { or } from '../../helpers';

export interface VariantSelectorItemProps {
	[key: string]: any;
	active?: boolean;
	hovering?: boolean;
	disabled?: boolean;
	index: number;
	size?: 'small' | 'medium' | 'large';
	onPress?: (index: number) => void;
	style?: ViewStyle;
}

export interface VariantSelectorStyles {
	root: ViewStyle;
	itemRoot: ViewStyle;
	itemRootSmall: ViewStyle;
}

export interface VariantSelectorProps {
	ItemComponent: string | React.ComponentType<VariantSelectorItemProps>;
	items?: any[];
	index?: number;
	size?: 'small' | 'medium' | 'large';
	onChangeIndex?: (index: number) => void;
	onChangeHover?: (index: number, isHovering: boolean) => void;
	style?: ViewStyle;
	styles?: Partial<VariantSelectorStyles>;
}

const defaultStyles = (theme: Theme): VariantSelectorStyles => ({
	root: {
		flexDirection: 'row',
		// padding: 2,
	},

	itemRoot: {
		marginBottom: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},

	itemRootSmall: {
		marginBottom: theme.spacing.unit / 2,
		marginRight: theme.spacing.unit / 2,
	},
});

export const VariantSelector = (props: VariantSelectorProps) => {
	const { ItemComponent, index, items, onChangeIndex, onChangeHover, size, style } = props;
	const styles = useStyles('VariantSelector', props, defaultStyles);
	const [hovering, setHovering] = useState(-1);
	const Item = getItemComponent(ItemComponent);

	// onHoverChange event listener
	const onHoverChanged = (i: number) => ({ isHovering }: HoverObserverState) => {
		if (isHovering === true) {
			setHovering(i);
		} else {
			setHovering(-1);
		}

		if (onChangeHover) {
			onChangeHover(i, isHovering);
		}
	};

	// Create child nodes
	const children = items!.map((item, i) => (
		<HoverObserver onHoverChanged={onHoverChanged(i)} key={i}>
			<Item
				index={i}
				active={i === index}
				hovering={i === hovering}
				onPress={onChangeIndex}
				styles={{ root: or(size === 'small', styles.itemRootSmall, styles.itemRoot) }}
				size={size}
				{...item}
			/>
		</HoverObserver>
	));

	return <View style={[styles.root, style]}>{children}</View>;
};

VariantSelector.defaultProps = {
	index: 0,
	items: [],
};
