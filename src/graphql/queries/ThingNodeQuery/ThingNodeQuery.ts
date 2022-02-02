import gql from 'graphql-tag';

export const ThingNodeQuery = gql`
	query ThingNodeQuery($id: ID) {
		node(id: $id) {
			... on Thing {
				id
				name
				avatar
			}
		}
	}
`;
