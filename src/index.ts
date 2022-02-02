import { VERSION } from './version';
import { components } from './components';
import { createPlugin } from '@bluebase/core';
import { filters } from './filters';
import { forms } from './forms';
import { lang } from './lang';
import { routes } from './routes';
import { screens } from './screens';
import { settings } from './settings';

export * from './exports';

export default createPlugin({
	description: '🍛 A boilerplate to create BlueBase plugins or apps',
	key: 'mevris-client-app-things',
	name: 'mevris-client-app-things',
	version: VERSION,

	icon: {
		component: 'ThingsAppIcon',
		type: 'component',
	},

	assets: {},

	components: {
		...components,
		...forms,
		...settings,
		...screens,
	},

	indexRoute: 'ThingsApp',

	filters: {
		...lang,
		...filters,
	},

	routes,
});
