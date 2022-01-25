import { VERSION } from './version';
import { components } from './components';
import { createPlugin } from '@bluebase/core';
import { lang } from './lang';

export * from './components/exports';
export * from './hooks';

export default createPlugin({
	description: 'The plugin provides common permissions UI across Mevris Apps.',
	key: 'client-plugin-permissions-ui',
	name: 'Mevris UI',
	version: VERSION,

	assets: {
		// CameraAskPermissionViewImage: require('../assets/common/location-permission.png'),
		// CameraPermissionDeniedViewImage: require('../assets/common/location-permission.png'),
		// LocationAskPermissionViewImage: require('../assets/common/location-permission.png'),
		// LocationPermissionDeniedViewImage: require('../assets/common/location-permission.png'),
	},

	components,

	filters: {
		...lang,
	},
});
