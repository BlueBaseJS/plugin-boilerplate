import { BlueBase } from '@bluebase/core';
import { ThingPlaceQuery } from '../../queries';
import get from 'lodash.get';
import gql from 'graphql-tag';

export const ThingPlaceUpdateMutation = gql`
	mutation ThingPlaceUpdateMutation($data: UpdateThingInput!, $clientMutationId: String!) {
		updateThing(input: $data, clientMutationId: $clientMutationId) {
			thing {
				id
				name
				place {
					id
					name
					avatar
				}
			}
			clientMutationId
		}
	}
`;
export function ThingPlaceUpdateMutationUpdateFn(id: string, BB: BlueBase) {
	return (store: any, Data: any) => {
		try {
			// Read the data from our cache for this query.
			const storeData = store.readQuery({
				query: ThingPlaceQuery,
				variables: { id: id },
			});
			storeData.node.place.name = get(Data.data, 'updateThing.thing.place.name');
			storeData.node.place.id = get(Data.data, 'updateThing.thing.place.id');
			storeData.node.place.avatar = get(Data.data, 'updateThing.thing.place.avatar');
			// Write our data back to the cache.
			store.writeQuery({ query: ThingPlaceQuery, data: { ...storeData } });
		} catch (e) {
			BB.Logger.error('Error while updating store of PlaceSetting', e);
		}
	};
}
