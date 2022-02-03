import {
	GestureResponderEvent,
	LayoutRectangle,
	PanResponder,
	PanResponderGestureState,
	View,
	ViewStyle,
} from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { SliderPosition, positionToValue, valueToPosition } from './helpers';
import { SliderProps as SliderPropsBB, ViewProps } from '@bluebase/components';
import { Theme, useIntl, useStyles } from '@bluebase/core';
import Thumb, { ThumbProps } from './Thumb';

import FilledTrack from './FilledTrack';
import ThumbTouchArea from './ThumbTouchArea';
import Track from './Track';
import get from 'lodash.get';

export const SliderDefaultProps: Partial<BaseSliderProps> = {
	disabled: false,
	inverted: false,
	maximumValue: 1,
	minimumValue: 0,
	step: 0,
	thumbSize: 25,
	thumbTouchSize: { width: 50, height: 50 },
	trackWidth: 4,
	value: 0.5,
	vertical: false,

	MaximumTrackComponent: Track,
	MinimumTrackComponent: FilledTrack,
	ThumbComponent: Thumb,
	ThumbComponent2: Thumb,
};

type SelectionCallback = (value: number) => void;

export interface SliderSubComponentProps extends Omit<BaseSliderProps, 'layout' | 'styles'> {
	position: SliderPosition;
	parentLayout: SliderPosition;
	onPress?: (event: GestureResponderEvent) => void;
}

export interface BaseSliderStyles {
	slider: ViewStyle;
}

export interface BaseSliderProps extends SliderPropsBB {
	/**
	 * Initial value of the slider. The value should be between minimumValue
	 * and maximumValue, which default to 0 and 1 respectively.
	 * Default value is 0.5.
	 */
	value: number;

	/**
	 * Initial second value of the slider. The value should be between minimumValue
	 * and maximumValue, which default to 0 and 1 respectively. If provided slider
	 * will show a second thumb.
	 * Default value is undefined.
	 */
	value2?: number;

	/**
	 * If true the user won't be able to move the slider.
	 * Default value is false.
	 */
	disabled: boolean;

	/**
	 * Initial minimum value of the slider. Default value is 0.
	 */
	minimumValue: number;

	/**
	 * Initial maximum value of the slider. Default value is 1.
	 */
	maximumValue: number;

	/**
	 * Step value of the slider. The value should be between 0 and
	 * (maximumValue - minimumValue). Default value is 0.
	 */
	step: number;

	/**
	 * The color used for the background track.
	 */
	maximumTrackTintColor?: string;

	/**
	 * The color used for the track to the right of the button. Overrides the
	 * default blue gradient image.
	 */
	minimumTrackTintColor?: string;

	/**
	 * The color used for the thumb.
	 */
	thumbTintColor?: string;

	/**
	 * Prop of the thumb circle
	 */
	thumbProps?: ViewProps;

	/**
	 * The size of the thumb.
	 * The default is 8.
	 */
	thumbSize: number;

	/**
	 * The style applied to the thumb
	 */
	thumbStyle?: ViewStyle;

	/**
	 * The size of the touch area that allows moving the thumb.
	 * The touch area has the same center as the visible thumb.
	 * This allows to have a visually small thumb while still
	 * allowing the user to move it easily.
	 */
	thumbTouchSize: {
		width: number;
		height: number;
	};

	/**
	 * Width of track path.
	 */
	trackWidth: number;

	/**
	 * Props of the track component
	 */
	trackProps?: ViewProps;

	/**
	 * Styles of track component
	 */
	trackStyle?: ViewStyle;

	/**
	 * Props of the filled track component
	 */
	filledTrackProps?: ViewProps;

	/**
	 * Styles of filled track component
	 */
	filledTrackStyle?: ViewStyle;

	/**
	 * Callback continuously called while the user is dragging the thumb.
	 */
	onValueChange?: SelectionCallback;

	/**
	 * Callback continuously called while the user is dragging the second thumb.
	 */
	onValueChange2?: SelectionCallback;

	/**
	 * Callback called when the user starts changing the value (e.g. when
	 * the slider is pressed).
	 */
	onSlidingStart?: SelectionCallback;

	/**
	 * Callback called when the user starts changing the value2 (e.g. when
	 * the slider is pressed).
	 */
	onSlidingStart2?: SelectionCallback;

	/**
	 * Callback called when the user finishes changing the value (e.g. when
	 * the slider is released).
	 */
	onSlidingComplete?: SelectionCallback;

	/**
	 * Callback called when the user finishes changing the value2 (e.g. when
	 * the slider is released).
	 */
	onSlidingComplete2?: SelectionCallback;

	/**
	 * Slider width
	 */
	width?: number;

	/**
	 * Slider height
	 */
	height?: number;

	/**
	 * If slider should be inverted
	 */
	inverted: boolean;

	/**
	 * Root style
	 */
	style?: ViewStyle;

	/**
	 * Slider style
	 */
	sliderStyle?: ViewStyle;

	children?: React.ReactNode;

	/**
	 * If slider should be vertical instead of horizontal
	 */
	vertical: boolean;

	styles?: Partial<BaseSliderStyles>;

	MaximumTrackComponent: React.ComponentType<SliderSubComponentProps>;
	MinimumTrackComponent: React.ComponentType<SliderSubComponentProps>;
	ThumbComponent: React.ComponentType<ThumbProps>;
	ThumbComponent2: React.ComponentType<ThumbProps>;

	layout: LayoutRectangle;
}

const defaultStyles = (_theme: Theme): BaseSliderStyles => ({
	slider: {},
});

export const BaseSlider = (props: BaseSliderProps) => {
	const {
		MaximumTrackComponent,
		MinimumTrackComponent,
		ThumbComponent,
		ThumbComponent2,
		children,
		disabled,
		inverted,
		height,
		layout,
		maximumValue,
		minimumValue,
		onSlidingStart,
		onSlidingStart2,
		onValueChange,
		onValueChange2,
		onSlidingComplete,
		onSlidingComplete2,
		sliderStyle,
		step,
		style,
		thumbSize,
		trackWidth,
		value,
		value2,
		vertical,
		width,
	} = props;

	const { rtl } = useIntl();
	const [initialGestureState, setInitialGestureState] = useState({
		_accountsForMovesUpTo: 0,
		dx: 0,
		dy: 0,
		moveX: 0,
		moveY: 0,
		numberActiveTouches: 1,
		stateID: 0.4060158526871205,
		vx: 0,
		vy: 0,
		x0: 220.5,
		y0: 481.5,
	});
	const styles = useStyles('BaseSlider', props, defaultStyles);

	/**
	 * Tells if the slider is controllable
	 */
	const isControllable = !disabled && Boolean(onValueChange);

	/**
	 * Tells if the slider should have 2 thumbs
	 */
	const has2Thumbs = isControllable && value2 !== undefined;

	/**
	 * If slider should be inverted
	 */
	const isInverted = !rtl !== !inverted;

	/**
	 * Calculate current slider position
	 */
	const position: SliderPosition = useMemo(
		() =>
			valueToPosition({
				inverted: isInverted,
				maximumValue,
				minimumValue,
				trackWidth,
				value,
				value2,
				vertical,

				height: height !== undefined ? height : layout.height,
				width: width !== undefined ? width : layout.width,
			}),
		[layout, isInverted, maximumValue, minimumValue, trackWidth, value, value2, vertical]
	);

	/**
	 * Updated slider
	 */
	const processSelection = useCallback(
		(
			// opts: PanResponderGestureState,
			{ moveX, moveY }: { moveX: number; moveY: number },
			cb1?: SelectionCallback,
			cb2?: SelectionCallback
		) => {
			if (!cb1 || !layout.width) {
				// Read-only, don't bother doing calculations
				return;
			}

			const resultValue = positionToValue({
				maximumValue,
				minimumValue,
				step,
				vertical,

				inverted: isInverted,
				moveX,
				moveY,
				parentLayout: layout,
			});

			if (!disabled) {
				if (
					value2 !== undefined &&
					cb2 !== undefined &&
					// make sure we're closer to handle 2 -- i.e. controlling handle2
					Math.abs(resultValue - value2) < Math.abs(resultValue - value)
				) {
					cb2(resultValue);
				} else {
					cb1(resultValue);
				}
			}
		},
		[layout, maximumValue, minimumValue, step, vertical, isInverted, disabled, value, value2]
	);

	/**
	 * Gesture handlers
	 */
	const panResponder = useMemo(() => {
		/* istanbul ignore next */
		return PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponderCapture: () => true,
			onPanResponderEnd: () => (
				_e: GestureResponderEvent,
				_gestureState: PanResponderGestureState
			) => {
				/* Used initialGestureState as last saved
				 PanResponder Movement state, to avoid
				  sliding glitches which displays the thumb
				   at 0,0 position of the slider. */
				processSelection(initialGestureState, onSlidingComplete, onSlidingComplete2);
				return true;
			},
			onPanResponderGrant: (_e: GestureResponderEvent, _gestureState: PanResponderGestureState) => {
				/* Used initialGestureState as last saved
				 PanResponder Movement state, to avoid
				 sliding glitches which displays the thumb
				  at 0,0 position of the slider. */
				processSelection(initialGestureState, onSlidingStart, onSlidingStart2);
				return true;
			},
			onPanResponderMove: (_e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
				/*
			Saved Last Moved State in setInitialGesture to
			 avoid d(x,y) -> d(0,0), which results in displaying
			  the thumb at the start position of Slider for a while.
			*/
				setInitialGestureState(gestureState);
				processSelection(gestureState, onValueChange, onValueChange2);
				return true;
			},
			onPanResponderRelease: (
				_e: GestureResponderEvent,
				_gestureState: PanResponderGestureState
			) => {
				/* Used initialGestureState as last saved
				 PanResponder Movement state, to avoid
				  sliding glitches which displays the thumb
				   at 0,0 position of the slider. */
				processSelection(initialGestureState, onSlidingComplete, onSlidingComplete2);
				return true;
			},
			onPanResponderTerminationRequest: () => false,
			// onStartShouldSetPanResponder: () => true,
			onStartShouldSetPanResponderCapture: () => true,
		});
	}, [layout, onSlidingStart, onSlidingStart2, onValueChange, onValueChange2, value, value2]);

	/**
	 * Press event
	 */
	const onPress = useCallback(
		(_event: GestureResponderEvent) => {
			processSelection(
				{
					moveX: initialGestureState.moveX,
					moveY: initialGestureState.moveY,
				},
				onValueChange,
				onValueChange2
			);

			processSelection(
				{
					moveX: initialGestureState.moveX,
					moveY: initialGestureState.moveY,
				},
				onSlidingComplete,
				onSlidingComplete2
			);
		},
		[layout, onValueChange, onValueChange2, onSlidingComplete, onSlidingComplete2, value, value2]
	);

	// //////////////////////////////////////////
	// ///////////// Render Views ///////////////
	// //////////////////////////////////////////

	/**
	 * Renders Background Track
	 */
	const renderTrack = () => {
		return (
			<MaximumTrackComponent
				{...props}
				position={position}
				parentLayout={layout}
				height={!vertical ? trackWidth : height}
				width={!vertical ? width : trackWidth}
				onPress={onPress}
			/>
		);
	};

	/**
	 * Renders Filled Track
	 */
	const renderFilledTrack = () => {
		return (
			<MinimumTrackComponent
				{...props}
				position={position}
				parentLayout={layout}
				onPress={onPress}
			/>
		);
	};

	/**
	 * Renders First thumb
	 */
	const renderThumb1 = () => {
		if (!ThumbComponent || !isControllable) {
			return null;
		}

		const isHorizontal = !vertical;

		const thumb1Postion = {
			...position,
		};

		if (isHorizontal && isInverted) {
			thumb1Postion.x = has2Thumbs
				? position.width + get(position, 'x', 0)
				: layout.width - position.width;
		} else if (isHorizontal && !isInverted && !has2Thumbs) {
			thumb1Postion.x = position.width;
		} else if (!isHorizontal && isInverted && !has2Thumbs) {
			thumb1Postion.y = position.height;
		} else if (!isHorizontal && !isInverted && has2Thumbs) {
			thumb1Postion.y = get(position, 'y', 0) + position.height;
		}
		return (
			<React.Fragment>
				<ThumbTouchArea {...props} position={thumb1Postion} value={value} parentLayout={layout} />
				<ThumbComponent
					{...props}
					styles={{}}
					position={thumb1Postion}
					value={value}
					parentLayout={layout}
					number={1}
				/>
			</React.Fragment>
		);
	};

	/**
	 * Renders Second thumb
	 */
	const renderThumb2 = () => {
		if (!ThumbComponent2 || !isControllable || value2 === undefined) {
			return null;
		}

		const isHorizontal = !vertical;
		const thumb2Postion = {
			...position,
			x: position.x === undefined ? position.x : position.width + position.x,
		};

		if (isHorizontal && isInverted) {
			thumb2Postion.x = position.x;
		}
		if (!isHorizontal && isInverted) {
			thumb2Postion.y = get(position, 'y', 0) + position.height;
		}

		return (
			<React.Fragment>
				<ThumbTouchArea {...props} position={thumb2Postion} value={value2} parentLayout={layout} />
				<ThumbComponent2
					{...props}
					styles={{}}
					position={thumb2Postion}
					value={value2}
					parentLayout={layout}
					number={2}
				/>
			</React.Fragment>
		);
	};

	const sliderStyles: ViewStyle = {
		alignItems: vertical ? 'center' : undefined,
		flexGrow: 1,
		justifyContent: !vertical ? 'center' : undefined,

		minHeight: !vertical ? Math.max(thumbSize, position.height) : undefined,
		minWidth: !vertical ? Math.max(thumbSize, position.width) : trackWidth,

		maxHeight: !vertical ? trackWidth : height,
		maxWidth: !vertical ? width : trackWidth,
	};

	return (
		<View
			testID="slider-root"
			{...panResponder.panHandlers}
			style={[styles.slider, sliderStyles, sliderStyle, style]}
		>
			{/* Track Background  */}
			{renderTrack()}

			{/* Filled Track (render after background so it overlays it) */}
			{renderFilledTrack()}

			{/* Thumb 1 */}
			{renderThumb1()}

			{/* Thumb 2 */}
			{renderThumb2()}

			{/* Children */}
			{children}
		</View>
	);
};

BaseSlider.defaultProps = SliderDefaultProps;
BaseSlider.displayName = 'BaseSlider';

export const MemoizedBaseSlider = memo(BaseSlider);
