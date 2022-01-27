import { Text, View } from '@bluebase/components';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useStyles } from '@bluebase/core';

import React from 'react';

export interface StatusBadgeProps {
	title: string;
	color?: string;
	backgroundColor?: string;
	style?: ViewStyle;
	styles?: Partial<StatusBadgeStyles>;
}

export interface StatusBadgeStyles {
	root: ViewStyle;
	text: TextStyle;
}

const defaultStyles = (theme: Theme): StatusBadgeStyles => ({
	root: {
		backgroundColor: '#cfd8dc',
		borderRadius: theme.shape.borderRadius,
		marginVertical: theme.spacing.unit / 2,
		paddingHorizontal: theme.spacing.unit / 2,
		paddingVertical: theme.spacing.unit / 4,
	},

	text: {
		...theme.typography.caption,
		color: '#607d8b',
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
});

export const StatusBadge = (props: StatusBadgeProps) => {
	const { title, color, backgroundColor, style, ...rest } = props;
	const styles = useStyles('StatusBadge', props, defaultStyles);

	return (
		<View
			style={[
				styles.root,
				style,
				{ backgroundColor: backgroundColor || styles.root.backgroundColor },
			]}
		>
			<Text
				style={{
					...styles.text,
					color: color || styles.text.color,
				}}
				{...rest}
			>
				{title}
			</Text>
		</View>
	);
};

StatusBadge.defaultProps = {};
