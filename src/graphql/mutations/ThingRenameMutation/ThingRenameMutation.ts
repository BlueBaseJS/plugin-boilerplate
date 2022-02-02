import gql from 'graphql-tag';

export const ThingRenameMutation = gql`
	mutation ThingRenameMutation($data: UpdateThingInput!, $clientMutationId: String!) {
		updateThing(input: $data, clientMutationId: $clientMutationId) {
			thing {
				name
			}
			clientMutationId
		}
	}
`;
