import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useStyles } from '@bluebase/core';

import ExternalLink from '../ExternalLink';
import { HeaderMenuSubListItem } from './HeaderMenuSubListItem';
import { MenuItemType } from './HeaderMenu';
import React from 'react';
import { View } from '@bluebase/components';

export interface HeaderMenuSubListStyles {
	root: ViewStyle;
	hover: TextStyle;
	title: TextStyle;
	link: TextStyle;
}

const defaultStyles = (theme: Theme): HeaderMenuSubListStyles => ({
	root: {
		paddingVertical: theme.spacing.unit,
	},

	hover: {
		textDecorationLine: 'underline',
	},

	title: {
		...theme.typography.overline,
		fontWeight: 'bold',
		marginBottom: theme.spacing.unit,
	},

	link: {
		...theme.typography.body2,
		color: theme.palette.text.secondary,
		marginVertical: theme.spacing.unit / 4,
	},
});

export interface HeaderMenuSubListProps extends Partial<MenuItemType> {
	items: MenuItemType[];
	styles?: Partial<HeaderMenuSubListStyles>;
	style?: ViewStyle;
}

export const HeaderMenuSubList = (props: HeaderMenuSubListProps) => {
	const { title, items, href, style } = props;
	const styles = useStyles('HeaderMenuSubList', props, defaultStyles);

	return (
		<View style={[styles.root, style]}>
			{title && (
				<ExternalLink
					href={href}
					style={styles.title}
					hoverStyle={styles.hover}
					testID="header-menu-sublist-title"
				>
					{title}
				</ExternalLink>
			)}
			{items.map((item, i) => (
				<HeaderMenuSubListItem key={i} {...item} style={styles.link} />
			))}
		</View>
	);
};

HeaderMenuSubList.defaultProps = {
	items: [],
};

HeaderMenuSubList.displayName = 'HeaderMenuSubList';
