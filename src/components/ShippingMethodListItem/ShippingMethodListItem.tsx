import {
	BlueBaseImageProps,
	List
} from '@bluebase/components';
import React, { useCallback } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { compileTemplate, transformAndValidate } from '@mevris/universal-data-schema';

// import { ShippingMethod } from '../../graphql/types';
import { PlaceholderListItem } from '../../imports';
import { or } from '../../helpers';

type ShippingMethod = any;

export interface ShippingMethodListItemStyles {
	title: TextStyle;
	description: TextStyle;
	right: ViewStyle;
	price: TextStyle;
}

export interface ShippingMethodListItemProps extends Omit<ShippingMethod, 'avatar'> {
	/** Main Image */
	avatar?: BlueBaseImageProps['source'];

	/** Thumbnail Image */
	thumbnail?: BlueBaseImageProps['source'];

	/** Placeholder Image */
	placeholder?: BlueBaseImageProps['source'];

	id: string;
	loading?: boolean;
	title: string;
	price: number;
	estimatedTimeOfDelivery: string;

	onPress?: (shippingLine: ShippingMethod) => void;

	style?: ViewStyle;
	styles?: Partial<ShippingMethodListItemStyles>;
}

function getDescription({ price, estimatedTimeOfDelivery }: ShippingMethodListItemProps): string | undefined {
	if (price && estimatedTimeOfDelivery) {
		return `${compileTemplate(transformAndValidate(price, 'Currency'), 'Currency')} (${estimatedTimeOfDelivery})`;
	}
	if (price) {
		return compileTemplate(transformAndValidate(price, 'Currency'), 'Currency') as string;
	}
	if (estimatedTimeOfDelivery) {
		return estimatedTimeOfDelivery;
	}
	return;
}

/**
 * ShippingMethodListItem used for listing of available shippingmethods.
 */
export const ShippingMethodListItem = (props: ShippingMethodListItemProps) => {
	const {
		id,
		avatar,
		placeholder,
		title,
		loading,
		price,
		estimatedTimeOfDelivery,
		onPress: onPressProp,
		...rest
	} = props;

	if (loading === true) {
		return <PlaceholderListItem avatar description variant="rounded" />;
	}

	const onPress = useCallback(() => {
		if (onPressProp) {
			onPressProp({ id, avatar, title, estimatedTimeOfDelivery, price });
		}
	}, [id, avatar, title, estimatedTimeOfDelivery, price]);

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
			description={getDescription(props)}
			{...rest}
			onPress={onPress}
		/>
	);

};

ShippingMethodListItem.defaultProps = {
	placeholder: 'ShippingMethodPlaceholder',
};

ShippingMethodListItem.displayName = 'ShippingMethodListItem';
