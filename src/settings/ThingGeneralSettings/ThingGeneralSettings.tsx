import { Divider } from '@bluebase/components';
import NameSetting from '../NameSetting';
import React from 'react';
import ThingPlaceSelector from '../ThingPlaceSelector';
import { useNavigation } from '@bluebase/core';

export const ThingGeneralSettings = () => {
	const { getParam } = useNavigation();

	const thingId = getParam('thingId', null);
	return (
		<React.Fragment>
			<NameSetting thingId={thingId} />
			<Divider inset />
			<ThingPlaceSelector thingId={thingId} />
		</React.Fragment>
	);
};

ThingGeneralSettings.displayName = 'ThingGeneralSettings';
