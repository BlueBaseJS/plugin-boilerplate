import { CircularGeometry, createArcPath } from '../CircularSlider';
import { GestureResponderEvent, TouchableWithoutFeedback } from 'react-native';
import React, { memo } from 'react';
import Svg, { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

import { GradientCircularSliderProps } from './GradientCircularSlider';

const getSegmentAngles = (startAngle: number, endAngle: number, segmentCount: number) =>
	(endAngle - startAngle) / segmentCount;

/**
 * Creates Gradient defs for each segment
 */
function getGradients(props: GradientCircularSliderProps) {
	const { colors, size, startAngle, endAngle, direction, axis, trackWidth, padding } = props;

	const segmentCount = colors.length - 1;
	const segmentAngles = getSegmentAngles(startAngle, endAngle, segmentCount);

	const gradients = Array.from(Array(segmentCount).keys()).map((index) => {
		const startColor = colors[index];
		const endColor = colors[index + 1];

		const segmentStartAngle = startAngle + segmentAngles * index;
		const segmentEndAngle = segmentStartAngle + segmentAngles;

		const { x: fromX, y: fromY } = CircularGeometry.angleToPosition({
			axis,
			degree: segmentStartAngle,
			direction,
			radius: CircularGeometry.innerRadius({ padding, size, trackWidth }),
			svgSize: size,
		});

		const { x: toX, y: toY } = CircularGeometry.angleToPosition({
			axis,
			degree: segmentEndAngle,
			direction,
			radius: CircularGeometry.innerRadius({ padding, size, trackWidth }),
			svgSize: size,
		});

		return (
			<LinearGradient
				key={index}
				id={`gradient${index}`}
				x1={fromX.toFixed(2)}
				y1={fromY.toFixed(2)}
				x2={toX.toFixed(2)}
				y2={toY.toFixed(2)}
				gradientUnits="userSpaceOnUse"
			>
				<Stop offset="0%" stopColor={startColor} />
				<Stop offset="1" stopColor={endColor} />
			</LinearGradient>
		);
	});

	return gradients;
}

/**
 * Creates extra end caps for the arc, to have rounded ends
 */
function getEndCaps(props: GradientCircularSliderProps) {
	const { colors, size, startAngle, endAngle, direction, axis, trackWidth, padding } = props;

	const { x: c1X, y: c1Y } = CircularGeometry.angleToPosition({
		axis,
		degree: startAngle,
		direction,
		radius: CircularGeometry.innerRadius({ padding, size, trackWidth }),
		svgSize: size,
	});

	const { x: c2X, y: c2Y } = CircularGeometry.angleToPosition({
		axis,
		degree: endAngle,
		direction,
		radius: CircularGeometry.innerRadius({ padding, size, trackWidth }),
		svgSize: size,
	});

	return [
		<Circle key="c1" r={trackWidth / 2} cx={c1X} cy={c1Y} fill={colors[0]} />,
		<Circle key="c2" r={trackWidth / 2} cx={c2X} cy={c2Y} fill={colors[colors.length - 1]} />,
	];
}

/**
 * Creates segments of the path
 */
function getPaths(props: GradientCircularSliderProps) {
	const { colors, size, startAngle, endAngle, direction, axis, trackWidth, padding } = props;

	const segmentCount = colors.length - 1;
	const segmentAngles = getSegmentAngles(startAngle, endAngle, segmentCount);

	return Array.from(Array(segmentCount).keys()).map((index) => {
		const segmentStartAngle = startAngle + segmentAngles * index;
		const segmentEndAngle = segmentStartAngle + segmentAngles;

		return (
			<Path
				d={createArcPath({
					axis,
					direction,
					endAngle: segmentEndAngle,
					innerRadius: CircularGeometry.innerRadius({ padding, size, trackWidth }),
					startAngle: segmentStartAngle,
					svgSize: size,
					thickness: trackWidth,
				})}
				key={index}
				fill="transparent"
				stroke={`url(#gradient${index})`}
				strokeWidth={trackWidth}
				strokeLinecap="butt"
			/>
		);
	});
}

export interface ColorTrackProps extends GradientCircularSliderProps {
	onPress?: (event: GestureResponderEvent) => void;
}

export const ColorTrack = memo((props: ColorTrackProps) => {
	const { size, width, height } = props;

	const gradients = getGradients(props);
	const caps = getEndCaps(props);
	const paths = getPaths(props);

	return (
		<TouchableWithoutFeedback onPressIn={props.onPress}>
			<Svg width={width || size} height={height || size}>
				<Defs>{gradients}</Defs>
				<G>
					{caps}
					{paths}
				</G>
			</Svg>
		</TouchableWithoutFeedback>
	);
});

ColorTrack.displayName = 'ColorTrack';
