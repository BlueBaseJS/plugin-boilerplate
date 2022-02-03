import {
	getDecimalPrecision,
	getInRange,
	positionToValue,
	roundValueToStep,
	valueToPosition,
} from '../helpers';

describe('Slider', () => {
	describe('helpers', () => {
		describe('getInRange', () => {
			it('should return min value if value is less than min value', () => {
				expect(getInRange(-1, 1, 0)).toBe(0);
			});

			it('should return max value if value is greater than max value', () => {
				expect(getInRange(2, 1, 0)).toBe(1);
			});

			it('should return value as is if it is within range', () => {
				expect(getInRange(0.5, 1, 0)).toBe(0.5);
			});
		});

		describe('getDecimalPrecision', () => {
			it('should return 6 when value is 0.135123', () => {
				expect(getDecimalPrecision(0.135123)).toBe(6);
			});

			it('should return 3 for a value is 5.125', () => {
				expect(getDecimalPrecision(5.125)).toBe(3);
			});

			it('should return 0 for a value is 35', () => {
				expect(getDecimalPrecision(35)).toBe(0);
			});
		});

		describe('roundValueToStep', () => {
			it('should return value as is if step is 0', () => {
				expect(roundValueToStep(0.235123, 0, 0)).toBe(0.235123);
			});

			it('should round the number to 0.2', () => {
				expect(roundValueToStep(0.235123, 0.1, 0)).toBe(0.2);
			});
		});

		describe('positionToValue', () => {
			it('should return horizontal value with default values', () => {
				expect(
					positionToValue({
						inverted: false,
						maximumValue: 1,
						minimumValue: 0,
						moveX: 103,
						moveY: 88,
						parentLayout: {
							height: 16,
							width: 304,
						},
						step: 0,
						vertical: false,
					})
				).toBe(0.33881578947368424);
			});

			it('should return horizontal value', () => {
				expect(
					positionToValue({
						inverted: false,
						maximumValue: 1,
						minimumValue: 0,
						moveX: 103,
						moveY: 88,
						parentLayout: {
							height: 16,
							width: 304,
							x: 20,
							y: 84,
						},
						step: 0,
						vertical: false,
					})
				).toBe(0.2730263157894737);
			});

			it('should return horizontal inverted value', () => {
				expect(
					positionToValue({
						inverted: true,
						maximumValue: 1,
						minimumValue: 0,
						moveX: 103,
						moveY: 88,
						parentLayout: {
							height: 16,
							width: 304,
							x: 20,
							y: 84,
						},
						step: 0,
						vertical: false,
					})
				).toBe(1 - 0.2730263157894737);
			});

			it('should return vertical value', () => {
				expect(
					positionToValue({
						inverted: false,
						maximumValue: 1,
						minimumValue: 0,
						moveX: 103,
						moveY: 88,
						parentLayout: {
							height: 16,
							width: 304,
							x: 20,
							y: 84,
						},
						step: 0,
						vertical: true,
					})
				).toBe(0.75);
			});

			it('should return vertical inverted value', () => {
				expect(
					positionToValue({
						inverted: true,
						maximumValue: 1,
						minimumValue: 0,
						moveX: 103,
						moveY: 88,
						parentLayout: {
							height: 16,
							width: 304,
							x: 20,
							y: 84,
						},
						step: 0,
						vertical: true,
					})
				).toBe(1 - 0.75);
			});
		});

		describe('valueToPosition', () => {
			it('should return position for single value in horizontal mode with default with and height', () => {
				expect(
					valueToPosition({
						inverted: false,
						maximumValue: 1,
						minimumValue: 0,
						trackWidth: 4,
						value: 0.5,
						vertical: false,
					})
				).toMatchObject({
					height: 4,
					width: 0,
					x: 0,
				});
			});

			it('should return position for single value in horizontal mode', () => {
				expect(
					valueToPosition({
						height: 16,
						inverted: false,
						maximumValue: 1,
						minimumValue: 0,
						trackWidth: 4,
						value: 0.5,
						vertical: false,
						width: 244,
					})
				).toMatchObject({
					height: 4,
					width: 122,
					x: 0,
				});
			});

			it('should return position for single value in horizontal + inverted mode', () => {
				expect(
					valueToPosition({
						height: 16,
						inverted: true,
						maximumValue: 1,
						minimumValue: 0,
						trackWidth: 4,
						value: 0.5,
						vertical: false,
						width: 244,
					})
				).toMatchObject({
					height: 4,
					width: 122,
					x: 122,
				});
			});

			it('should return position for single value in vertical mode', () => {
				expect(
					valueToPosition({
						height: 244,
						inverted: false,
						maximumValue: 1,
						minimumValue: 0,
						trackWidth: 4,
						value: 0.5,
						vertical: true,
						width: 16,
					})
				).toMatchObject({
					height: 122,
					width: 4,
				});
			});

			it('should return position for single value in vertical + inverted mode', () => {
				expect(
					valueToPosition({
						height: 244,
						inverted: true,
						maximumValue: 1,
						minimumValue: 0,
						trackWidth: 4,
						value: 0.5,
						vertical: true,
						width: 16,
					})
				).toMatchObject({
					height: 122,
					width: 4,
				});
			});

			it('should return position for two values in horizontal mode', () => {
				expect(
					valueToPosition({
						height: 16,
						inverted: false,
						maximumValue: 1,
						minimumValue: 0,
						trackWidth: 4,
						value: 0.5,
						value2: 0.75,
						vertical: false,
						width: 244,
					})
				).toMatchObject({
					width: 61,
					x: 122,
				});
			});

			it('should return position for two values in horizontal + inverted mode', () => {
				expect(
					valueToPosition({
						height: 16,
						inverted: true,
						maximumValue: 1,
						minimumValue: 0,
						trackWidth: 4,
						value: 0.5,
						value2: 0.75,
						vertical: false,
						width: 244,
					})
				).toMatchObject({
					width: 61,
					x: 61,
				});
			});

			it('should return position for two values in vertical mode', () => {
				expect(
					valueToPosition({
						height: 244,
						inverted: false,
						maximumValue: 1,
						minimumValue: 0,
						trackWidth: 4,
						value: 0.5,
						value2: 0.75,
						vertical: true,
						width: 16,
					})
				).toMatchObject({
					height: 61,
					width: 4,
				});
			});

			it('should return position for two values in vertical + inverted mode', () => {
				expect(
					valueToPosition({
						height: 244,
						inverted: true,
						maximumValue: 1,
						minimumValue: 0,
						trackWidth: 4,
						value: 0.5,
						value2: 0.75,
						vertical: true,
						width: 16,
					})
				).toMatchObject({
					height: 61,
					width: 4,
				});
			});
		});
	});
});
