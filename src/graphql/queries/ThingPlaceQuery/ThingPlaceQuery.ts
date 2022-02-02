import gql from 'graphql-tag';

export const ThingPlaceQuery = gql`
	query ThingPlaceQuery($id: ID) {
		node(id: $id) {
			... on Thing {
				id
				place {
					id
					name
					avatar(input: { height: 100, width: 100 })
				}
			}
		}
	}
`;
export const PlaceQuery = gql`
	query {
		viewer {
			me {
				id
				places {
					edges {
						node {
							id
							name
						}
					}
				}
			}
		}
	}
`;
