import { PlaceholderBody1, PlaceholderBody2 } from '../../imports';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useStyles } from '@bluebase/core';

import React from 'react';
import { View } from '@bluebase/components';

interface PricingTableSkeletonStyles {
	values: TextStyle;
	total: TextStyle;
	totalRow: ViewStyle;
	valueLineHeight: number;
	totalLineHeight: number;
}

export interface PricingTableSkeletonProps {
	lines: number;
	maxLineWidth: number;
	minLineWidth: number;
	style?: ViewStyle;
	styles?: Partial<PricingTableSkeletonStyles>;
}

const defaultStyles = (theme: Theme): PricingTableSkeletonStyles => ({
	values: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: theme.spacing.unit / 3,
	},

	total: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: theme.spacing.unit / 2,
		padding: theme.spacing.unit / 3,
	},

	totalRow: {
		borderStyle: 'dashed',
		borderTopColor: theme.palette.divider,
		borderTopWidth: 1,
		paddingBottom: 0,
		paddingTop: theme.spacing.unit,
	},

	totalLineHeight: (theme.typography.body1.fontSize as number) + 2,
	valueLineHeight: (theme.typography.body2.fontSize as number) + 2,
});

export const PricingTableSkeleton = (props: PricingTableSkeletonProps) => {
	const styles = useStyles('PricingTableSkeleton', props, defaultStyles);
	const { total, totalRow, totalLineHeight, values, valueLineHeight } = styles;
	const { lines, maxLineWidth, minLineWidth } = props;

	return (
		<View style={props.style}>
			{// Creating Skeleton for 4 items i.e, subtotal, discount, shipping, tax
				[...Array(lines)].map((line) => (
					<View style={values} key={line}>
						<PlaceholderBody2
							width={Math.floor(Math.random() * maxLineWidth) + minLineWidth}
							height={valueLineHeight}
							noMargin
						/>
						<PlaceholderBody2
							width={Math.floor(Math.random() * maxLineWidth) + minLineWidth}
							height={valueLineHeight}
							noMargin
						/>
					</View>
				))}
			<View style={[total, totalRow]}>
				<PlaceholderBody1 width={13} height={totalLineHeight} noMargin />
				<PlaceholderBody1 width={17} height={totalLineHeight} noMargin />
			</View>
		</View>
	);
};

PricingTableSkeleton.displayName = 'PricingTableSkeleton';
