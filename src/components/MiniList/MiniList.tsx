import { MiniListItem, MiniListItemProps } from '../MiniListItem';

import React from 'react';
import { View } from '@bluebase/components';
import { ViewStyle } from 'react-native';

export interface MiniListProps {
	items: MiniListItemProps[];
	loading?: boolean;
	style?: ViewStyle;
}

export const MiniList = (props: MiniListProps) => {
	const { loading, style } = props;
	const items = loading ? ([{}, {}, {}] as MiniListItemProps[]) : props.items;

	return (
		<View style={style} testID="specifications-root">
			{items.map((item, i) => (
				<MiniListItem key={i} {...item} loading={loading} />
			))}
		</View>
	);
};

MiniList.defaultProps = {
	items: [],
	loading: false,
};

MiniList.displayName = 'MiniList';
