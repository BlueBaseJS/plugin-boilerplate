import { List, StatefulComponent } from '@bluebase/components';

import { ProductInfoEmptyState } from './EmptyState';
import { ProductInfoLoadingState } from './LoadingState';
import React from 'react';
import { ThingProductQuery } from '../../graphql';
import get from 'lodash.get';
import { useQuery } from '@apollo/react-hooks';

export const ProductInfoSetting = ({ thingId }: { thingId: string }) => {
	const { data, loading, error } = useQuery(ThingProductQuery, { variables: { id: thingId } });

	const avatar = get(data, 'node.product.avatar');

	return (
		<StatefulComponent
			data={get(data, 'node.product')}
			loading={loading}
			error={error}
			emptyComponent={ProductInfoEmptyState}
			loadingComponent={ProductInfoLoadingState}
		>
			<List.Item
				title={get(data, 'node.product.name')}
				description={get(data, 'node.product.brand.name')}
				left={
					<List.Avatar
						type="image"
						variant="rounded"
						image={avatar ? { uri: avatar } : 'ProductPlaceholder'}
					/>
				}
			/>
		</StatefulComponent>
	);
};

ProductInfoSetting.displayName = 'ProductInfoSetting';
