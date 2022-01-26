/* eslint-disable react/jsx-no-bind */
// import { OrderEdge, OrderListQueryQuery } from '../../graphql/types';
import { OrderListQuery, OrderListQueryUpdateQueryFn } from '../../graphql';

import { Divider } from '@bluebase/components';
import { GraphqlListProps } from '@blueeast/client-plugin-ui';
import { ListRenderItemInfo } from 'react-native';
import OrderListEmptyState from '../OrderListEmptyState';
import { OrderListItemProps } from '../OrderListItem';
import { QueryResult } from 'react-apollo';
import React from 'react';
import get from 'lodash.get';
import { getComponent } from '@bluebase/core';
import { getListPaginationType } from '../../helpers';

type OrderEdge = any;
type OrderListQueryQuery = any;

const GraphqlList = getComponent<GraphqlListProps<OrderListItemProps>>('GraphqlList');
const OrderListItem = getComponent<OrderListItemProps>('OrderListItem');

export interface OrderListProps extends Partial<GraphqlListProps<OrderListItemProps>> {
	onPress?: (item: OrderListItemProps) => void;
}

export const OrderList = (props: OrderListProps) => {
	const { queryOptions, loading, onPress } = props;

	/**
	 * Maps Query result to data. This data is then send to the FlatList and
	 * its items to use for UI rendering
	 */
	function mapQueryResultToListData(result: QueryResult<OrderListQueryQuery>) {
		// Extract Data
		const edges: OrderEdge[] = get(result, 'data.orders.edges', []);
		const data = edges.map(edge => ({
			...edge.node,

			avatar: get(edge, 'node.avatar') ? { uri: get(edge, 'node.avatar') } : undefined,
			thumbnail: get(edge, 'node.thumbnail') ? { uri: get(edge, 'node.thumbnail') } : undefined,
		}));

		// Append skeletons to data
		return data;
	}

	function mapQueryResultToConnection(result: QueryResult<OrderListQueryQuery>) {
		return get(result, 'data.orders');
	}

	function renderItem({ item }: ListRenderItemInfo<OrderListItemProps>) {
		const onPressFn = onPress ? () => onPress(item) : undefined;
		return <OrderListItem onPress={onPressFn} link={!onPress} {...item} />;
	}

	const renderDivider = () => <Divider inset />;

	return (
		<GraphqlList
			loading={loading}
			query={OrderListQuery}
			updateQueryInfinitePagination={OrderListQueryUpdateQueryFn}
			mapQueryResultToListData={mapQueryResultToListData}
			mapQueryResultToConnection={mapQueryResultToConnection}
			renderItem={renderItem}
			ItemSeparatorComponent={renderDivider}
			ListEmptyComponent={OrderListEmptyState}
			ListFooterComponent={props.ListFooterComponent!}
			key="order-list"
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

OrderList.displayName = 'OrderList';
