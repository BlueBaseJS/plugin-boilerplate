import React, { memo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { SliderSubComponentProps } from './BaseSlider';

export interface ThumbTouchAreaProps extends SliderSubComponentProps {}

const ThumbTouchArea = memo((props: ThumbTouchAreaProps) => {
	const { thumbTouchSize, position } = props;
	const { x, y } = position;

	return (
		<TouchableWithoutFeedback>
			<View
				style={{
					height: thumbTouchSize.height,
					left: x !== undefined ? x - thumbTouchSize.height / 2 : undefined,
					position: 'absolute',
					top: y !== undefined ? y - thumbTouchSize.width / 2 : undefined,
					width: thumbTouchSize.width,
					// backgroundColor: 'rgba(255,0,0,1)',
				}}
			/>
		</TouchableWithoutFeedback>
	);
});

ThumbTouchArea.displayName = 'ThumbTouchArea';
export default ThumbTouchArea;
