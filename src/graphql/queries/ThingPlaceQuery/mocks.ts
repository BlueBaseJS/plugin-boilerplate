import { PlaceQuery, ThingPlaceQuery } from './ThingPlaceQuery';

const id = '123';

export const ThingPlaceQueryMocks = {
	error: {
		error: Error('Network Error!'),
		request: {
			query: ThingPlaceQuery,
			variables: {
				id,
			},
		},
	},

	success: {
		request: {
			__typename: 'Thing',
			query: ThingPlaceQuery,
			variables: {
				id: '123',
			},
		},
		result: {
			data: {
				node: {
					__typename: 'Thing',
					id,
					place: {
						__typename: 'Place',
						avatar: 'test-place-avatar',
						id: 'test-place-id',
						name: 'test-place-name',
					},
				},
			},
		},
	},
};

export const PlaceQueryMocks = {
	success: {
		request: {
			query: PlaceQuery,
		},
		result: {
			data: {
				viewer: {
					me: {
						id,
						places: {
							edges: [
								{
									node: {
										id,
										name: null,
									},
								},
							],
						},
					},
				},
			},
		},
	},
};

export const PlaceQueryEmptyMocks = {
	success: {
		request: {
			query: PlaceQuery,
		},
		result: {
			data: {
				viewer: {
					me: {
						id,
						places: {
							edges: [],
						},
					},
				},
			},
		},
	},
};
