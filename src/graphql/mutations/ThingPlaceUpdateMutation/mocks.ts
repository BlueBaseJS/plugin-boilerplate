import { ThingPlaceUpdateMutation } from './ThingPlaceUpdateMutation';

const id = '123';

export const ThingPlaceUpdateMutationMocks = {
	error: {
		error: Error('Network Error!'),
		request: {
			query: ThingPlaceUpdateMutation,
			variables: {
				id,
			},
		},
	},

	success: {
		request: {
			__typename: 'Thing',
			query: ThingPlaceUpdateMutation,
			variables: {
				clientMutationId: 'test-clientMutationId',
				data: {
					id,
					place: 'test-place-id-2',
				},
			},
		},
		result: {
			__typename: 'Thing',
			data: {
				clientMutationId: 'test-clientMutationId',
				updateThing: {
					thing: {
						__typeName: 'Thing',
						id: '123',
						name: 'test-name',
						place: {
							__typeName: 'Place',
							avatar: 'test-avatar',
							id: 'test-place-id-2',
							name: 'Second Place',
						},
					},
				},
			},
		},
	},
};
