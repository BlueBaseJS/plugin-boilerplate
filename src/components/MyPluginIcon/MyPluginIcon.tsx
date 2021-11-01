import { DynamicIcon, View } from '@bluebase/components';
import { Theme } from '@bluebase/core';
import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export interface MyPluginIconStyles {
	iconColor: { color: TextStyle['color'] };
	root: ViewStyle;
}

export interface MyPluginIconProps {
	size: number;
	styles?: Partial<MyPluginIconStyles>;
}

export const MyPluginIcon = ({ size, styles: _styles }: MyPluginIconProps) => {
	const styles = _styles as MyPluginIconStyles;

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

MyPluginIcon.defaultStyles = (_theme: Theme) => ({
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
