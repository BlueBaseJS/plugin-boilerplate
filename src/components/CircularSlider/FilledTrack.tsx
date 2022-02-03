import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { CircularSliderSubComponentProps } from './BaseCircularSlider';
import { TouchableWithoutFeedback } from 'react-native';
import { createArcPath } from './svgPaths';
import { innerRadius } from './circularGeometry';

export interface FilledTrackProps extends CircularSliderSubComponentProps {}

export const FilledTrack = memo((props: FilledTrackProps) => {
	const {
		size,
		width,
		height,
		startAngle,
		endAngle,
		direction,
		axis,
		minimumTrackTintColor,
		trackWidth,
		filledTrackProps,
		padding,
		onPress,
	} = props;

	return (
		<TouchableWithoutFeedback onPressIn={onPress}>
			<Svg width={width || size} height={height || size}>
				<Path
					d={createArcPath({
						axis,
						direction,
						endAngle,
						innerRadius: innerRadius({ padding, size, trackWidth }),
						startAngle,
						svgSize: size,
						thickness: trackWidth,
					})}
					fill="transparent"
					stroke={minimumTrackTintColor}
					strokeWidth={trackWidth}
					{...filledTrackProps}
				/>
			</Svg>
		</TouchableWithoutFeedback>
	);
});

FilledTrack.displayName = 'FilledTrack';
