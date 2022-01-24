import * as Animatable from 'react-native-animatable';

import { Theme, useStyles } from '@bluebase/core';

import React from 'react';
import { ViewStyle } from 'react-native';

const pulsate = {
	0: {
		opacity: 0,
		scaleX: 0.2,
		scaleY: 0.1,
	},
	0.5: {
		opacity: 1,
	},
	1: {
		opacity: 0,
		scaleX: 2.4,
		scaleY: 1.2,
	},
};

Animatable.initializeRegistryWithDefinitions({
	pulsate,
});

export interface PulseStyles {
	root: ViewStyle;
}

export interface PulseProps {
	size?: number;
	styles?: Partial<PulseStyles>;
}

const defaultStyles = (_theme: Theme) => ({
	root: {
		backgroundColor: 'rgba(0,0,0,.05)',
		marginTop: 20,
		shadowColor: 'black',
		shadowOffset: {
			height: 0,
			width: 0,
		},
		shadowOpacity: 1,
		shadowRadius: 10.32,
	},
});

export const Pulse = (props: PulseProps) => {
	const { size = 30 } = props;
	const styles = useStyles('Pulse', props, defaultStyles);

	const style = {
		borderRadius: size * 2,
		height: size,
		width: size,
	};

	return (
		<Animatable.View
			animation="pulsate"
			iterationCount="infinite"
			duration={1000}
			style={[styles.root, style]}
			testID="pulse-view"
		/>
	);
};

Pulse.displayName = 'Pulse';
