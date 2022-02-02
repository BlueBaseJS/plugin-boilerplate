import DeleteSetting from '../DeleteSetting';
import React from 'react';
import { useNavigation } from '@bluebase/core';

export interface ThingDangerSettingsProps { }

export const ThingDangerSettings = (_props: ThingDangerSettingsProps) => {
	const { getParam } = useNavigation();

	const thingId = getParam('thingId', null);
	return (
		<DeleteSetting thingId={thingId} />
	);
};
