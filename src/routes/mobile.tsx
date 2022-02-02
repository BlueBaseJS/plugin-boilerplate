import { ThingProfileBackButton, ThingProfileSettingsButton } from '../components/exports';

import { Platform } from 'react-native';
import React from 'react';
import { RouteConfig } from '@bluebase/components';
import { RouteOptions } from '@bluebase/core';

export const mobileRoutes = async (routeOptions: RouteOptions): Promise<RouteConfig[]> => {
	const { theme, intl } = routeOptions;

	return [
		{
			// exact: true,
			name: 'ThingProfile',
			path: ':thingId',
			screen: 'ThingProfileScreen',

			options: ({ route }: any) => {
				const headerLeft = Platform.OS === 'web' ? () => <ThingProfileBackButton /> : undefined;
				const headerRight = () => <ThingProfileSettingsButton params={route.params} />;

				const headerStyle = {
					...theme.elevation(0),
					borderBottomWidth: 0,
				};

				return {
					headerLeft: headerLeft,
					headerRight: headerRight,
					headerStyle,
					title: route.params.title || intl.__('Thing'),
				} as any;
			},
		},
	];
};
