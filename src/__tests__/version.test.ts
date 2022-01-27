import { VERSION, VERSION_NUMBER } from '../version';

test('version should be string', async () => {
	expect(VERSION).toBeDefined();
	expect(VERSION_NUMBER).toBeDefined();
	expect(typeof VERSION).toBe('string');
	expect(typeof VERSION_NUMBER).toBe('number');
});
