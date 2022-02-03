import React, { memo } from 'react';
import { Theme, useStyles } from '@bluebase/core';
import { TouchableWithoutFeedback, ViewStyle } from 'react-native';

import { SliderSubComponentProps } from './BaseSlider';
import { View } from '@bluebase/components';

export interface TrackStyles {
	root: ViewStyle;
}

export interface TrackProps extends SliderSubComponentProps {
	styles?: Partial<TrackStyles>;
}

const defaultStyles = (theme: Theme, { maximumTrackTintColor }: TrackProps): TrackStyles => ({
	root: {
		backgroundColor: maximumTrackTintColor || theme.palette.primary.main,
		opacity: 0.24,
	},
});

const Track = memo((props: TrackProps) => {
	const {
		maximumTrackTintColor,
		vertical,
		width,
		height,
		trackWidth,
		trackProps,
		trackStyle,
		onPress,
	} = props;
	const styles = useStyles('SliderTrack', props, defaultStyles);

	return (
		<TouchableWithoutFeedback onPressIn={onPress}>
			<View
				{...trackProps}
				style={[
					{
						backgroundColor: maximumTrackTintColor,
						borderRadius: height && height / 2,
						height: !vertical ? trackWidth : height,
						width: !vertical ? width : trackWidth,
					},
					styles.root,
					trackStyle,
				]}
			/>
		</TouchableWithoutFeedback>
	);
});

Track.displayName = 'Track';
export default Track;
