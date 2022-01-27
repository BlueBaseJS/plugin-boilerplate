import { Divider, View } from '@bluebase/components';

import { FeatureItemCollapsible } from './FeatureItemCollapsible';
import { FeatureItemType } from './FeatureItem';
import React from 'react';
import { ViewStyle } from 'react-native';

export interface FeatureListCollapsibleProps {
	openItems: number;
	items?: FeatureItemType[];
	loading?: boolean;
	style?: ViewStyle;
}

export const FeatureListCollapsible = (props: FeatureListCollapsibleProps) => {
	const { openItems, loading, style } = props;
	const items = loading ? [{}, {}, {}] : props.items;

	return (
		<View style={style} testID="feature-list-root">
			{items!.map((item, i) => (
				<React.Fragment key={i}>
					<FeatureItemCollapsible {...item} loading={loading} open={i < openItems} />
					{i < items!.length - 1 ? <Divider /> : null}
				</React.Fragment>
			))}
		</View>
	);
};

FeatureListCollapsible.defaultProps = {
	items: [],
	loading: false,
	openItems: 2,
};

FeatureListCollapsible.displayName = 'FeatureListCollapsible';
