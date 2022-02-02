import { Divider, List, StatefulComponent, Text, View } from '@bluebase/components';

import { ProductDetailSettingLoadingState } from './LoadingState';
import { ProductInfoEmptyState } from './EmptyState';
import React from 'react';
import { ThingProductQuery } from '../../graphql';
import get from 'lodash.get';
import { useQuery } from '@apollo/react-hooks';

export const ProductDetailSetting = ({ thingId }: { thingId: string }) => {
	const { data, loading, error } = useQuery(ThingProductQuery, { variables: { id: thingId } });

	const AssetInfo = get(data, 'node.metadata');
	return (
		<StatefulComponent
			data={get(data, 'node.metadata')}
			loading={loading}
			error={error}
			emptyComponent={ProductInfoEmptyState}
			loadingComponent={ProductDetailSettingLoadingState}
		>
			{loading
				? null
				: AssetInfo.map((item: any, index: any) => (
						<View>
							{index > 0 ? <Divider /> : null}

							<List.Item
								style={{ padding: 16 }}
								title=""
								right={<Text>{item.value}</Text>}
								left={<Text style={{ flex: 1, color: '#757575' }}>{item.title}</Text>}
							/>
						</View>
				  ))}
		</StatefulComponent>
	);
};

ProductDetailSetting.displayName = 'ProductDetailSetting';
