import * as React from 'react';

import { ThingDeleteMutation, ThingNodeQuery } from '../../graphql';
import { makeId, useNavigation } from '@bluebase/core';

import { DangerSettingAction } from '../../imports';
import { StatefulComponent } from '@bluebase/components';
import get from 'lodash.get';
import { useQuery } from '@apollo/react-hooks';

export interface DeleteSettingProps {
	thingId: string;
}

export const DeleteSetting = ({ thingId }: DeleteSettingProps) => {
	const { navigate } = useNavigation();
	const { data, error, loading } = useQuery(ThingNodeQuery, { variables: { id: thingId } });

	const onSuccess = () => {
		navigate('ThingsApp');
	};

	return (
		<StatefulComponent data={get(data, 'node.name')} loading={loading} error={error}>
			<DangerSettingAction
				code={get(data, 'node.name')}
				onSuccess={onSuccess}
				mutation={{
					mutation: ThingDeleteMutation,
					refetchQueries: ['ThingListQuery'],
					variables: {
						data: {
							clientMutationId: makeId(),
							id: thingId,
						},
					},
				}}
				schema={{ initialValues: { id: thingId, code: '' } }}
				iconProps={{ name: 'delete' }}
				title={'Delete this thing'}
				description={'Once you delete this thing, there is no going back, Please be certain'}
				formTitle={'Delete Thing'}
				formButtonTitle={'Delete this thing'}
				formDescription="Confirm your thing to delete"
				formTextFieldLabel="Thing Name"
			/>
		</StatefulComponent>
	);
};

DeleteSetting.displayName = 'DeleteSetting';
