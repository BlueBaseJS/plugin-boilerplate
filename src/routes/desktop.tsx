import { Platform } from 'react-native';
import React from 'react';
import { RouteConfig } from '@bluebase/components';
import { RouteOptions } from '@bluebase/core';
import { ThingProfileSettingsButton } from '../components/exports';

export const desktopRoutes = async (routeOptions: RouteOptions): Promise<RouteConfig[]> => {
	const { intl } = routeOptions;

	return [
		{
			// exact: true,
			name: 'ThingProfile',
			path: ':thingId',
			screen: 'ThingProfileScreen',

			options: ({ route }: any) => {
				const headerLeft = Platform.OS === 'web' ? () => null : undefined;
				const headerRight = () => <ThingProfileSettingsButton params={route.params} />;

				return {
					headerLeft: headerLeft,
					headerRight: headerRight,
					title: route.params.title || intl.__('Thing'),
				} as any;
			},
		},
	];
};
