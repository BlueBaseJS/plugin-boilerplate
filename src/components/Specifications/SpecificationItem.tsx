import { Body2, View } from '@bluebase/components';
import { Placeholder, PlaceholderBody2 } from '../../imports';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, isMobile, useStyles } from '@bluebase/core';

import React from 'react';

export interface SpecificationItemStyles {
	root: ViewStyle;
	label: ViewStyle;
	labelText: TextStyle;
	value: ViewStyle;
	valueText: TextStyle;
}

export interface SpecificationItemType {
	label?: string;
	value?: string;
}

export interface SpecificationItemProps extends SpecificationItemType {
	loading?: boolean;
	style?: ViewStyle;
	styles?: Partial<SpecificationItemStyles>;
}

const defaultStyles = (theme: Theme): SpecificationItemStyles => ({
	root: {
		flexDirection: 'row',
	},

	label: {
		paddingVertical: theme.spacing.unit,
		width: isMobile() ? '35%' : '25%',
	},

	labelText: {
		color: theme.palette.text.secondary,
	},

	value: {
		paddingVertical: theme.spacing.unit,
		width: isMobile() ? '65%' : '75%',
	},

	valueText: {},
});

export const SpecificationItem = (props: SpecificationItemProps) => {
	const { label, value, loading, style } = props;
	const styles = useStyles('SpecificationItem', props, defaultStyles);

	if (loading) {
		return (
			<Placeholder>
				<View style={[styles.root, style]} testID="specification-item-root">
					<View style={styles.label} testID="specification-item-label-container">
						<PlaceholderBody2 width={40} />
					</View>
					<View style={styles.value} testID="specification-item-value-container">
						<PlaceholderBody2 width={30} />
					</View>
				</View>
			</Placeholder>
		);
	}

	return (
		<View style={[styles.root, style]} testID="specification-item-root">
			<View style={styles.label} testID="specification-item-label-container">
				<Body2 style={styles.labelText} testID="specification-item-label">
					{label}
				</Body2>
			</View>
			<View style={styles.value} testID="specification-item-value-container">
				<Body2 style={styles.valueText} testID="specification-item-value">
					{value}
				</Body2>
			</View>
		</View>
	);
};

SpecificationItem.defaultProps = {
	loading: false,
};

SpecificationItem.displayName = 'SpecificationItem';
