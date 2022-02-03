import gql from 'graphql-tag';
export const AvatarQuery = (type: string) => gql`
query AvatarQuery($id: ID) {
	node(id: $id) {
		... on ${type} {
			id
			avatar
		}
	}
}
`;
