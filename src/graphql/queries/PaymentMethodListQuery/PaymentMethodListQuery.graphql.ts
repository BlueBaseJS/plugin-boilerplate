import { FetchMoreOptions } from 'apollo-client';
import get from 'lodash.get';
import gql from 'graphql-tag';

export const PaymentMethodListQuery = gql`
	query PaymentMethodListQuery($filter: FilterInput!) {
		paymentMethods(filter: $filter) {
			edges {
				cursor
				node {
					id
					title
					instructions
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

export const PaymentMethodListQueryUpdateQueryFn: FetchMoreOptions['updateQuery'] = (
	previousResult,
	{ fetchMoreResult }
) => {
	if (!fetchMoreResult) {
		return previousResult;
	}

	const prevEdges = get(previousResult, 'paymentMethods.edges', []);
	const newEdges = get(fetchMoreResult, 'paymentMethods.edges', []);

	if (newEdges.length) {
		return {
			// Put the new items at the end of the list and update `pageInfo`
			// so we have the new `endCursor` and `hasNextPage` values
			paymentMethods: {
				...get(previousResult, 'paymentMethods', undefined),

				edges: [...prevEdges, ...newEdges],
				pageInfo: {
					...get(previousResult, 'paymentMethods.pageInfo'),

					endCursor: get(fetchMoreResult, 'paymentMethods.pageInfo.endCursor'),
					hasNextPage: get(fetchMoreResult, 'paymentMethods.pageInfo.hasNextPage'),

					hasPreviousPage: get(previousResult, 'paymentMethods.pageInfo.hasPreviousPage'),
					startCursor: get(previousResult, 'paymentMethods.pageInfo.startCursor'),
				},
			},
		};
	}

	return previousResult;
};
