import { VERSION } from './version';
import { components } from './components';
import { createPlugin } from '@bluebase/core';
import { lang } from './lang';

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
