// Source: https://github.com/mnkhouri/react-circular-slider/blob/master/src/circularGeometry.ts

export type AngleDescription = {
	direction: 'cw' | 'ccw';
	axis: '+x' | '-x' | '+y' | '-y';
};

export type AngleWithDescription = {
	degree: number;
} & AngleDescription;

/**
 * Converts an angle to value
 */
export function angleToValue(params: {
	angle: number;
	minimumValue: number;
	maximumValue: number;
	startAngle: number;
	endAngle: number;
}) {
	const { angle, minimumValue, maximumValue, startAngle, endAngle } = params;
	if (endAngle <= startAngle) {
		// math assumes endAngle > startAngle
		throw new Error('endAngle must be greater than startAngle');
	}

	if (angle < startAngle) {
		return minimumValue;
	} else if (angle > endAngle) {
		return maximumValue;
	} else {
		const ratio = (angle - startAngle) / (endAngle - startAngle);
		const value = ratio * (maximumValue - minimumValue) + minimumValue;
		return value;
	}
}

/**
 * Converts a value to angle
 */
export function valueToAngle(params: {
	value: number;
	minimumValue: number;
	maximumValue: number;
	startAngle: number;
	endAngle: number;
}) {
	const { value, minimumValue, maximumValue, startAngle, endAngle } = params;
	if (endAngle <= startAngle) {
		// math assumes endAngle > startAngle
		throw new Error('endAngle must be greater than startAngle');
	}
	const ratio = (value - minimumValue) / (maximumValue - minimumValue);
	const angle = ratio * (endAngle - startAngle) + startAngle;
	return angle;
}

export function convertAngle(degree: number, from: AngleDescription, to?: AngleDescription) {
	to = to || { direction: 'ccw', axis: '+x' };

	if (from.direction !== to.direction) {
		degree = degree === 0 ? 0 : 360 - degree;
	}

	if (from.axis === to.axis) {
		// e.g. +x to +x
		return degree;
	}

	if (from.axis[1] === to.axis[1]) {
		// e.g. +x to -x
		return (180 + degree) % 360;
	}

	switch (to.direction + from.axis + to.axis) {
		case 'ccw+x-y':
		case 'ccw-x+y':
		case 'ccw+y+x':
		case 'ccw-y-x':
		case 'cw+y-x':
		case 'cw-y+x':
		case 'cw-x-y':
		case 'cw+x+y':
			return (90 + degree) % 360;
		default:
			// case 'ccw+y-x':
			// case 'ccw-y+x':
			// case 'ccw+x+y':
			// case 'ccw-x-y':
			// case 'cw+x-y':
			// case 'cw-x+y':
			// case 'cw+y+x':
			// case 'cw-y-x':
			return (270 + degree) % 360;
		// 	// This is impossible, just for TS
		// throw new Error('Unhandled conversion');
	}
}

export function angleToPosition(opts: AngleWithDescription & { radius: number; svgSize: number }) {
	const { axis, degree, direction, radius, svgSize } = opts;

	// js functions need radians, counterclockwise from positive x axis
	const angleConverted = convertAngle(
		degree,
		{
			axis,
			direction,
		},
		{
			axis: '+x',
			direction: 'ccw',
		}
	);
	const angleInRad = (angleConverted / 180) * Math.PI;
	let dX: number;
	let dY: number;

	if (angleInRad <= Math.PI) {
		// we are in the upper two quadrants
		if (angleInRad <= Math.PI / 2) {
			dY = Math.sin(angleInRad) * radius;
			dX = Math.cos(angleInRad) * radius;
		} else {
			dY = Math.sin(Math.PI - angleInRad) * radius;
			dX = Math.cos(Math.PI - angleInRad) * radius * -1;
		}
	} else {
		// we are in the lower two quadrants
		if (angleInRad <= Math.PI * 1.5) {
			dY = Math.sin(angleInRad - Math.PI) * radius * -1;
			dX = Math.cos(angleInRad - Math.PI) * radius * -1;
		} else {
			dY = Math.sin(2 * Math.PI - angleInRad) * radius * -1;
			dX = Math.cos(2 * Math.PI - angleInRad) * radius;
		}
	}

	// dX and dY are calculated based on having (0, 0) at the center
	// Now, translate dX and dY to svg coordinates, where (0, 0) is at the top left
	const x = dX + svgSize / 2;
	const y = svgSize / 2 - dY;

	return { x, y };
}

export function positionToAngle(
	opts: { x: number; y: number; svgSize: number } & AngleDescription
) {
	const { x, y, axis, direction, svgSize } = opts;

	const dX = x - svgSize / 2;
	const dY = svgSize / 2 - y; // y increases downwards in svg
	let theta = Math.atan2(dY, dX); // radians, counterclockwise from positive x axis

	if (theta < 0) {
		theta = theta + 2 * Math.PI;
	}

	const degree = (theta / Math.PI) * 180; // degrees, counterclockwise from positive x axis

	return convertAngle(
		degree,
		{
			axis: '+x',
			direction: 'ccw',
		},
		{
			axis,
			direction,
		}
	);
}

// export function semiCircle(
// 	opts: {
// 		startAngle: number;
// 		endAngle: number;
// 		radius: number;
// 		svgSize: number;
// 		direction: 'cw' | 'ccw';
// 	} & AngleDescription
// ) {
// 	const { startAngle, endAngle, radius, svgSize, direction, axis } = opts;
// 	const startPosition = angleToPosition({ degree: startAngle, axis, direction, radius, svgSize });
// 	const endPosition = angleToPosition({ degree: endAngle, axis, direction, radius, svgSize });
// 	return `
//     M ${svgSize / 2},${svgSize / 2}
//     L ${startPosition.x},${startPosition.y}
//     A ${radius} ${radius} 0 ${direction === 'cw' ? '1 1' : '0 0'}
//       ${endPosition.x} ${endPosition.y}
//     Z
//   `;
// }

export function innerRadius({
	size,
	trackWidth,
	padding,
}: {
	size: number;
	trackWidth: number;
	padding: number;
}) {
	return size / 2 - trackWidth - padding;
}

export function getDecimalPrecision(num: number) {
	// This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
	// When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
	if (Math.abs(num) < 1) {
		const parts = num.toExponential().split('e-');
		const matissaDecimalPart = parts[0].split('.')[1];
		return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
	}

	const decimalPart = num.toString().split('.')[1];
	return decimalPart ? decimalPart.length : 0;
}

export function roundValueToStep(val: number, step: number, minimumValue: number) {
	if (step === 0) {
		return val;
	}

	const nearest = Math.round((val - minimumValue) / step) * step + minimumValue;
	return Number(nearest.toFixed(getDecimalPrecision(step)));
}
