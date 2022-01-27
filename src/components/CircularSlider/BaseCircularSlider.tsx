import {
	GestureResponderEvent,
	LayoutRectangle,
	PanResponder,
	PanResponderGestureState,
	View,
	ViewProps,
	ViewStyle,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { angleToValue, positionToAngle, roundValueToStep, valueToAngle } from './circularGeometry';

import { FilledTrack } from './FilledTrack';
import { PathProps } from 'react-native-svg';
import Thumb from './Thumb';
import ThumbTouchArea from './ThumbTouchArea';
import { Track } from './Track';

export interface CircularSliderSubComponentProps extends Omit<BaseCircularSliderProps, 'layout'> {
	onPress?: (event: GestureResponderEvent) => void;
}

type SelectionCallback = (value: number) => void;

export interface BaseCircularSliderProps {
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
	maximumTrackTintColor: string;

	/**
	 * The color used for the track to the right of the button. Overrides the
	 * default blue gradient image.
	 */
	minimumTrackTintColor: string;

	/**
	 * The color used for the thumb.
	 */
	thumbTintColor: string;

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
	 * Prop of the track path
	 */
	trackProps?: PathProps;

	/**
	 * Props of the filled track component
	 */
	filledTrackProps?: PathProps;

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
	 * The size of the component
	 */
	size: number;

	/**
	 * Slider width
	 */
	width?: number;

	/**
	 * Slider height
	 */
	height?: number;

	/**
	 * Starting angle (0 - 360 degrees).
	 */
	startAngle: number; //

	/**
	 * Ending angle (0 - 360 degrees).
	 */
	endAngle: number;

	/**
	 * Slider direction. Clockwise or Counter Clockwise
	 */
	direction: 'cw' | 'ccw';

	/**
	 * Slider axis
	 */
	axis: '+x' | '-x' | '+y' | '-y';

	/**
	 * Root style
	 */
	style?: ViewStyle;

	/**
	 * Slider style
	 */
	sliderStyle?: ViewStyle;

	children?: React.ReactNode;

	padding: number;

	MaximumTrackComponent: React.ComponentType<CircularSliderSubComponentProps>;
	MinimumTrackComponent: React.ComponentType<CircularSliderSubComponentProps>;
	ThumbComponent: React.ComponentType<CircularSliderSubComponentProps>;
	ThumbComponent2: React.ComponentType<CircularSliderSubComponentProps>;

	layout: LayoutRectangle;
}

// const defaultStyles = {};

export const BaseCircularSlider = (props: BaseCircularSliderProps) => {
	const {
		MaximumTrackComponent,
		MinimumTrackComponent,
		ThumbComponent,
		children,
		disabled,
		maximumValue,
		minimumValue,
		onSlidingStart,
		onSlidingStart2,
		onValueChange,
		onValueChange2,
		onSlidingComplete,
		onSlidingComplete2,
		step,
		value,
		value2,

		layout,
		direction,
		axis,
		startAngle,
		endAngle,
		size,
	} = props;

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

	/**
	 * Tells if the slider is controllable
	 */
	const isControllable = !disabled && Boolean(onValueChange);

	/**
	 * Tells if the slider should have 2 thumbs
	 */
	const has2Thumbs = isControllable && value2 !== undefined;

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

	const handle2Angle =
		value2 !== undefined &&
		useMemo(
			() =>
				valueToAngle({
					endAngle,
					maximumValue,
					minimumValue,
					startAngle,
					value: value2,
				}),
			[endAngle, maximumValue, minimumValue, startAngle, value2]
		);

	/**
	 * Converts position to value
	 */
	const positionToValue = useCallback(
		({ moveX, moveY }: { moveX: number; moveY: number }) => {
			// //////////////////////
			// Cannot use this method, because expo doesn't support
			// latest react-native-svg yet.
			// Needs Expo 36
			// //////////////////////

			// const svgRef: any = svgRef.current;
			// if (!svgRef) {
			// 	return;
			// }
			// // Find the coordinates with respect to the SVG
			// const svgPoint = svgRef.ownerSVGElement.createSVGPoint();
			// const x = moveX;
			// const y = moveY;
			// svgPoint.x = x;
			// svgPoint.y = y;

			// const screenCTM = svgRef.getScreenCTM();
			// const coordsInSvg = svgPoint.matrixTransform(screenCTM.inverse());
			// //////////////////////
			const coordsInSvg = { x: moveX - layout.x, y: moveY - layout.y };
			// //////////////////////

			const angle = positionToAngle({ ...coordsInSvg, svgSize: size, axis, direction });
			const val = angleToValue({
				angle,
				endAngle,
				maximumValue,
				minimumValue,
				startAngle,
			});

			return roundValueToStep(val, step, minimumValue);
		},
		[layout, size, axis, direction, endAngle, maximumValue, minimumValue, startAngle, step]
	);

	/**
	 * Updated slider
	 */
	const processSelection = useCallback(
		(
			opts: { moveX: number; moveY: number } & any,
			cb1?: SelectionCallback,
			cb2?: SelectionCallback
		) => {
			if (!cb1) {
				// Read-only, don't bother doing calculations
				return;
			}
			const resultValue = positionToValue(opts);

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
		[layout, disabled, value, value2]
	);

	/**
	 * Gesture handlers
	 */
	const panResponder = useMemo(() => {
		/* istanbul ignore next */
		return PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponderCapture: () => true,
			// onPanResponderEnd: () => (
			// 	_e: GestureResponderEvent,
			// 	gestureState: PanResponderGestureState
			// ) => {
			// 	processSelection(gestureState, onSlidingComplete, onSlidingComplete2);
			// 	return true;
			// },
			// onPanResponderGrant: (_e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
			// 	processSelection(gestureState, onSlidingStart, onSlidingStart2);
			// 	return true;
			// },
			// onPanResponderMove: (_e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
			// 	processSelection(gestureState, onValueChange, onValueChange2);
			// 	return true;
			// },
			// onPanResponderRelease: (
			// 	_e: GestureResponderEvent,
			// 	gestureState: PanResponderGestureState
			// ) => {
			// 	processSelection(gestureState, onSlidingComplete, onSlidingComplete2);
			// 	return true;
			// },
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
			/*
				Saved Last Moved State in setInitialGesture
				 to avoid d(x,y) -> d(0,0), which results in
				 displaying the thumb at the start position of
				  Slider for a while.
				*/
			onPanResponderMove: (_e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
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
		(event: GestureResponderEvent) => {
			processSelection(
				{
					moveX: event.nativeEvent.pageX,
					moveY: event.nativeEvent.pageY,
				},
				onValueChange,
				onValueChange2
			);

			processSelection(
				{
					moveX: event.nativeEvent.pageX,
					moveY: event.nativeEvent.pageY,
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
		return <MaximumTrackComponent onPress={onPress} {...props} />;
	};

	/**
	 * Renders Filled Track
	 */
	const renderFilledTrack = () => {
		return (
			<View style={{ position: 'absolute' }}>
				<MinimumTrackComponent
					onPress={onPress}
					{...props}
					startAngle={!handle2Angle ? startAngle : handle1Angle}
					endAngle={!handle2Angle ? handle1Angle : handle2Angle}
				/>
			</View>
		);
	};

	/**
	 * Renders First thumb
	 */
	const renderThumb1 = () => {
		if (!ThumbComponent || !isControllable) {
			return null;
		}

		return (
			<React.Fragment>
				<ThumbTouchArea {...props} value={value} />
				<ThumbComponent {...props} value={value} />
			</React.Fragment>
		);
	};

	/**
	 * Renders Second thumb
	 */
	const renderThumb2 = () => {
		if (!ThumbComponent || !has2Thumbs) {
			return null;
		}

		return (
			<React.Fragment>
				<ThumbTouchArea {...props} value={value2!} />
				<ThumbComponent {...props} value={value2!} />
			</React.Fragment>
		);
	};

	if (size === 0) {
		return null;
	}

	return (
		<View {...panResponder.panHandlers} style={{ flex: 1 }}>
			{/* Arc Background  */}
			{renderTrack()}

			{/* Arc (render after background so it overlays it) */}
			{renderFilledTrack()}

			{/* Handle 1 */}
			{renderThumb1()}

			{/* Handle 2 */}
			{renderThumb2()}

			{/* Children */}
			{children}
		</View>
	);
};

BaseCircularSlider.displayName = 'BaseCircularSlider';

export const BaseCircularSliderDefaultProps = {
	axis: '-y',
	direction: 'cw',
	disabled: false,
	endAngle: 360,
	maximumTrackTintColor: '#aaa',
	maximumValue: 1,
	minimumTrackTintColor: '#000',
	minimumValue: 0,
	padding: 10,
	size: 200,
	startAngle: 0,
	step: 0,
	thumbSize: 25,
	thumbTintColor: '#fff',
	thumbTouchSize: { width: 50, height: 50 },
	trackWidth: 4,
	value: 0.5,

	MaximumTrackComponent: Track,
	MinimumTrackComponent: FilledTrack,
	ThumbComponent: Thumb,
	ThumbComponent2: Thumb,
};

BaseCircularSlider.defaultProps = BaseCircularSliderDefaultProps;
