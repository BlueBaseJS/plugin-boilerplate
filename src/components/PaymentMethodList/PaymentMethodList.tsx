/* eslint-disable react/jsx-no-bind */
// import { PaymentMethodEdge, PaymentMethodListQueryQuery } from '../../graphql/types';
import { PaymentMethodListQuery, PaymentMethodListQueryUpdateQueryFn } from '../../graphql';

import { Divider } from '@bluebase/components';
import { GraphqlListProps } from '@blueeast/client-plugin-ui';
import { ListRenderItemInfo } from 'react-native';
import PaymentMethodListEmptyState from '../PaymentMethodListEmptyState';
import { PaymentMethodListItemProps } from '../PaymentMethodListItem';
import { QueryResult } from 'react-apollo';
import React from 'react';
import get from 'lodash.get';
import { getComponent } from '@bluebase/core';
import { getListPaginationType } from '../../helpers';

type PaymentMethodEdge = any;
type PaymentMethodListQueryQuery = any;

const GraphqlList = getComponent<GraphqlListProps<PaymentMethodListItemProps>>('GraphqlList');
const PaymentMethodListItem = getComponent<PaymentMethodListItemProps>('PaymentMethodListItem');

export interface PaymentMethodListProps extends Partial<GraphqlListProps<PaymentMethodListItemProps>> {
	onPress?: (item: PaymentMethodListItemProps) => void;
}

export const PaymentMethodList = (props: PaymentMethodListProps) => {
	const { queryOptions, loading, onPress } = props;

	/**
	 * Maps Query result to data. This data is then send to the FlatList and
	 * its items to use for UI rendering
	 */
	function mapQueryResultToListData(result: QueryResult<PaymentMethodListQueryQuery>) {
		// Extract Data
		const edges: PaymentMethodEdge[] = get(result, 'data.paymentMethods.edges', []);
		const data = edges.map(edge => ({
			...edge.node,

			avatar: get(edge, 'node.avatar') ? { uri: get(edge, 'node.avatar') } : undefined,
			thumbnail: get(edge, 'node.thumbnail') ? { uri: get(edge, 'node.thumbnail') } : undefined,
		}));

		// Append skeletons to data
		return data;
	}

	function mapQueryResultToConnection(result: QueryResult<PaymentMethodListQueryQuery>) {
		return get(result, 'data.paymentMethods');
	}

	function renderItem({ item }: ListRenderItemInfo<PaymentMethodListItemProps>) {
		const onPressFn = onPress ? () => onPress(item) : undefined;
		return <PaymentMethodListItem onPress={onPressFn} link={!onPress} {...item} />;
	}

	const renderDivider = () => <Divider inset />;

	return (
		<GraphqlList
			loading={loading}
			query={PaymentMethodListQuery}
			updateQueryInfinitePagination={PaymentMethodListQueryUpdateQueryFn}
			mapQueryResultToListData={mapQueryResultToListData}
			mapQueryResultToConnection={mapQueryResultToConnection}
			renderItem={renderItem}
			ItemSeparatorComponent={renderDivider}
			ListEmptyComponent={PaymentMethodListEmptyState}
			ListFooterComponent={props.ListFooterComponent!}
			key="paymentmethod-list"
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

PaymentMethodList.displayName = 'PaymentMethodList';
