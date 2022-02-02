import { ThingDeleteMutation } from './ThingDeleteMutation';

const id = '123';

export const ThingDeleteMutationMocks = {
	error: {
		error: Error('Network Error!'),
		request: {
			query: ThingDeleteMutation,
			variables: {
				id,
			},
		},
	},

	success: {
		request: {
			query: ThingDeleteMutation,
			variables: {
				id,
			},
		},
		result: {
			data: { deleteThing: {} },
		},
	},
};
