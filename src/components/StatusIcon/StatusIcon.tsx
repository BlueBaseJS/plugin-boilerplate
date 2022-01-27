import { StyleProp, TextStyle } from 'react-native';

import { DynamicIcon } from '@bluebase/components';
import React from 'react';
import { Theme } from '@bluebase/core';

export interface StatusIconStyles {
	red: TextStyle;
	orange: TextStyle;
	green: TextStyle;
}

export interface StatusIconProps {
	color: 'red' | 'orange' | 'green';

	style?: StyleProp<TextStyle>;
	styles?: Partial<StatusIconStyles>;
}

/**
 * # 🚦 StatusIcon
 * StatusIcon shows the current connection status of a thing which indicates if it is online or offline.
 */

export const StatusIcon = ({ color, style, ...rest }: StatusIconProps) => {
	const styles = rest.styles as StatusIconStyles;
	let finalColor: any;

	if (color === 'red') {
		finalColor = styles.red;
	} else if (color === 'green') {
		finalColor = styles.green;
	} else {
		finalColor = styles.orange;
	}
	return (
		<DynamicIcon
			testID="status-icon-color"
			type="icon"
			name="checkbox-blank-circle"
			color={finalColor.color}
			size={10}
			style={style}
		/>
	);
};

StatusIcon.defaultStyles = (theme: Theme) => ({
	red: {
		color: theme.palette.error.main,
	},

	orange: {
		color: theme.palette.warning.main,
	},

	green: {
		color: theme.palette.success.main,
	},
});
