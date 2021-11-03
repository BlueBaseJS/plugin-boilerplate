import { createPlugin } from '@bluebase/core';

import { components } from './components';
import { defaultConfigs } from './configs';
import { routes } from './routes';
import { screens } from './screens';
import { VERSION } from './version';

export default createPlugin({
	key: 'my-plugin',
	name: 'My Plugin',
	description: 'A plugin boilerplate for the BlueBase framework!',
	version: VERSION,

	icon: {
		component: 'MyPluginIcon',
		type: 'component',
	},

	routes,
	indexRoute: 'MyPluginHome',

	defaultConfigs,

	components: {
		...components,
		...screens,
	},
});
