import React, { useLayoutEffect, useRef, useState } from 'react';

import { JsonLayoutProps } from '@bluebase/plugin-json-schema-components/dist/lib';
import { ThingGridProps } from '@mevris/client-plugin-ui';
import { getComponent } from '@bluebase/core';
import { withPaginationWithNavigation } from '@blueeast/client-plugin-ui';

export const ThingsAppScreen = () => {
	const JsonLayout = getComponent<JsonLayoutProps>('JsonLayout');

	const [pageNum, setpageNum]: any = useState(true);

	const firstUpdate = useRef(true);
	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		} else {
			setpageNum(false);
		}
	});

	const options = pageNum ? { page: 1 } : undefined;

	const ThingGrid = withPaginationWithNavigation(
		getComponent<ThingGridProps>('ThingGrid'),
		options
	);
	return (
		<JsonLayout
			filter="mevris.app.things.layout.things-app-screen"
			schema={{
				component: 'View',
				props: {
					style: { flex: 1 },
				},

				children: [
					{
						component: ThingGrid,
						props: {
							queryOptions: {
								fetchPolicy: 'cache-and-network',
								variables: {
									filter: {
										order: [{ name: 'ASC' }],
									},
								},
							},
						},
					},
				],
			}}
		/>
	);
};
