import { DynamicIcon, View } from '@bluebase/components';
import { TextStyle, ViewStyle } from 'react-native';

import React from 'react';
import { Theme } from '@bluebase/core';

export interface AppIconStyles {
	iconColor: { color: TextStyle['color'] };
	root: ViewStyle;
}

export interface AppIconProps {
	size: number;
	styles?: Partial<AppIconStyles>;
}

export const AppIcon = ({ size, styles: _styles }: AppIconProps) => {
	const styles = _styles as AppIconStyles;

	return (
		<View style={[styles.root, { height: size, width: size }]}>
			<DynamicIcon
				type="icon"
				name="lightbulb-outline"
				color={styles.iconColor.color}
				size={size * 0.75}
			/>
		</View>
	);
};

AppIcon.defaultStyles = (_theme: Theme) => ({
	iconColor: {
		color: '#fff',
	},
	root: {
		alignItems: 'center',
		backgroundColor: '#3D5AFE',
		borderRadius: 10,
		justifyContent: 'center',
	},
});
