import { isMobile, useNavigation } from '@bluebase/core';

import Desktop from './Desktop';
import Mobile from './Mobile';
import React from 'react';

export const ThingProfileOverviewScreen = (_props: any) => {
	const { getParam } = useNavigation();

	// We don't check for null here, because we rely on the check already done
	// by ThingProfileScreen
	const thingId = getParam('thingId', null);

	return isMobile() ? <Mobile thingId={thingId} /> : <Desktop thingId={thingId} />;
};
