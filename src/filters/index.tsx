import { List } from '@bluebase/components';
import React from 'react';
export const filters = {
	'mevris.plugin.taskbar.list.first': (schema: any, ctx: any) => {
		return {
			...schema,
			children: [
				...schema.children,
				{
					component: 'ListItem',
					props: {
						left: <List.Icon name="lightbulb-outline" />,
						onPress: () => ctx.navigation.navigate('ThingsApp'),
					},
				},
			],
		};
	}
};