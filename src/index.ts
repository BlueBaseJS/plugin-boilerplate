import { createPlugin } from '@bluebase/core';

import { components } from './components';
import { defaultConfigs } from './configs';
import { VERSION } from './version';

export default createPlugin({
	key: 'settings',
	name: 'Settings',
	description: 'A settings app for the BlueBase framework!',
	version: VERSION,

	icon: {
		component: 'MyPluginIcon',
		type: 'component',
	},

	defaultConfigs,

	components,
});
