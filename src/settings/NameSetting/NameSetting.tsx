import { Dialog, List, StatefulComponent } from '@bluebase/components';
import React, { useState } from 'react';
import { getComponent, useIntl } from '@bluebase/core';

import { LoadingState } from './LoadingState';
import { ThingNameFormProps } from '../../forms/exports';
import { ThingNodeQuery } from '../../graphql';
import get from 'lodash.get';
import { useQuery } from '@apollo/react-hooks';

const ThingNameForm = getComponent<ThingNameFormProps>('ThingNameForm');

export interface NameSettingProps {
	thingId: string;
}

export const NameSetting = ({ thingId }: NameSettingProps) => {
	const { __ } = useIntl();
	const [dialogVisible, setDialogVisible] = useState(false);

	const toggleDialog = () => setDialogVisible(!dialogVisible);

	const { data, loading, error } = useQuery(ThingNodeQuery, { variables: { id: thingId } });

	return (
		<StatefulComponent
			data={get(data, 'node.name')}
			loading={loading}
			error={error}
			loadingComponent={LoadingState}
		>
			<List.Item
				title={__('Name')}
				description={get(data, 'node.name')}
				left={<List.Icon name="domain" />}
				onPress={toggleDialog}
			/>
			<Dialog visible={dialogVisible} dismissable onDismiss={toggleDialog}>
				<ThingNameForm id={thingId} onSuccess={toggleDialog} />
			</Dialog>
		</StatefulComponent>
	);
};

NameSetting.displayName = 'NameSetting';
