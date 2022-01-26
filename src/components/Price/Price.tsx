import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import { Text, View } from '@bluebase/components';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useStyles } from '@bluebase/core';
import { compileTemplate, transformAndValidate } from '@mevris/universal-data-schema';

import React from 'react';
import { renderIfNotNil } from '../../helpers';

export interface PriceSizeStyles {
	price: TextStyle;
	compareAtPrice: TextStyle;
	percentage: TextStyle;
}

export interface PriceStyles {
	root: ViewStyle;
	row: ViewStyle;
	column: ViewStyle;
	common: PriceSizeStyles;
	small: PriceSizeStyles;
	medium: PriceSizeStyles;
	large: PriceSizeStyles;
}

export interface PriceProps {
	price?: number;
	compareAtPrice?: number;
	percentage?: number;
	direction?: 'row' | 'column';
	size?: 'small' | 'medium' | 'large';
	loading?: boolean;
	style?: ViewStyle;
	styles?: Partial<PriceStyles>;
}

function formatAmount(amount: number): number | string {
	return compileTemplate<number | string>(transformAndValidate(amount, 'Currency') as number, 'Currency');
}

const defaultStyles = (theme: Theme): PriceStyles => ({
	root: {
		alignItems: 'center',
	},

	row: {
		flexDirection: 'row',
	},

	column: {
		flexDirection: 'column',
	},

	common: {
		price: {
			color: theme.palette.text.primary,
			fontWeight: 'bold',
			marginRight: theme.spacing.unit,
		},

		compareAtPrice: {
			color: theme.palette.text.secondary,
			marginRight: theme.spacing.unit,
			textDecorationLine: 'line-through',
		},

		percentage: {
			color: theme.palette.success.main,
			fontWeight: 'bold',
			marginRight: theme.spacing.unit,
		},
	},

	small: {
		price: {
			fontSize: theme.typography.button.fontSize,
		},

		compareAtPrice: {
			fontSize: theme.typography.overline.fontSize,
		},

		percentage: {
			fontSize: theme.typography.overline.fontSize,
		},
	},

	medium: {
		price: {
			fontSize: theme.typography.body1.fontSize,
		},

		compareAtPrice: {
			fontSize: theme.typography.body2.fontSize,
		},

		percentage: {
			fontSize: theme.typography.body2.fontSize,
		},
	},

	large: {
		price: {
			fontSize: theme.typography.h5.fontSize,
		},

		compareAtPrice: {
			fontSize: theme.typography.h6.fontSize,
		},

		percentage: {
			fontSize: theme.typography.h6.fontSize,
		},
	},
});

export const Price = (props: PriceProps) => {
	const { price, compareAtPrice, percentage, direction, size, loading, style } = props;
	const styles = useStyles('Price', props, defaultStyles);

	// root styles
	const rootStyles = {
		...styles.root,
		...(direction === 'column' ? styles.column! : styles.row!),
		...style,
	};

	// text styles
	const commonStyles = styles.common!;
	let sizeStyles = styles[size!];

	if (!sizeStyles) {
		sizeStyles = styles.medium!;
	}

	// price styles
	const priceStyles = { ...commonStyles.price, ...sizeStyles.price };
	const compareAtPriceStyles = { ...commonStyles.compareAtPrice, ...sizeStyles.compareAtPrice };
	const percentageStyles = { ...commonStyles.percentage, ...sizeStyles.percentage };

	if (loading === true) {
		return (
			<View style={rootStyles} testID="price-container">
				<Placeholder Animation={Fade}>
					<PlaceholderLine
						width={30}
						height={priceStyles.fontSize}
						// style={priceStyles}
						noMargin
					/>
				</Placeholder>
			</View>
		);
	}

	return (
		<View style={rootStyles} testID="price-container">
			{renderIfNotNil(
				price,
				<Text style={priceStyles} testID="price">
					{formatAmount(price!)}
				</Text>
			)}
			{renderIfNotNil(
				compareAtPrice,
				<Text style={compareAtPriceStyles} testID="compare-price">
					{formatAmount(compareAtPrice!)}
				</Text>
			)}
			{renderIfNotNil(
				percentage,
				<Text style={percentageStyles} testID="discount-percentage">
					{percentage}% off
				</Text>
			)}
		</View>
	);
};

Price.defaultProps = {
	direction: 'row',
	loading: false,
	size: 'medium',
};
