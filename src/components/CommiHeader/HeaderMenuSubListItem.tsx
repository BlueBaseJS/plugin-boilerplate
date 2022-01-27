import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useStyles } from '@bluebase/core';

import ExternalLink from '../ExternalLink';
import { MenuItemType } from './HeaderMenu';
import React from 'react';
import { View } from '@bluebase/components';

export interface HeaderMenuSubListItemStyles {
	root: ViewStyle;
	hover: TextStyle;
	link: TextStyle;
}

const defaultStyles = (theme: Theme): HeaderMenuSubListItemStyles => ({
	root: {},

	hover: {
		textDecorationLine: 'underline',
	},

	link: {
		...theme.typography.body2,
		color: theme.palette.text.secondary,
		marginVertical: theme.spacing.unit / 4,
	},
});

export interface HeaderMenuSubListItemProps extends MenuItemType {
	styles?: Partial<HeaderMenuSubListItemStyles>;
	style?: ViewStyle;
}

export const HeaderMenuSubListItem = (props: HeaderMenuSubListItemProps) => {
	const { title, href, style } = props;
	const styles = useStyles('HeaderMenuSubListItem', props, defaultStyles);

	return (
		<View style={[styles.root, style]}>
			<ExternalLink href={href} style={styles.link} hoverStyle={styles.hover}>
				{title}
			</ExternalLink>
		</View>
	);
};

HeaderMenuSubListItem.defaultProps = {
	items: [],
};

HeaderMenuSubListItem.displayName = 'HeaderMenuSubListItem';
