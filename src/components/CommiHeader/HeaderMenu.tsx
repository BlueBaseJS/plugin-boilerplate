import { Theme, useStyles } from '@bluebase/core';

import { HeaderMenuItem } from './HeaderMenuItem';
import React from 'react';
import { View } from '@bluebase/components';
import { ViewStyle } from 'react-native';

export interface MenuItemType {
	title: string;
	href: string;
	items: MenuItemType[];
}

export interface HeaderMenuStyles {
	root: ViewStyle;
}

const defaultStyles = (_theme: Theme): HeaderMenuStyles => ({
	root: {
		alignItems: 'stretch',
		flexDirection: 'row',
	},
});

export interface HeaderMenuProps {
	items: MenuItemType[];
	loading?: boolean;
	styles?: Partial<HeaderMenuStyles>;
	style?: ViewStyle;
}

export const HeaderMenu = (props: HeaderMenuProps) => {
	const { items, loading, style } = props;
	const styles = useStyles('HeaderMenu', props, defaultStyles);

	return (
		<View style={[styles.root, style]}>
			{items.map((item, i) => (
				<HeaderMenuItem key={i} loading={loading} {...item} />
			))}
		</View>
	);
};

HeaderMenu.defaultProps = {
	items: [],
};

HeaderMenu.displayName = 'HeaderMenu';
