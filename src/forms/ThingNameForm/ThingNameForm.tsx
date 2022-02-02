import { ThingNodeQuery, ThingRenameMutation } from '../../graphql';
import { getComponent, makeId, useBlueBase } from '@bluebase/core';

import { JsonGraphqlFormProps } from '@bluebase/plugin-json-graphql-components';
import React from 'react';
import get from 'lodash.get';

interface Values {
	id?: string;
	name?: string;
}

const JsonGraphqlForm = getComponent<JsonGraphqlFormProps<Values>>('JsonGraphqlForm');

export interface ThingNameFormProps {
	id: string;
	onSuccess: () => void;
}

export const ThingNameForm = ({ id, onSuccess }: ThingNameFormProps) => {
	const BB = useBlueBase();

	const mapQueryDataToInitialValues = (input: any) => ({
		name: get(input, 'node.name'),
	});

	const mapFormValuesToMutationVariables = (values: any) => ({
		clientMutationId: makeId(),
		data: {
			id,
			name: values.name,
		},
	});

	const update = (store: any, { data }: any) => {
		try {
			// Read the data from our cache for this query.
			const Data = store.readQuery({ query: ThingNodeQuery, variables: { id } });
			// Add our comment from the mutation to the end.
			Data.node.name = get(data, 'updateThing.thing.name');
			// Write our data back to the cache.
			store.writeQuery({ query: ThingNodeQuery, Data });
		} catch (e) {
			return BB.Logger.error('An error occurred in ThingNameForm', e);
		}
	};

	return (
		<JsonGraphqlForm
			query={{ query: ThingNodeQuery, variables: { id } }}
			mutation={{ mutation: ThingRenameMutation, update }}
			onSuccess={onSuccess}
			mapQueryDataToInitialValues={mapQueryDataToInitialValues}
			mapFormValuesToMutationVariables={mapFormValuesToMutationVariables}
			schema={{
				description: 'Type a new thing name here',
				title: 'Thing Name',

				fields: [
					{
						name: 'name',
						type: 'text',
					},
					{
						name: 'status',
						type: 'status',
					},
					{
						name: 'submit',
						title: 'Save',
						type: 'submit',
					},
				],

				initialValues: { id },
			}}
		/>
	);
};
