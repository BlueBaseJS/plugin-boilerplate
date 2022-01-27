import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { CircularSliderSubComponentProps } from './BaseCircularSlider';
import { TouchableWithoutFeedback } from 'react-native';
import { createArcPath } from './svgPaths';
import { innerRadius } from './circularGeometry';

export interface TrackProps extends CircularSliderSubComponentProps {}

export const Track = memo((props: TrackProps) => {
	const {
		size,
		width,
		height,
		startAngle,
		endAngle,
		direction,
		axis,
		maximumTrackTintColor,
		trackWidth,
		trackProps,
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
					stroke={maximumTrackTintColor}
					strokeWidth={trackWidth}
					{...trackProps}
				/>
			</Svg>
		</TouchableWithoutFeedback>
	);
});

Track.displayName = 'Track';
