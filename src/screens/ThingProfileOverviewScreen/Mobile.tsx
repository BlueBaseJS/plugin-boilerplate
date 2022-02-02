import { JsonLayout } from '../../imports';
import React from 'react';

export const ThingProfileOverviewScreenMobile = ({ thingId }: { thingId: string }) => {
	return (
		<JsonLayout
			filter="mevris.app.things.layout.thing-profile-overview.mobile"
			args={{ thingId }}
			schema={{
				component: 'View',
				props: {
					style: { flexGrow: 1 },
				},

				children: [
					{
						component: 'DynamicControlUI',
					},
				],
			}}
		/>
	);
};

export default ThingProfileOverviewScreenMobile;
