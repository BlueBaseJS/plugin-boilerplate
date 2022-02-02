import { BlueBase } from '@bluebase/core';
import Plugin from '../index';
// import { filters } from '../filters/index';

test('Plugin should be correctly registered', async () => {
	const BB = new BlueBase();
	await BB.Plugins.register(Plugin);
	// await BB.Filters.register('mevris.plugin.taskbar.list.first', filters['mevris.plugin.taskbar.list.first']);

	await BB.Filters.run('mevris.plugin.taskbar.list.first', {});

	require('../version');
	expect(BB.Plugins.has('things')).toBeTruthy();
});
