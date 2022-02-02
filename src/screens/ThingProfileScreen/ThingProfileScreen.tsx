import React from 'react';
import { ThingProfileScreenDesktop } from './Desktop';
import { ThingProfileScreenMobile } from './Mobile';
import { isMobile } from '@bluebase/core';

export interface ThingProfileScreenProps {
	thingId: string;
}

export const ThingProfileScreen = (props: ThingProfileScreenProps) => {
	const { thingId } = props;

	return isMobile() ? (
		<ThingProfileScreenMobile thingId={thingId} />
	) : (
		<ThingProfileScreenDesktop thingId={thingId} />
	);
};
