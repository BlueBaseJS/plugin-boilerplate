test('Plugin should load components exports from web', async () => {
	const { Price } = require('../components/exports');
	expect(Price).toBeTruthy();
});
