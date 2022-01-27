import { FetchMoreOptions } from 'apollo-client';
import get from 'lodash.get';
import gql from 'graphql-tag';

export const ShippingMethodListQuery = gql`
	query ShippingMethodListQuery($filter: FilterInput!) {
		shippingMethods(filter: $filter) {
			edges {
				cursor
				node {
					id
					title
					estimatedTimeOfDelivery
					price
					avatar
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

export const ShippingMethodListQueryUpdateQueryFn: FetchMoreOptions['updateQuery'] = (
	previousResult,
	{ fetchMoreResult }
) => {
	if (!fetchMoreResult) {
		return previousResult;
	}

	const prevEdges = get(previousResult, 'shippingMethods.edges', []);
	const newEdges = get(fetchMoreResult, 'shippingMethods.edges', []);

	if (newEdges.length) {
		return {
			// Put the new items at the end of the list and update `pageInfo`
			// so we have the new `endCursor` and `hasNextPage` values
			shippingMethods: {
				...get(previousResult, 'shippingMethods', undefined),

				edges: [...prevEdges, ...newEdges],
				pageInfo: {
					...get(previousResult, 'shippingMethods.pageInfo'),

					endCursor: get(fetchMoreResult, 'shippingMethods.pageInfo.endCursor'),
					hasNextPage: get(fetchMoreResult, 'shippingMethods.pageInfo.hasNextPage'),

					hasPreviousPage: get(previousResult, 'shippingMethods.pageInfo.hasPreviousPage'),
					startCursor: get(previousResult, 'shippingMethods.pageInfo.startCursor'),
				},
			},
		};
	}

	return previousResult;
};
