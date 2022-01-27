import React, { memo } from 'react';
import { Theme, useStyles } from '@bluebase/core';
import { TouchableWithoutFeedback, ViewStyle } from 'react-native';

import { SliderSubComponentProps } from './BaseSlider';
import { View } from '@bluebase/components';

export interface ThumbStyles {
	root: ViewStyle;
}

export interface ThumbProps extends SliderSubComponentProps {
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

const Thumb = memo((props: ThumbProps) => {
	const { thumbSize, thumbProps, thumbStyle, position } = props;
	const styles = useStyles('SliderThumb', props, defaultStyles);
	const { x, y } = position;

	return (
		<TouchableWithoutFeedback>
			<View
				{...thumbProps}
				style={[
					{
						height: thumbSize,
						left: x !== undefined ? x - thumbSize! / 2 : undefined,
						position: 'absolute',
						top: y !== undefined ? y - thumbSize! / 2 : undefined,
						width: thumbSize,
					},
					styles.root,
					thumbProps ? (thumbProps.style as any) : {},
					thumbStyle,
				]}
			/>
		</TouchableWithoutFeedback>
	);
});

Thumb.displayName = 'Thumb';
export default Thumb;
