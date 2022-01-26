import { FetchMoreOptions } from 'apollo-client';
import get from 'lodash.get';
import gql from 'graphql-tag';

export const OrderListQuery = gql`
	query OrderListQuery($filter: FilterInput!) {
		orders(filter: $filter) {
			edges {
				cursor
				node {
					id
					title
					orderName
					totalPrice
					quantity
					avatar
					createdAt
					status {
						title
						color
						backgroundColor
					}
				}
			}

			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
				endCursor
			}

			totalCount
		}
	}
`;

export const OrderListQueryUpdateQueryFn: FetchMoreOptions['updateQuery'] = (
	previousResult,
	{ fetchMoreResult }
) => {
	if (!fetchMoreResult) {
		return previousResult;
	}

	const prevEdges = get(previousResult, 'orders.edges', []);
	const newEdges = get(fetchMoreResult, 'orders.edges', []);

	if (newEdges.length) {
		return {
			// Put the new items at the end of the list and update `pageInfo`
			// so we have the new `endCursor` and `hasNextPage` values
			orders: {
				...get(previousResult, 'orders', undefined),

				edges: [...prevEdges, ...newEdges],
				pageInfo: {
					...get(previousResult, 'orders.pageInfo'),

					endCursor: get(fetchMoreResult, 'orders.pageInfo.endCursor'),
					hasNextPage: get(fetchMoreResult, 'orders.pageInfo.hasNextPage'),

					hasPreviousPage: get(previousResult, 'orders.pageInfo.hasPreviousPage'),
					startCursor: get(previousResult, 'orders.pageInfo.startCursor'),
				},
			},
		};
	}

	return previousResult;
};
