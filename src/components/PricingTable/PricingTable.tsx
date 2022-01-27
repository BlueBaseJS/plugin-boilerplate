import { Body1, Body2, View } from '@bluebase/components';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useStyles } from '@bluebase/core';
import { compileTemplate, transformAndValidate } from '@mevris/universal-data-schema';

import { PricingTableSkeleton } from './PricingTableSkeleton';
import React from 'react';

export interface CartValueItems {
	loading?: boolean;
	subTotal?: number;
	discount?: number;
	tax?: number;
	shipping?: number;
	total?: number;
}

export function calculateTotal({
	subTotal = 0,
	discount = 0,
	tax = 0,
	shipping = 0,
}: Partial<CartValueItems>) {
	return subTotal + (discount > 0 ? discount * -1 : discount) + tax + shipping;
}

export interface PricingTableProps extends Partial<CartValueItems> {
	style?: ViewStyle;
	styles?: Partial<PricingTableStyles>;
}

export interface PricingTableStyles {
	root: ViewStyle;
	item: ViewStyle;
	leftColumn: TextStyle;
	rightColumn: TextStyle;
	successText: TextStyle;
	totalRow: ViewStyle;
	totalLabel: TextStyle;
	totalValue: TextStyle;
}

const defaultStyles = (theme: Theme): PricingTableStyles => ({
	root: {
		flexDirection: 'column',
	},

	item: {
		flexDirection: 'row',
		paddingBottom: theme.spacing.unit,
	},

	leftColumn: {
		color: theme.palette.text.secondary,
		flex: 1,
	},

	rightColumn: {
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit,
	},

	successText: {
		color: theme.palette.success.main,
	},

	totalRow: {
		borderRadius: 1,
		borderStyle: 'dashed',
		borderTopColor: theme.palette.divider,
		borderTopWidth: 1,
		paddingBottom: 0,
		paddingTop: theme.spacing.unit,
	},

	totalLabel: {
		flex: 1,
		fontWeight: 'bold',
	},

	totalValue: {
		color: theme.palette.primary.main,
		fontSize: theme.spacing.unit * 2,
		fontWeight: 'bold',
	},
});

export const PricingTable = (props: PricingTableProps) => {
	const { subTotal, discount, tax, shipping, loading, total, style } = props;
	const styles = useStyles('PricingTable', props, defaultStyles);

	if (loading) {
		return <PricingTableSkeleton lines={4} maxLineWidth={14} minLineWidth={8} style={style} />;
	}

	const renderItem = (label: string, value?: number, skipIfNil = false, greenColor = false) => {
		// If 0 or undefined
		if (!value && !skipIfNil) {
			return;
		}

		return (
			<View style={styles.item} testID="ItemView">
				<Body2 style={styles.leftColumn} testID="labelView">
					{label}
				</Body2>
				<Body2 style={[styles.rightColumn, greenColor && styles.successText]} testID="valueView">
					{compileTemplate(transformAndValidate(value, 'Currency') as any, 'Currency')}
				</Body2>
			</View>
		);
	};

	const renderTotal = (value: number) => {
		return (
			<View style={[styles.item, styles.totalRow]} testID="ItemView">
				<Body1 style={styles.totalLabel} testID="labelView">
					Total
				</Body1>
				<Body1 style={styles.totalValue} testID="valueView">
					{compileTemplate(transformAndValidate(value, 'Currency') as any, 'Currency')}
				</Body1>
			</View>
		);
	};

	return (
		<View style={[styles.root, style]}>
			{renderItem('Subtotal', subTotal, true)}
			{renderItem(`Discount`, discount! > 0 ? discount! * -1 : discount, false, true)}
			{renderItem(`Tax`, tax)}
			{renderItem(`Shipping`, shipping)}
			{renderTotal(total || calculateTotal({ subTotal, discount, tax, shipping }))}
		</View>
	);
};

PricingTable.displayName = 'PricingTable';
PricingTable.defaultProps = {
	discount: 0,
	shipping: 0,
	subTotal: 0,
	tax: 0,
};
