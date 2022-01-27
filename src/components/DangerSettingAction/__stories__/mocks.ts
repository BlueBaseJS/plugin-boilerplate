// tslint:disable: max-line-length object-literal-sort-keys
import gql from 'graphql-tag';

export const DeletePlaceMutation = gql`
	mutation DeletePlaceMutation($id: ID!) {
		deletePlace(id: $id)
	}
`;

export const networkError = {
	request: {
		query: DeletePlaceMutation,
		variables: {
			id: '123',
		},
	},
	error: Error('Boom!'),
};

export const success = [
	{
		request: {
			query: DeletePlaceMutation,
			variables: {
				id: '123',
			},
		},
		result: {
			data: {},
		},
	},
];
