import { VERSION } from './version';
import { components } from './components';
import { createPlugin } from '@bluebase/core';
import { lang } from './lang';

export * from './exports';

export default createPlugin({
	description: 'Commi Components',
	key: '@commi/commi-client-plugin-ui',
	name: 'Commi Client Plugin UI',
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
