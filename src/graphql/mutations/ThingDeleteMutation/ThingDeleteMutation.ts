import gql from 'graphql-tag';

export const ThingDeleteMutation = gql`
	mutation ThingDeleteMutation($data: DeleteMutationInput) {
		deleteThing(input: $data) {
			id
		}
	}
`;
