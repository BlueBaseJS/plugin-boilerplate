import React, { memo } from 'react';
import { Theme, useStyles } from '@bluebase/core';
import { TouchableWithoutFeedback, ViewStyle } from 'react-native';

import { SliderSubComponentProps } from './BaseSlider';
import { View } from '@bluebase/components';

export interface FilledTrackStyles {
	root: ViewStyle;
}

export interface FilledTrackProps extends SliderSubComponentProps {
	styles?: Partial<FilledTrackStyles>;
}

const defaultStyles = (
	theme: Theme,
	{ minimumTrackTintColor }: FilledTrackProps
): FilledTrackStyles => ({
	root: {
		backgroundColor: minimumTrackTintColor || theme.palette.primary.main,
	},
});

const FilledTrack = (props: FilledTrackProps) => {
	const { position, filledTrackProps, filledTrackStyle, onPress } = props;
	const styles = useStyles('SliderFilledTrack', props, defaultStyles);

	const { height, width, x, y } = position;

	return (
		<TouchableWithoutFeedback onPressIn={onPress}>
			<View
				{...filledTrackProps}
				style={[
					{
						borderRadius: height / 2,
						height,
						left: x,
						position: 'absolute',
						top: y,
						width,
						...filledTrackStyle,
					},
					styles.root,
				]}
			/>
		</TouchableWithoutFeedback>
	);
};

export default memo(FilledTrack);
FilledTrack.displayName = 'FilledTrack';
