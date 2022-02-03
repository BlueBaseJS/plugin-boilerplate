import { createArcPath } from '../svgPaths';

describe('CircularSlider', () => {
	describe('svgPaths', () => {
		describe('createArcPath', () => {
			it('should create a path for a full circle with 0.001 subtracted from end angle', async () => {
				const value = createArcPath({
					axis: '+x',
					direction: 'cw',
					endAngle: 360,
					innerRadius: 200,
					startAngle: 0,
					svgSize: 250,
					thickness: 10,
				});

				expect(value).toBe(`M 325,125 A 200 200 0 1 1 324.9999999695383 124.99650934149628`);
			});
		});

		it('should create a path for a semi circle', async () => {
			const value = createArcPath({
				axis: '+x',
				direction: 'ccw',
				endAngle: 180,
				innerRadius: 200,
				startAngle: 90,
				svgSize: 250,
				thickness: 10,
			});

			expect(value).toBe(`M 125.00000000000001,-75 A 200 200 0 0 0 -75 125`);
		});
	});
});
