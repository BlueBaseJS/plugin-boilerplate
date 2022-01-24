import { Avatar, AvatarProps, View } from '@bluebase/components';
import { Theme, useStyles } from '@bluebase/core';

import React from 'react';
import { ViewStyle } from 'react-native';

export interface AvatarMarkerStyles {
	root: ViewStyle;
	avatarContainer: ViewStyle;
	stick: ViewStyle;
	dot: ViewStyle;
}

export interface AvatarMarkerProps extends AvatarProps {
	styles?: Partial<AvatarMarkerStyles>;
}

const defaultStyles = (theme: Theme): AvatarMarkerStyles => ({
	root: {
		alignItems: 'center',
	},

	avatarContainer: {
		backgroundColor: 'black',
		borderRadius: 50,
		padding: 2,
	},

	stick: {
		backgroundColor: 'black',
		height: 10,
		width: 2,
	},

	dot: {
		backgroundColor: 'white',
		borderColor: 'black',
		borderRadius: 4,
		borderWidth: 2,
		height: 8,
		width: 8,

		...theme.elevation(3),
	},
});

export const AvatarMarker = (props: AvatarMarkerProps) => {
	const { style } = props;
	const styles = useStyles('AvatarMarker', props, defaultStyles);

	return (
		<View style={[styles.root, style]}>
			<View style={styles.avatarContainer}>
				<Avatar size={50} {...props} />
			</View>
			<View style={styles.stick} />
			<View style={styles.dot} />
		</View>
	);
};

AvatarMarker.displayName = 'AvatarMarker';
