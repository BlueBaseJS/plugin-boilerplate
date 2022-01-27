import {
	BlueBaseImageProps,
	List
} from '@bluebase/components';
import React, { useCallback } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

// import { PaymentMethod } from '../../graphql/types';
import { PlaceholderListItem } from '../../imports';
import { or } from '../../helpers';

type PaymentMethod = any;

export interface PaymentMethodListItemStyles {
	title: TextStyle;
	description: TextStyle;
	right: ViewStyle;
	price: TextStyle;
}

export interface PaymentMethodListItemProps extends Omit<PaymentMethod, 'avatar'> {
	/** Main Image */
	avatar?: BlueBaseImageProps['source'];

	/** Thumbnail Image */
	thumbnail?: BlueBaseImageProps['source'];

	/** Placeholder Image */
	placeholder?: BlueBaseImageProps['source'];

	id: string;
	loading?: boolean;
	title: string;
	instructions?: string;

	onPress?: (paymentLine: PaymentMethod) => void;

	style?: ViewStyle;
	styles?: Partial<PaymentMethodListItemStyles>;
}

/**
 * PaymentMethodListItem used for listing of available paymentmethods.
 */
export const PaymentMethodListItem = (props: PaymentMethodListItemProps) => {
	const { id, avatar, placeholder, title, instructions, loading, onPress: onPressProp, ...rest } = props;

	if (loading === true) {
		return <PlaceholderListItem avatar description variant="rounded" />;
	}

	const onPress = useCallback(() => {
		if (onPressProp) {
			onPressProp({ id, avatar, title, instructions });
		}
	}, [id, avatar, title, instructions]);

	return (
		<List.Item
			key={id}
			left={
				<List.Avatar
					variant="rounded"
					type="image"
					image={or(!!avatar, avatar, placeholder)}
				/>
			}
			title={title}
			description={instructions}
			{...rest}
			onPress={onPress}
		/>
	);

};

PaymentMethodListItem.defaultProps = {
	placeholder: 'PaymentMethodPlaceholder',
};

PaymentMethodListItem.displayName = 'PaymentMethodListItem';
