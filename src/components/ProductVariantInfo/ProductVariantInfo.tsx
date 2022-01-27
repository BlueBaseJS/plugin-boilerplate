import { Body1, Body2, List, ListItemProps } from '@bluebase/components';
import { ImageStyle, Linking, Platform, TextStyle, ViewStyle } from 'react-native';
import { Omit, Theme, useStyles } from '@bluebase/core';
import React, { useCallback } from 'react';
import { or, renderIfNotNil } from '../../helpers';

import { PlaceholderListItem } from '../../imports';

export interface Variant {
	name: string;
	value: string;
}

export interface ProductVariantInfoProps extends Omit<ListItemProps, 'description' | 'left'> {
	avatar?: string;
	url: string;
	title: string;
	quantity?: number;
	loading?: boolean;
	variants?: Variant[];
	styles?: Partial<ProductVariantInfoStyles>;
}

export interface ProductVariantInfoStyles {
	title: TextStyle;
	variantLabel: TextStyle;
	variantValue: ViewStyle;
	image: ImageStyle;
}

const defaultStyles = (theme: Theme): ProductVariantInfoStyles => ({
	title: {
		textDecorationLine: 'underline',
	},

	variantLabel: {
		color: theme.palette.text.secondary,
	},

	image: {
		borderRadius: theme.spacing.unit / 2,
		height: theme.spacing.unit * 4,
		width: theme.spacing.unit * 4,
	},

	variantValue: {},
});

export const ProductVariantInfo = (props: ProductVariantInfoProps) => {
	const { avatar, quantity, loading, title, variants, url, ...rest } = props;
	const styles = useStyles('ProductVariantInfo', props, defaultStyles);

	if (loading === true) {
		return <PlaceholderListItem avatar variant="rounded" description />;
	}

	const openUrl = useCallback(() => Linking.openURL(url), [url]);

	return (
		<List.Item
			title={
				<React.Fragment>
					{renderIfNotNil(quantity, <Body2 testID="product-quantity">{quantity} x </Body2>)}

					<Body1 style={styles.title} testID="ClickMe" onPress={openUrl}>
						{title}
					</Body1>
				</React.Fragment>
			}
			description={
				!!variants &&
				variants.map((item: Variant, index: number) => (
					<React.Fragment key={index}>
						<Body2 testID="variantsView">
							<Body2 style={styles.variantLabel} testID="variant-name">
								{item.name}
								{': '}
							</Body2>
							<Body2 style={styles.variantValue} testID="variant-value">
								{item.value}
							</Body2>
						</Body2>
						{or(index < variants.length - 1, Platform.select({ web: <br />, default: '\n' } as any), null)}
					</React.Fragment>
				))
			}
			left={
				<List.Avatar
					variant="rounded"
					type="image"
					image={or(!!avatar, { uri: avatar }, 'ProductPlaceholder')}
				/>
			}
			onPress={openUrl}
			{...rest}
		/>
	);
};

ProductVariantInfo.defaultProps = {};
ProductVariantInfo.displayName = 'ProductVariantInfo';
