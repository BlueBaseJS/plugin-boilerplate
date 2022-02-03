import React, { memo, useMemo } from 'react';
import { Theme, useStyles } from '@bluebase/core';
import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { angleToPosition, innerRadius, valueToAngle } from './circularGeometry';

import { CircularSliderSubComponentProps } from './BaseCircularSlider';

export interface ThumbStyles {
	root: ViewStyle;
}

export interface ThumbProps extends CircularSliderSubComponentProps {
	/**
	 * Thumb number, 1 or 2.
	 */
	number: number;

	styles?: Partial<ThumbStyles>;
}

const defaultStyles = (theme: Theme, { thumbTintColor, thumbSize }: ThumbProps): ThumbStyles => ({
	root: {
		backgroundColor: thumbTintColor || theme.palette.background.card,
		borderRadius: thumbSize !== undefined ? thumbSize / 2 : theme.shape.borderRadius,
		...theme.elevation(5),
	},
});

const Thumb = (props: ThumbProps) => {
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
		thumbSize,
		thumbProps,
		thumbStyle,
	} = props;

	const styles = useStyles('SliderThumb', props, defaultStyles);

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
				style={[
					{
						// left: x !== undefined ? x - thumbSize! / 2 : undefined,
						// top: y !== undefined ? y - thumbSize! / 2 : undefined,
						left: x - thumbSize / 2,
						top: y - thumbSize / 2,

						height: thumbSize,
						position: 'absolute',
						width: thumbSize,
					},
					styles.root,
					thumbProps ? thumbProps.style : {},
					thumbStyle as any,
				]}
			/>
		</TouchableWithoutFeedback>
	);
};

export default memo(Thumb);
Thumb.displayName = 'Thumb';
