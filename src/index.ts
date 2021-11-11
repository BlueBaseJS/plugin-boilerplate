import { createPlugin } from '@bluebase/core';

import { components } from './components';
import { defaultConfigs } from './configs';
import { routes } from './routes';
import { screens } from './screens';
import { VERSION } from './version';

export default createPlugin({
	key: 'plugin-boilerplate',
	name: 'BlueBase Boilerplate',
	description: '🍛 A boilerplate to create BlueBase plugins or apps',
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
