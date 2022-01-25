/* eslint-disable max-len */
import Permission, { PermissionProps } from '../Permission';

import { LOCATION } from 'expo-permissions';
import React from 'react';

export interface LocationPermissionProps extends Partial<PermissionProps> {}

export const LocationPermission = (props: LocationPermissionProps) => {
	return (
		<Permission
			prompts={{
				ask: {
					title: 'Permission to access Background Location',
					message:
					// eslint-disable-next-line max-len
					 `App requires location access when the app is closeds to pull accurate weather data for energy predictions, autopilot feature and associate location to your app places.`,
				},

				deny: {
					title: `Permission denied`,
					message: `App requires location access to pull accurate weather data for energy predictions, autopilot feature and associate location to your app places.`,
				},
			}}
			{...props}
			type={LOCATION}
		/>
	);
};

LocationPermission.displayName = 'LocationPermission';
