import { Animated, Dimensions, ViewStyle } from 'react-native';

import React from 'react';
import { isMobile } from '@bluebase/core';

export interface SlidingPaneProps {
	width?: number;
	style?: ViewStyle;
}
export interface SlidingPaneState {
	leftAnim: Animated.Value;
}

export class SlidingPane extends React.Component<SlidingPaneProps, SlidingPaneState> {
	constructor(props: SlidingPaneProps) {
		super(props);
		this.state = {
			leftAnim: new Animated.Value(0),
		};
	}

	getWidth() {
		return this.props.width || Dimensions.get('window').width;
	}

	warpLeft(callback?: () => void) {
		const width = this.getWidth();
		this.setState({ leftAnim: new Animated.Value(-width) }, callback);
	}

	warpCenter(callback?: () => void) {
		this.setState({ leftAnim: new Animated.Value(0) }, callback);
	}

	warpRight(callback?: () => void) {
		const width = this.getWidth();
		this.setState({ leftAnim: new Animated.Value(width) }, callback);
	}

	slideLeft(callback?: Animated.EndCallback) {
		const width = this.getWidth();
		Animated.timing(this.state.leftAnim, { useNativeDriver: true, toValue: -width, duration: 150 }).start(callback);
	}

	slideCenter(callback?: Animated.EndCallback) {
		Animated.timing(this.state.leftAnim, { useNativeDriver: true, toValue: 0, duration: 150 }).start(callback);
	}

	slideRight(callback?: Animated.EndCallback) {
		const width = this.getWidth();
		Animated.timing(this.state.leftAnim, { useNativeDriver: true, toValue: width, duration: 150 }).start(callback);
	}

	render() {
		return (
			<Animated.View
				style={{
					// height: '100%',
					flex: 1,
					...(isMobile() ? {} : { left: this.state.leftAnim }),
					// position: 'absolute',
					// width: '100%',
					...this.props.style,
				}}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}
