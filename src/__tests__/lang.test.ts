import { BlueBase, createPlugin, isPromise } from '@bluebase/core';

import { ur } from '../lang/ur';

test('Plugin should load translations from web and register correctly', async () => {
	const { lang } = require('../lang/index.web');
	const Plugin = createPlugin({
		description: 'COMMI Checkout App',
		key: 'commi-checkout',
		name: 'commi-checkout',
		version: '1.0.0',

		filters: {
			...lang,
		},
	});
	const BB = new BlueBase();
	await BB.Plugins.register(Plugin);

	expect(BB.Plugins.has('commi-checkout')).toBeTruthy();

	expect(isPromise(lang['bluebase.intl.messages.ur'])).toBe(true);
});

test('Plugin should load translations from web', async () => {
	const response = ur({ foo: 'bar' });
	expect(response).toMatchObject({ foo: 'bar' });
});
