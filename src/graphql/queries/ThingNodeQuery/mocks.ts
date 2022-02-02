import { ThingNodeQuery } from './ThingNodeQuery';

const id = '123';

export const ThingNodeQueryMocks = {
	error: {
		error: Error('Network Error!'),
		request: {
			query: ThingNodeQuery,
			variables: {
				id,
			},
		},
	},

	success: {
		request: {
			query: ThingNodeQuery,
			variables: {
				id,
			},
		},
		result: {
			data: {
				node: {
					__typename: 'Thing',
					avatar: 'hello',
					id,
					name: 'test-name',
				},
			},
		},
	},
};
