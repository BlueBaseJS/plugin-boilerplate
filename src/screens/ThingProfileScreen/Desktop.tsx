import { Icon, LoadingState, NavigatorProps, RouteConfig } from '@bluebase/components';
import { getComponent, useBlueBase, useFilter, useIntl, useTheme } from '@bluebase/core';

import React from 'react';

const Navigator = getComponent<NavigatorProps>('Navigator');

export interface ThingProfileScreenDesktopProps {
	thingId: string;
}

export const ThingProfileScreenDesktop = (props: ThingProfileScreenDesktopProps) => {
	const { thingId } = props;

	const { theme } = useTheme();
	const intl = useIntl();
	const BB = useBlueBase();

	const { value: routes, loading } = useFilter(
		'mevris.app.things.routes.thing-profile.desktop',
		[
			{
				name: 'ThingProfileOverview',
				path: 'overview',
				screen: 'ThingProfileOverviewScreen',

				options: {
					tabBarIcon: () => <Icon name="google-controller" color={theme.palette.text.primary} />,
					title: intl.__('Overview'),
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
		type: 'tab',

		tabBarOptions: {
			labelStyle: {
				color: theme.palette.text.primary
			},
			showIcon: true,
			style: {
				borderBottomColor: theme.palette.divider,
				borderBottomStyle: 'solid',
				borderBottomWidth: 1,
			},
			tabStyle: {
				// color: '#FFF',
				flexDirection: 'row',
				paddingHorizontal: theme.spacing.unit * 2,
				width: 'auto',
			},
		},
	};

	return <Navigator {...navigator} standalone />;
};
