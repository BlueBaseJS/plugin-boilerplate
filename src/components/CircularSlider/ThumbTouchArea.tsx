import React, { memo, useMemo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { angleToPosition, innerRadius, valueToAngle } from './circularGeometry';

import { CircularSliderSubComponentProps } from './BaseCircularSlider';

export interface ThumbTouchAreaProps extends CircularSliderSubComponentProps {}

const ThumbTouchArea = memo((props: ThumbTouchAreaProps) => {
	const {
		size,
		startAngle,
		endAngle,
		direction,
		axis,
		maximumValue,
		minimumValue,
		trackWidth,
		padding,
		value,
		thumbProps,
		thumbTouchSize,
	} = props;

	const handle1Angle = useMemo(
		() =>
			valueToAngle({
				endAngle,
				maximumValue,
				minimumValue,
				startAngle,
				value,
			}),
		[endAngle, maximumValue, minimumValue, startAngle, value]
	);

	const { x, y } = useMemo(
		() =>
			angleToPosition({
				axis,
				degree: handle1Angle,
				direction,
				radius: innerRadius({ size, trackWidth, padding }),
				svgSize: size,
			}),
		[axis, handle1Angle, direction, size, trackWidth, padding, size]
	);

	return (
		<TouchableWithoutFeedback>
			<View
				{...thumbProps}
				style={{
					// left: x !== undefined ? x - thumbSize! / 2 : undefined,
					// top: y !== undefined ? y - thumbSize! / 2 : undefined,
					left: x - thumbTouchSize.width / 2,
					top: y - thumbTouchSize.height / 2,

					height: thumbTouchSize.height,
					position: 'absolute',
					width: thumbTouchSize.width,

					// backgroundColor: 'rgba(255,0,0,1)',
				}}
			/>
		</TouchableWithoutFeedback>
	);
});

ThumbTouchArea.displayName = 'ThumbTouchArea';
export default ThumbTouchArea;
