import { asyncNoop } from '../noop';
import { resolveComponent } from '../resolveComponent';
describe('noop', () => {
	it('should return undefined', async () => {
		const result = await asyncNoop();
		expect(result).toBeUndefined();
	});
	it('should return Text component', async () => {
		resolveComponent('Text');
	});
});
