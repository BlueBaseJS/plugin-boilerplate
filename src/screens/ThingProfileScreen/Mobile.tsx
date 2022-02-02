import { Icon, LoadingState, NavigatorProps, RouteConfig } from '@bluebase/components';
import { getComponent, useBlueBase, useFilter, useIntl, useTheme } from '@bluebase/core';

import React from 'react';

const Navigator = getComponent<NavigatorProps>('Navigator');

export interface ThingProfileScreenMobileProps {
	thingId: string;
}

export const ThingProfileScreenMobile = (props: ThingProfileScreenMobileProps) => {
	const { thingId } = props;

	const { theme } = useTheme();
	const intl = useIntl();
	const BB = useBlueBase();

	const { value: routes, loading } = useFilter(
		'mevris.app.things.routes.thing-profile.mobile',
		[
			{
				name: 'ThingProfileOverview',
				path: 'overview',
				screen: 'ThingProfileOverviewScreen',

				options: {
					tabBarIcon: ({ color }: any) => <Icon name="google-controller" color={color} />,
					title: intl.__('Controls'),
				},
			},
			{
				name: 'ThingProfileSensors',
				path: 'sensors',
				screen: 'ThingProfileSensorsScreen',

				options: {
					tabBarIcon: ({ color }: any) => <Icon name="gauge" color={color} />,
					title: intl.__('Sensors'),
				},
			},
		] as RouteConfig[],
		{ BB, intl, theme, thingId }
	);

	if (loading) {
		return <LoadingState />;
	}

	const navigator = {
		routes,
		tabBarOptions: {
			scrollEnabled: true,
			showIcon: true,
			tabStyle: {
				// color: '#FFF',
				flexDirection: 'row',
				paddingHorizontal: theme.spacing.unit * 2,
				width: 'auto',
			},

			style: {
				// backgroundColor: theme.palette.primary.main,
				zIndex: 2000,
				...theme.elevation(1),
			},

			indicatorStyle: {
				backgroundColor: theme.palette.secondary.main,
			},
		},
		type: 'tab'
	};

	return <Navigator standalone {...navigator} />;
};
