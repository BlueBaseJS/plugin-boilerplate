import { getComponent, useNavigation } from '@bluebase/core';

import { JsonLayoutProps } from '@bluebase/plugin-json-schema-components';
import React from 'react';

const JsonLayout = getComponent<JsonLayoutProps>('JsonLayout');

export const ThingProfileSensorsScreen = () => {
	const { getParam } = useNavigation();

	// We don't check for null here, because we rely on the check already done
	// by ThingProfileScreen
	const thingId = getParam('thingId', null);

	return (
		<JsonLayout
			filter="mevris.app.things.layout.thing-profile-seonsors-screen"
			schema={{
				component: 'SensorsList',
				props: {
					id: thingId,
					widget: false,
				},
			}}
		/>
	);
};
