import { Animated, Dimensions, ViewStyle } from 'react-native';

import React from 'react';

export interface SlidingPaneProps {
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

	warpLeft(callback?: () => void, size?: number) {
		const { width } = Dimensions.get('window');
		this.setState({ leftAnim: new Animated.Value(size || -width) }, callback);
	}

	warpCenter(callback?: () => void) {
		this.setState({ leftAnim: new Animated.Value(0) }, callback);
	}

	warpRight(callback?: () => void, size?: number) {
		const { width } = Dimensions.get('window');
		this.setState({ leftAnim: new Animated.Value(size || width) }, callback);
	}

	slideLeft(callback?: Animated.EndCallback) {
		const { width } = Dimensions.get('window');
		Animated.timing(this.state.leftAnim, { toValue: -width, duration: 150, useNativeDriver: true }).start(callback);
	}

	slideCenter(callback?: Animated.EndCallback) {
		Animated.timing(this.state.leftAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(callback);
	}

	slideRight(callback?: Animated.EndCallback) {
		const { width } = Dimensions.get('window');
		Animated.timing(this.state.leftAnim, { toValue: width, duration: 150, useNativeDriver: true }).start(callback);
	}

	render() {
		return (
			<Animated.View
				style={{
					...this.props.style,
					left: this.state.leftAnim,
					width: '100%',
				}}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}
