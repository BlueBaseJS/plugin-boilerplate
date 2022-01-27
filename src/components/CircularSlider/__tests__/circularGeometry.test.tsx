import {
	angleToPosition,
	angleToValue,
	convertAngle,
	getDecimalPrecision,
	positionToAngle,
	valueToAngle,
} from '../circularGeometry';

describe('CircularSlider', () => {
	describe('circularGeometry', () => {
		describe('angleToValue', () => {
			it('should return minimumValue when angle and startAngle are same', async () => {
				const value = angleToValue({
					angle: 30,
					endAngle: 330,
					maximumValue: 10,
					minimumValue: 0,
					startAngle: 30,
				});

				expect(value).toBe(0);
			});

			it('should return maximumValue when angle and endAngle are same', async () => {
				const value = angleToValue({
					angle: 330,
					endAngle: 330,
					maximumValue: 10,
					minimumValue: 0,
					startAngle: 30,
				});

				expect(value).toBe(10);
			});

			it('should return calculated value', async () => {
				const value = angleToValue({
					angle: 60,
					endAngle: 330,
					maximumValue: 10,
					minimumValue: 0,
					startAngle: 30,
				});

				expect(value).toBe(1);
			});

			it('should return minimumValue if angle is less than startAngle', async () => {
				const value = angleToValue({
					angle: 0,
					endAngle: 330,
					maximumValue: 10,
					minimumValue: 0,
					startAngle: 30,
				});

				expect(value).toBe(0);
			});

			it('should return maximumValue if angle is greater than endAngle', async () => {
				const value = angleToValue({
					angle: 360,
					endAngle: 330,
					maximumValue: 10,
					minimumValue: 0,
					startAngle: 30,
				});

				expect(value).toBe(10);
			});

			it('should throw error if endAngle is less than startAngle', async () => {
				let message = '';

				try {
					angleToValue({
						angle: 360,
						endAngle: 15,
						maximumValue: 10,
						minimumValue: 0,
						startAngle: 30,
					});
				} catch (error) {
					message = error.message;
				}

				expect(message).toBe('endAngle must be greater than startAngle');
			});
		});

		describe('valueToAngle', () => {
			it('should return startAngle when value is equal to minimumValue', async () => {
				const value = valueToAngle({
					endAngle: 330,
					maximumValue: 10,
					minimumValue: 0,
					startAngle: 30,
					value: 0,
				});

				expect(value).toBe(30);
			});

			it('should return endAngle when value is equal to maximumValue', async () => {
				const value = valueToAngle({
					endAngle: 330,
					maximumValue: 10,
					minimumValue: 0,
					startAngle: 30,
					value: 10,
				});

				expect(value).toBe(330);
			});

			it('should return calculated value', async () => {
				const value = valueToAngle({
					endAngle: 330,
					maximumValue: 10,
					minimumValue: 0,
					startAngle: 30,
					value: 1,
				});

				expect(value).toBe(60);
			});

			it('should throw error if endAngle is less than startAngle', async () => {
				let message = '';

				try {
					valueToAngle({
						endAngle: 15,
						maximumValue: 10,
						minimumValue: 0,
						startAngle: 30,
						value: 10,
					});
				} catch (error) {
					message = error.message;
				}

				expect(message).toBe('endAngle must be greater than startAngle');
			});
		});

		describe('convertAngle', () => {
			it('should convert an angle from cw to ccw', async () => {
				const angle = convertAngle(
					60,
					{ axis: '+x', direction: 'cw' },
					{ axis: '+x', direction: 'ccw' }
				);

				expect(angle).toBe(300);
			});

			it('should invert an angle on x axis', async () => {
				const angle = convertAngle(
					60,
					{ axis: '+x', direction: 'cw' },
					{ axis: '-x', direction: 'cw' }
				);

				expect(angle).toBe(240);
			});

			it('should invert an angle on y axis', async () => {
				const angle = convertAngle(
					60,
					{ axis: '+x', direction: 'cw' },
					{ axis: '-y', direction: 'cw' }
				);

				expect(angle).toBe(330);
			});

			it('should invert an angle on y axis', async () => {
				const angle = convertAngle(
					60,
					{ axis: '+x', direction: 'cw' },
					{ axis: '+y', direction: 'cw' }
				);

				expect(angle).toBe(150);
			});

			it('should use default to param, if one is not provided', async () => {
				const angle = convertAngle(60, { axis: '+x', direction: 'cw' });

				expect(angle).toBe(300);
			});

			it('should return 0 without conversion', async () => {
				const angle = convertAngle(
					0,
					{ axis: '+x', direction: 'cw' },
					{ axis: '+x', direction: 'ccw' }
				);

				expect(angle).toBe(0);
			});
		});

		describe('angleToPosition', () => {
			it('should convert an angle to position', async () => {
				const position = angleToPosition({
					axis: '-y',
					degree: 130,
					direction: 'cw',
					radius: 78,
					svgSize: 200,
				});

				expect(position).toMatchObject({
					x: 40.24853343671972,
					y: 49.86256644444993,
				});
			});

			it('should convert an angle to position', async () => {
				const position = angleToPosition({
					axis: '-y',
					degree: 30,
					direction: 'cw',
					radius: 78,
					svgSize: 200,
				});

				expect(position).toMatchObject({
					x: 60.99999999999997,
					y: 167.54998149518622,
				});
			});

			it('should convert an angle to position', async () => {
				const position = angleToPosition({
					axis: '-y',
					degree: 180,
					direction: 'cw',
					radius: 78,
					svgSize: 200,
				});

				expect(position).toMatchObject({
					x: 100,
					y: 22,
				});
			});

			it('should convert an angle to position', async () => {
				const position = angleToPosition({
					axis: '-y',
					degree: 280,
					direction: 'cw',
					radius: 78,
					svgSize: 200,
				});

				expect(position).toMatchObject({
					x: 176.81500473495225,
					y: 113.54455785802055,
				});
			});
		});

		describe('positionToAngle', () => {
			it('should convert postion to an angle', async () => {
				const angle = positionToAngle({
					axis: '-y',
					direction: 'cw',
					svgSize: 200,
					x: 40.24853343671972,
					y: 49.86256644444993,
				});

				expect(angle).toBe(130);
			});

			it('should convert postion to an angle', async () => {
				const angle = positionToAngle({
					axis: '-y',
					direction: 'cw',
					svgSize: 200,
					x: 60.99999999999997,
					y: 167.54998149518622,
				});

				expect(angle).toBe(30);
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
	});
});
