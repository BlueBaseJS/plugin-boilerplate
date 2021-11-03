import { RouteConfig } from '@bluebase/components';
import { RouteOptions } from '@bluebase/core';

export const routes = async (options: RouteOptions): Promise<RouteConfig[]> => {

	const { intl } = options;
	return [
		// Home Page
		{
			exact: true,
			name: 'MyPluginHome',
			path: '',
			screen: 'MyPluginHomeScreen',

			options: {
				title: intl.__('My Plugin'),
			},
		},
		// Second Screen
		{
			exact: true,
			name: 'MyPluginSecond',
			path: 'second',
			screen: 'MyPluginSecondScreen',

			options: {
				title: intl.__('Second Screen'),
			},
		},
	];
};
