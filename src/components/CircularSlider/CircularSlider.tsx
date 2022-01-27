import { BaseCircularSlider, BaseCircularSliderProps } from './BaseCircularSlider';
import { LayoutRectangle, View, ViewStyle } from 'react-native';
import React, { memo, useCallback, useRef, useState } from 'react';

export interface CircularSliderStyles {
	sliderContainer: ViewStyle;
}

export interface CircularSliderProps extends Partial<BaseCircularSliderProps> {}

// const defaultStyles = (): CircularSliderStyles => ({
// 	sliderContainer: {
// 		flex: 1,
// 	},
// });

export const CircularSlider = memo((props: CircularSliderProps) => {
	const { size } = props;

	// const styles = useStyles('CircularSlider', props, defaultStyles);
	const sliderRef = useRef<View>(null);

	const [layout, setLayout] = useState<LayoutRectangle | undefined>(props.layout);

	/* istanbul ignore next */
	const onLayout = useCallback(() => {
		if (!sliderRef || !sliderRef.current) {
			return;
		}

		sliderRef.current.measure(
			(_x: number, _y: number, _width: number, _height: number, pageX: number, pageY: number) => {
				setLayout({ x: pageX, y: pageY, height: _height, width: _width });
			}
		);
	}, [sliderRef]);

	return (
		<View
			testID="slider-container"
			onLayout={onLayout}
			ref={sliderRef}
			style={[{ width: size, height: size }, props.sliderStyle]}
		>
			{layout ? <BaseCircularSlider {...props} layout={layout} /> : null}
		</View>
	);
});

// CircularSlider.defaultProps = {};
CircularSlider.displayName = 'CircularSlider';
