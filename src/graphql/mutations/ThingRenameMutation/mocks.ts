import { ThingRenameMutation } from './ThingRenameMutation';

const id = '123';

export const ThingRenameMutationMocks = {
	error: {
		error: Error('Network Error!'),
		request: {
			query: ThingRenameMutation,
			variables: {
				id,
			},
		},
	},

	success: {
		request: {
			query: ThingRenameMutation,
			variables: {
				clientMutationId: 'test-clientMutationId',
				data: {
					id,
					name: 'test-name1',
				},
			},
		},
		result: {
			data: {
				updateThing: {
					clientMutationId: 'test-clientMutationId',
					thing: {
						__typename: 'Thing',
						name: 'test-name1',
					},
				},
			},
		},
	},
};
