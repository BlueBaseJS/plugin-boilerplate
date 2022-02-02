import gql from 'graphql-tag';

export const ThingProductQuery = gql`
	query ThingProductQuery($id: ID) {
		node(id: $id) {
			... on Thing {
				id
				name
				metadata

				product {
					id
					name
					avatar(input: { width: 100, height: 100 })

					brand {
						id
						name
					}

					category {
						id
						name
					}
				}
			}
		}
	}
`;
