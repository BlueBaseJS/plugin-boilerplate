/* eslint-disable react/jsx-no-bind */
// import { ShippingMethodEdge, ShippingMethodListQueryQuery } from '../../graphql/types';
import { ShippingMethodListQuery, ShippingMethodListQueryUpdateQueryFn } from '../../graphql';

import { Divider } from '@bluebase/components';
import { GraphqlListProps } from '@blueeast/client-plugin-ui';
import { ListRenderItemInfo } from 'react-native';
import { QueryResult } from 'react-apollo';
import React from 'react';
import ShippingMethodListEmptyState from '../ShippingMethodListEmptyState';
import { ShippingMethodListItemProps } from '../ShippingMethodListItem';
import get from 'lodash.get';
import { getComponent } from '@bluebase/core';
import { getListPaginationType } from '../../helpers';

type ShippingMethodEdge = any;
type ShippingMethodListQueryQuery = any;

const GraphqlList = getComponent<GraphqlListProps<ShippingMethodListItemProps>>('GraphqlList');
const ShippingMethodListItem = getComponent<ShippingMethodListItemProps>('ShippingMethodListItem');

export interface ShippingMethodListProps extends Partial<GraphqlListProps<ShippingMethodListItemProps>> {
	onPress?: (item: ShippingMethodListItemProps) => void;
}

export const ShippingMethodList = (props: ShippingMethodListProps) => {
	const { queryOptions, loading, onPress } = props;

	/**
	 * Maps Query result to data. This data is then send to the FlatList and
	 * its items to use for UI rendering
	 */
	function mapQueryResultToListData(result: QueryResult<ShippingMethodListQueryQuery>) {
		// Extract Data
		const edges: ShippingMethodEdge[] = get(result, 'data.shippingMethods.edges', []);
		const data = edges.map(edge => ({
			...edge.node,

			avatar: get(edge, 'node.avatar') ? { uri: get(edge, 'node.avatar') } : undefined,
			thumbnail: get(edge, 'node.thumbnail') ? { uri: get(edge, 'node.thumbnail') } : undefined,
		}));

		// Append skeletons to data
		return data;
	}

	function mapQueryResultToConnection(result: QueryResult<ShippingMethodListQueryQuery>) {
		return get(result, 'data.shippingMethods');
	}

	function renderItem({ item }: ListRenderItemInfo<ShippingMethodListItemProps>) {
		const onPressFn = onPress ? () => onPress(item) : undefined;
		return <ShippingMethodListItem onPress={onPressFn} link={!onPress} {...item} />;
	}

	const renderDivider = () => <Divider inset />;

	return (
		<GraphqlList
			loading={loading}
			query={ShippingMethodListQuery}
			updateQueryInfinitePagination={ShippingMethodListQueryUpdateQueryFn}
			mapQueryResultToListData={mapQueryResultToListData}
			mapQueryResultToConnection={mapQueryResultToConnection}
			renderItem={renderItem}
			ItemSeparatorComponent={renderDivider}
			ListEmptyComponent={ShippingMethodListEmptyState}
			ListFooterComponent={props.ListFooterComponent!}
			key="shippingmethod-list"
			pagination={getListPaginationType()}
			itemsPerPage={10}
			{...props}
			queryOptions={{
				...queryOptions,
				variables: {
					avatarSize: 100,
					...get(queryOptions, 'variables'),
				},
			}}
		/>
	);
};

ShippingMethodList.displayName = 'ShippingMethodList';
