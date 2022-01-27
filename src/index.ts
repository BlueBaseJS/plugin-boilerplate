import { VERSION } from './version';
import { components } from './components';
import { createPlugin } from '@bluebase/core';
import { lang } from './lang';

export * from './exports';

export default createPlugin({
	description: '🍛 A boilerplate to create BlueBase plugins or apps',
	key: 'commi-client-plugin-ui',
	name: 'commi-client-plugin-ui',
	version: VERSION,

	assets: {
		AppleAppStoreBadge: require('../assets/common/apple-app-store-badge.png'),
		GooglePlayStoreBadge: require('../assets/common/google-play-badge.png'),
	},

	components,

	filters: {
		...lang,
	},
});
