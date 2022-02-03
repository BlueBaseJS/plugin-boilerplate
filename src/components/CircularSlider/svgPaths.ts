import { AngleDescription, angleToPosition } from './circularGeometry';

// function getStartAndEndPosition(
// 	opts: {
// 		startAngle: number;
// 		endAngle: number;
// 		radius: number;
// 		svgSize: number;
// 	} & AngleDescription
// ) {
// 	const { startAngle, endAngle, radius, svgSize, axis, direction } = opts;

// 	let isCircle = false;
// 	if (startAngle !== endAngle && startAngle % 360 === endAngle % 360) {
// 		// if it's a full circle, we can't naively draw an arc...
// 		// https://stackoverflow.com/questions/5737975/circle-drawing-with-svgs-arc-path
// 		isCircle = true;
// 	}

// 	const startPosition = angleToPosition({ degree: startAngle, axis, direction, radius, svgSize });
// 	const endPosition = angleToPosition({
// 		axis,
// 		degree: isCircle ? endAngle - 0.001 : endAngle,
// 		direction,
// 		radius,
// 		svgSize,
// 	});

// 	return { startPosition, endPosition, isCircle };
// }

// export function pieShapedPath(
// 	opts: {
// 		startAngle: number;
// 		endAngle: number;
// 		radius: number;
// 		svgSize: number;
// 		direction: 'cw' | 'ccw';
// 	} & AngleDescription
// ) {
// 	const { radius, svgSize, direction } = opts;
// 	const { startPosition, endPosition } = getStartAndEndPosition(opts);
// 	return `
//     M ${svgSize / 2},${svgSize / 2}
//     L ${startPosition.x},${startPosition.y}
//     A ${radius} ${radius} 0 ${direction === 'cw' ? '1 1' : '0 0'}
//       ${endPosition.x} ${endPosition.y}
//     Z
//   `;
// }

// export function arcShapedPath(
// 	opts: {
// 		startAngle: number;
// 		endAngle: number;
// 		radius: number;
// 		svgSize: number;
// 		direction: 'cw' | 'ccw';
// 	} & AngleDescription
// ) {
// 	const { startAngle, endAngle, radius, direction } = opts;
// 	const { startPosition, endPosition, isCircle } = getStartAndEndPosition(opts);

// 	const largeArc = endAngle - startAngle >= 180;

// 	return `
//       M ${startPosition.x},${startPosition.y}
//       A ${radius} ${radius} 0
//         ${largeArc ? '1' : '0'}
//         ${direction === 'cw' ? '1' : '0'}
//         ${endPosition.x} ${endPosition.y}
//         ${isCircle ? 'Z' : ''}
//     `;
// }

// export function arcPathWithRoundedEnds(
// 	opts: {
// 		startAngle: number;
// 		endAngle: number;
// 		innerRadius: number;
// 		thickness: number;
// 		svgSize: number;
// 		direction: 'cw' | 'ccw';
// 	} & AngleDescription
// ) {
// 	const { startAngle, innerRadius, thickness, direction, axis, svgSize } = opts;
// 	let { endAngle } = opts;

// 	if (startAngle % 360 === endAngle % 360 && startAngle !== endAngle) {
// 		// Drawing a full circle, slightly offset end angle
// 		// https://stackoverflow.com/questions/5737975/circle-drawing-with-svgs-arc-path
// 		endAngle = endAngle - 0.001;
// 	}
// 	const largeArc = endAngle - startAngle >= 180;
// 	const outerRadius = innerRadius + thickness;

// 	const innerArcStart = angleToPosition({
// 		axis,
// 		degree: startAngle,
// 		direction,
// 		radius: innerRadius,
// 		svgSize,
// 	});
// 	const startPoint = `
//     M ${innerArcStart.x},${innerArcStart.y}
//   `;

// 	const innerArcEnd = angleToPosition({
// 		axis,
// 		degree: endAngle,
// 		direction,
// 		radius: innerRadius,
// 		svgSize,
// 	});

// 	const innerArc = `
//     A ${innerRadius} ${innerRadius} 0
//       ${largeArc ? '1' : '0'}
//       ${direction === 'cw' ? '1' : '0'}
//       ${innerArcEnd.x} ${innerArcEnd.y}
//   `;

// 	const outerArcStart = angleToPosition({
// 		axis,
// 		degree: endAngle,
// 		direction,
// 		radius: outerRadius,
// 		svgSize,
// 	});

// 	const firstButt = `
//     A ${thickness / 2} ${thickness / 2} 0
//       ${largeArc ? '1' : '0'}
//       ${direction === 'cw' ? '0' : '1'}
//       ${outerArcStart.x} ${outerArcStart.y}
//   `;

// 	const outerArcEnd = angleToPosition({
// 		axis,
// 		degree: startAngle,
// 		direction,
// 		radius: outerRadius,
// 		svgSize,
// 	});

// 	const outerArc = `
//     A ${outerRadius} ${outerRadius} 0
//       ${largeArc ? '1' : '0'}
//       ${direction === 'cw' ? '0' : '1'}
//       ${outerArcEnd.x} ${outerArcEnd.y}
//   `;

// 	const secondButt = `
//     A ${thickness / 2} ${thickness / 2} 0
//       ${largeArc ? '1' : '0'}
//       ${direction === 'cw' ? '0' : '1'}
//       ${innerArcStart.x} ${innerArcStart.y}
//   `;

// 	return startPoint + innerArc + firstButt + outerArc + secondButt + ' Z';
// }

export function createArcPath(
	opts: {
		startAngle: number;
		endAngle: number;
		innerRadius: number;
		thickness: number;
		svgSize: number;
		direction: 'cw' | 'ccw';
	} & AngleDescription
) {
	const { startAngle, innerRadius, direction, axis, svgSize } = opts;
	let { endAngle } = opts;

	if (startAngle % 360 === endAngle % 360 && startAngle !== endAngle) {
		// Drawing a full circle, slightly offset end angle
		// https://stackoverflow.com/questions/5737975/circle-drawing-with-svgs-arc-path
		endAngle = endAngle - 0.001;
	}
	const largeArc = endAngle - startAngle >= 180;
	// const outerRadius = innerRadius + thickness;

	const innerArcStart = angleToPosition({
		axis,
		degree: startAngle,
		direction,
		radius: innerRadius,
		svgSize,
	});
	const startPoint = `M ${innerArcStart.x},${innerArcStart.y} `;

	const innerArcEnd = angleToPosition({
		axis,
		degree: endAngle,
		direction,
		radius: innerRadius,
		svgSize,
	});

	const innerArc = `A ${innerRadius} ${innerRadius} 0 ${largeArc ? '1' : '0'} ${
		direction === 'cw' ? '1' : '0'
	} ${innerArcEnd.x} ${innerArcEnd.y}`;

	return startPoint + innerArc;
}
