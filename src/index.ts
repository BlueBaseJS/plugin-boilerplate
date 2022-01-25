import { createPlugin } from '@bluebase/core';

import { components } from './components';
import { lang } from './lang';
import { VERSION } from './version';

export * from './components/exports';
export * from './types';

export default createPlugin({
	description: 'The plugin provides common UI across Mevris Apps.',
	key: 'client-plugin-location-ui',
	name: 'Mevris UI',
	version: VERSION,

	components,

	filters: {
		...lang,
	},
});
