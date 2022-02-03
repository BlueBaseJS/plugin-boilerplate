import { Overline, View } from '@bluebase/components';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Theme, isMobile } from '@bluebase/core';

import React from 'react';

export interface WidgetStyles {
	root: StyleProp<ViewStyle>;
	title: StyleProp<TextStyle>;
	content: StyleProp<ViewStyle>;
}

export interface WidgetProps {
	children?: React.ReactNode;
	content?: React.ComponentType<any>;
	title?: string | React.ReactNode;
	styles?: Partial<WidgetStyles>;
}

export const Widget = ({ children, content: Content, title, styles }: WidgetProps) => (
	<View style={styles!.root}>
		{title && (
			<Overline style={styles!.title} testID="widget-title">
				{title}
			</Overline>
		)}
		<View style={styles!.content} testID="widget-content">
			{children || (Content && <Content />)}
		</View>
	</View>
);

Widget.defaultStyles = (theme: Theme): WidgetStyles => ({
	root: {},

	title: {
		// ...theme.typography.overline,
		color: theme.palette.text.hint,
		marginVertical: theme.spacing.unit,
		paddingHorizontal: theme.spacing.unit,
	},

	content: {
		backgroundColor: theme.palette.background.default,
		borderColor: theme.palette.divider,

		borderBottomWidth: 1,
		borderLeftWidth: isMobile() ? 0 : 1,
		borderRightWidth: isMobile() ? 0 : 1,
		borderTopWidth: 1,

		borderRadius: isMobile() ? 0 : theme.shape.borderRadius,
		marginBottom: theme.spacing.unit * 2,
	},
});
