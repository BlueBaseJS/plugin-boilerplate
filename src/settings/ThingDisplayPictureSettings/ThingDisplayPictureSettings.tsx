import AvatarSetting from '../AvatarSetting';
import React from 'react';
import { useNavigation } from '@bluebase/core';

export const ThingDisplayPictureSettings = () => {
	const { getParam } = useNavigation();

	const thingId = getParam('thingId', null);
	return (
		<AvatarSetting thingId={thingId} />
	);
};

ThingDisplayPictureSettings.displayName = 'ThingDisplayPictureSettings';
