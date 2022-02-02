import { JsonLayout, SidebarLayout } from '../../imports';
import { useIntl, useTheme } from '@bluebase/core';

import React from 'react';

export interface ThingProfileOverviewScreenDesktopProps {
	thingId: string;
}

export const ThingProfileOverviewScreenDesktop = ({
	thingId,
}: ThingProfileOverviewScreenDesktopProps) => {
	const { theme } = useTheme();
	const { __ } = useIntl();

	return (
		<SidebarLayout
			SidebarContentComponent={
				<JsonLayout
					filter="mevris.app.things.layout.thing-profile-overview.desktop.sidebar"
					args={{ thingId }}
					schema={{
						component: 'View',
						props: {
							style: { flexGrow: 1 },
						},

						children: [
							{
								component: 'DynamicControlUI',
								props: { id: thingId, widget: true, title: __('Controls') },
							},
							{
								component: 'SensorsList',
								props: { id: thingId, widget: true, title: __('Sensors') },
							},
						],
					}}
				/>
			}
			MainContentComponent={
				<JsonLayout
					filter="mevris.app.things.layout.thing-profile-overview.desktop.main"
					args={{ thingId }}
					schema={{
						component: 'View',
						props: {
							style: { flexGrow: 1 },
						},

						children: [],
					}}
				/>
			}
			styles={{
				mainContent: { padding: 0, flexGrow: 1 },
				sidebarContent: { padding: theme.spacing.unit * 2 },
			}}
		/>
	);
};

export default ThingProfileOverviewScreenDesktop;
