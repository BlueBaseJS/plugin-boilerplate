/* istanbul ignore file */

import { ShippingMethodListQuery } from '../ShippingMethodListQuery.graphql';
import faker from 'faker';

/**
 *
 * @param items Items to create
 * @param cursorIndex Starting index
 * @param totalCount Total number of items
 */

const createFakeData = (items: number, cursorIndex: number, totalCount: number) => {
	const edges = [];

	for (let index = 0; index < items; index++) {
		const finalCursor = cursorIndex + index;

		if (finalCursor >= totalCount) {
			break;
		}

		edges.push({
			cursor: finalCursor,
			node: {
				avatar: faker.random.boolean() ? faker.image.city(300, 300) : null,
				estimatedTimeOfDelivery: faker.lorem.sentence(faker.random.number({ min: 2, max: 5 })),
				id: faker.random.uuid(),
				price: faker.random.number(1000),
				title: faker.lorem.words(2),
			},
		});
	}

	const lastCursor = cursorIndex + items;

	const pageInfo = {
		hasNextPage: lastCursor < totalCount,
		hasPreviousPage: cursorIndex !== 0,
		startCursor: edges.length > 0 ? edges[0].cursor : null,

		endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
	};

	return {
		shippingMethods: {
			edges,
			pageInfo,
			totalCount,
		},
	};
};

export const ShippingMethodListQueryMocks = {
	successInfinite: (avatarSize = 142, itemsPerPage = 10) => [
		{
			request: {
				query: ShippingMethodListQuery,
				variables: {
					avatarSize,
					filter: {
						first: itemsPerPage,
					},
				},
			},
			result: {
				data: createFakeData(itemsPerPage, 0, 52),
			},
		},
		{
			request: {
				query: ShippingMethodListQuery,
				variables: {
					avatarSize,
					filter: {
						after: itemsPerPage - 1,
						first: itemsPerPage,
					},
				},
			},
			result: {
				data: createFakeData(itemsPerPage, itemsPerPage - 1, 52),
			},
		},
		{
			request: {
				query: ShippingMethodListQuery,
				variables: {
					avatarSize,
					filter: {
						after: itemsPerPage * 2 - 1,
						first: itemsPerPage,
					},
				},
			},
			result: {
				data: createFakeData(itemsPerPage, itemsPerPage * 2 - 1, 52),
			},
		},
	],

	successPagination: (avatarSize = 142, itemsPerPage = 10) => [
		{
			request: {
				query: ShippingMethodListQuery,
				variables: {
					avatarSize,
					filter: {
						limit: itemsPerPage,
						offset: 0,
					},
				},
			},
			result: {
				data: createFakeData(itemsPerPage, 0, 52),
			},
		},
		{
			request: {
				query: ShippingMethodListQuery,
				variables: {
					avatarSize,
					filter: {
						limit: itemsPerPage,
						offset: itemsPerPage,
					},
				},
			},
			result: {
				data: createFakeData(itemsPerPage, itemsPerPage - 1, 52),
			},
		},
		{
			request: {
				query: ShippingMethodListQuery,
				variables: {
					avatarSize,
					filter: {
						limit: itemsPerPage,
						offset: itemsPerPage * 2,
					},
				},
			},
			result: {
				data: createFakeData(itemsPerPage, itemsPerPage * 2 - 1, 52),
			},
		},
	],

	success: (avatarSize = 142, itemsPerPage = 10) => [
		...ShippingMethodListQueryMocks.successInfinite(avatarSize, itemsPerPage),
		...ShippingMethodListQueryMocks.successPagination(avatarSize, itemsPerPage),
	],

	successLight: (avatarSize = 142) => [
		{
			request: {
				query: ShippingMethodListQuery,
				variables: {
					avatarSize,
					filter: {
						first: 10,
					},
				},
			},
			result: {
				data: createFakeData(8, 0, 8),
			},
		},
	],

	empty: (avatarSize = 142, itemsPerPage = 10) => [
		{
			request: {
				query: ShippingMethodListQuery,
				variables: {
					avatarSize,
					filter: {
						first: itemsPerPage,
					},
				},
			},
			result: {
				data: createFakeData(0, 0, 0),
			},
		},
		{
			request: {
				query: ShippingMethodListQuery,
				variables: {
					avatarSize,
					filter: {
						limit: itemsPerPage,
						offset: 0,
					},
				},
			},
			result: {
				data: createFakeData(0, 0, 0),
			},
		},
	],

	networkError: {
		request: {
			query: ShippingMethodListQuery,
			variables: {},
		},
		result: {
			error: {
				name: 'ServerParseError',
				response: {},
				statusCode: 404,
				bodyText: `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>
					\n</head>\n<body>\n<pre>Cannot POST /graphql</pre>\n</body>\n</html>\n`,
			},
		},
	},

	graphQLErrorsUnAuthenticated: {
		request: {
			query: ShippingMethodListQuery,
			variables: {
				avatarSize: 142,
				filter: {
					first: 10,
				},
			},
		},
		result: {
			errors: [
				{
					extensions: {
						code: 'UNAUTHENTICATED',
					},
					locations: [],
					message: 'forbidden',
					path: ['protectedAction'],
				},
			],
		},
	},

	graphQLErrorsForbidden: {
		request: {
			query: ShippingMethodListQuery,
			variables: {
				avatarSize: 142,
				filter: {
					first: 10,
				},
			},
		},
		result: {
			errors: [
				{
					extensions: {
						code: 'FORBIDDEN',
					},
					locations: [],
					message: 'forbidden',
					path: ['protectedAction'],
				},
			],
		},
	},

	graphQLErrorsBadUserInput: {
		request: {
			query: ShippingMethodListQuery,
			variables: {},
		},
		result: {
			errors: [
				{
					message: 'Failed to get events due to validation errors',
					extensions: {
						code: 'BAD_USER_INPUT',
						exception: {
							validationErrors: {
								firstName: 'I m sorry, but we dont like your name.',
								password: 'The password cannot be less than 8 characters',
							},
						},
					},
				},
			],
		},
	},
};
