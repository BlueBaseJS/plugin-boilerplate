import { BaseSlider, BaseSliderProps, SliderDefaultProps } from './BaseSlider';
import { Body1, Caption } from '@bluebase/components';
import { LayoutRectangle, TextStyle, View, ViewStyle } from 'react-native';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Theme, useStyles } from '@bluebase/core';

export interface SliderStyles {
	root: ViewStyle;
	sliderContainer: ViewStyle;
	slider: ViewStyle;
	labelRow: ViewStyle;
	label: TextStyle;
	value: TextStyle;
	helperTextRow: ViewStyle;
	helperText: TextStyle;
}

export interface SliderProps extends Partial<BaseSliderProps> {}

const defaultStyles = (theme: Theme, { trackWidth, vertical }: BaseSliderProps): SliderStyles => ({
	root: {
		alignItems: vertical ? 'center' : undefined,
		flex: 1,
		width: vertical ? trackWidth : undefined,
	},

	sliderContainer: {
		flex: 1,
		width: vertical ? trackWidth : undefined,
	},

	slider: {},

	labelRow: {
		flexDirection: 'row',
		paddingBottom: theme.spacing.unit,
	},

	label: {
		color: theme.palette.text.secondary,
		flex: 1,
	},

	value: {
		color: theme.palette.text.secondary,
		textAlign: 'right',
	},

	helperTextRow: {
		paddingTop: theme.spacing.unit,
	},

	helperText: {
		color: theme.palette.text.secondary,
	},
});

export const Slider = (props: SliderProps) => {
	const { helperText, label, showValue, style, value } = props;

	const styles = useStyles('Slider', props, defaultStyles);
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
		<View style={[styles.root, style]}>
			{label || showValue ? (
				<View style={styles.labelRow} testID="slider-label">
					<Body1 testID="label" style={styles.label}>
						{label}
					</Body1>
					<Body1 testID="value" style={styles.value}>
						{value}
					</Body1>
				</View>
			) : null}

			{/* Slider */}
			<View
				testID="slider-container"
				onLayout={onLayout}
				ref={sliderRef}
				style={styles.sliderContainer}
			>
				{layout ? <BaseSlider {...props} layout={layout} /> : null}
			</View>

			{/* Helper Text */}
			{helperText ? (
				<View style={styles.helperTextRow} testID="slider-helper-text">
					<Caption style={styles.helperText}>{helperText}</Caption>
				</View>
			) : null}
		</View>
	);
};

Slider.defaultProps = SliderDefaultProps;
Slider.displayName = 'Slider';

export const MemoizedSlider = memo(Slider);
