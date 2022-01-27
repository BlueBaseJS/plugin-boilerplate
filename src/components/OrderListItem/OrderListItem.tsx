import {
	BlueBaseImageProps,
	Body2,
	List,
	Subtitle2,
	View
} from '@bluebase/components';
// import { Order } from '../../graphql/types';
import { PlaceholderListItem, RelativeTime } from '../../imports';
import React, { useCallback } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useNavigation, useStyles } from '@bluebase/core';
import { compileTemplate, transformAndValidate } from '@mevris/universal-data-schema';

import StatusBadge from '../StatusBadge';
import { or } from '../../helpers';

type Order = any;

export interface OrderListItemStyles {
	title: TextStyle;
	description: TextStyle;
	right: ViewStyle;
	price: TextStyle;
}

export interface OrderListItemProps extends Omit<Order, 'avatar'> {
	/** Main Image */
	avatar?: BlueBaseImageProps['source'];

	/** Thumbnail Image */
	thumbnail?: BlueBaseImageProps['source'];

	/** Placeholder Image */
	placeholder?: BlueBaseImageProps['source'];

	/** Show loading state */
	loading?: boolean;

	right?: React.ReactNode;
	onPress?: () => void;

	style?: ViewStyle;
	styles?: Partial<OrderListItemStyles>;
}

const defaultStyles = (theme: Theme): OrderListItemStyles => ({
	title: {
	},

	description: {
		color: theme.palette.text.secondary,
	},

	right: {
		alignItems: 'flex-end',
		paddingLeft: theme.spacing.unit,
	},

	price: {
		marginVertical: theme.spacing.unit / 2,
	},
});

/**
 * OrderListItem used for listing of available orders.
 */
export const OrderListItem = (props: OrderListItemProps) => {
	const {
		name,
		orderName,
		totalPrice,
		quantity,
		avatar,
		status,
		createdAt,
		onPress,
		loading,
		id,
		placeholder,
	} = props;

	const styles = useStyles('OrderListItem', props, defaultStyles);

	const { navigate } = useNavigation();

	if (loading === true) {
		return <PlaceholderListItem avatar description variant="rounded" />;
	}

	return (
		<List.Item
			left={<List.Avatar variant="rounded" type="image" image={or(!!avatar, avatar, placeholder)} />}
			title={`${name} x ${quantity}`}
			description={
				<Body2>
					{orderName ? (
						<Body2 style={styles.description} testID="Title-Text">
							{orderName} ·
						</Body2>
					) : null}
					{createdAt ? (
						<RelativeTime component={Body2} time={createdAt} style={styles.description} />
					) : null}
				</Body2>
			}
			right={
				<View style={styles.right}>
					{totalPrice ? (
						<Subtitle2 style={styles.price} testID="price-text">
							{compileTemplate(transformAndValidate(totalPrice, 'Currency') as any, 'Currency')}
						</Subtitle2>
					) : null}
					{status ? <StatusBadge {...status} /> : null}
				</View>
			}
			onPress={
				!onPress
					? useCallback(() => navigate('OrderProfile', {
						productId: id, name
					}), [])
					: onPress
			}
		/>
	);

};

/**
 *  default props of OrderListItem
 * if no props are given then
 * OrderListItem will render with
 * these props
 */
OrderListItem.defaultProps = {
	placeholder: 'OrderPlaceholder',
};

OrderListItem.displayName = 'OrderListItem';
