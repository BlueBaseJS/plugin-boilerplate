import { DynamicIcon, View } from '@bluebase/components';
import { useStyles } from '@bluebase/core';
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

export const MyPluginIcon = (props: MyPluginIconProps) => {
	const { size, styles: _styles } = props;

	const styles: MyPluginIconStyles = useStyles('MyPluginIcon', props, {
		iconColor: {
			color: '#fff',
		},
		root: {
			alignItems: 'center',
			backgroundColor: '#C62828',
			borderRadius: 10,
			justifyContent: 'center',
			height: size,
			width: size,
		},
	});

	return (
		<View style={styles.root}>
			<DynamicIcon
				type="icon"
				name="rocket"
				color={styles.iconColor.color}
				size={size * 0.75}
			/>
		</View>
	);
};

MyPluginIcon.defaultProps = {
	size: 100,
};
