/* eslint-disable camelcase */
import { BlueBase, BootOptions, createPlugin } from '@bluebase/core';
import { withActionSheetProvider, withAlertUI, withApolloError } from './components/exports';

import { VERSION } from './version';
import { components } from './components';
import { lang } from './lang';

export * from './exports';

export default createPlugin({
	description: 'The plugin provides common UI across BlueEast Apps.',
	key: 'blueeast-client-plugin-ui',
	name: 'blueeast client plugin Ui',
	version: VERSION,

	assets: {
		// Errors
		ForbiddenError: require('../assets/common/forbidden-error.png'),
		NetworkError: require('../assets/common/network-error.png'),
		NotFoundError: require('../assets/common/404-error.png'),

		// Placeholders
		PersonPlaceholder: require('../assets/common/person-placeholder.png'),
		PersonPlaceholder_dark: require('../assets/common/person-placeholder-dark.png'),
		ProductPlaceholder: require('../assets/common/product-placeholder.png'),
		ProductPlaceholder_dark: require('../assets/common/product-placeholder-dark.png'),
		ThingPlaceholder: require('../assets/common/thing-placeholder.png'),
		ThingPlaceholder_dark: require('../assets/common/thing-placeholder-dark.png'),
	},

	components: {
		...components,
	},

	filters: {
		...lang,
		'bluebase.boot.end': (bootOptions: BootOptions, _ctx: any, BB: BlueBase) => {
			BB.Components.addHocs('BlueBaseContent', withActionSheetProvider);
			BB.Components.addHocs('BlueBaseContent', withAlertUI);
			BB.Components.addHocs('ErrorState', withApolloError);

			return bootOptions;
		},
	},
});
