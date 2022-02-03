import { getInRangeValue } from '../getInRangeValue';

describe('Stepper', () => {
	describe('getInRangeValue', () => {
		it('should return 5 as is', async () => {
			expect(getInRangeValue(5, {})).toBe(5);
		});

		it('should return 5 number if "5" string is sent as input', async () => {
			expect(getInRangeValue('5', {})).toBe(5);
		});

		it('should return null number if "" string is sent as input', async () => {
			expect(getInRangeValue('', {})).toBe(null);
		});

		it('should return null number if null is sent as input', async () => {
			expect(getInRangeValue(null, {})).toBe(null);
		});

		it('should return 5 if input is 10 and max is 5', async () => {
			expect(getInRangeValue(10, { max: 5 })).toBe(5);
		});

		it('should return 5 if input is 0 and min is 5', async () => {
			expect(getInRangeValue(0, { min: 5 })).toBe(5);
		});
	});
});
