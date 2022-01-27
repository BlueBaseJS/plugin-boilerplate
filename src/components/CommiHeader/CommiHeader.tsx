import { CartButton, CartButtonProps } from './CartButton';
import { HeaderLogo, HeaderLogoProps } from './HeaderLogo';
import { HeaderMenu, MenuItemType } from './HeaderMenu';
import { Search, SearchProps } from './Search';
import { Theme, useStyles } from '@bluebase/core';
import { UserMenu, UserMenuProps } from './UserMenu';

import React from 'react';
import { View } from '@bluebase/components';
import { ViewStyle } from 'react-native';

export interface CommiHeaderStyles {
	root: ViewStyle;
	headerItem: any;
	mainRow: ViewStyle;
	mainRowLeft: ViewStyle;
	mainRowRight: ViewStyle;
	logo: ViewStyle;
	menuRow: ViewStyle;
}

const defaultStyles = (theme: Theme): CommiHeaderStyles => ({
	root: {
		backgroundColor: theme.palette.background.card,
		zIndex: 1100,
		...theme.elevation(4),
	},

	headerItem: {
		marginHorizontal: theme.spacing.unit / 2,
	},

	mainRow: {
		alignItems: 'stretch',
		flexDirection: 'row',
	},

	mainRowLeft: {
		alignItems: 'stretch',
		flexDirection: 'row',
	},

	mainRowRight: {
		alignItems: 'center',
		flexDirection: 'row',
		flexGrow: 1,
		justifyContent: 'flex-end',

		paddingHorizontal: theme.spacing.unit,
		paddingVertical: theme.spacing.unit,
	},

	logo: {
		justifyContent: 'center',

		paddingHorizontal: theme.spacing.unit * 2,
		paddingVertical: theme.spacing.unit,
	},

	menuRow: {
		alignItems: 'stretch',
		flexDirection: 'row',
		height: theme.spacing.unit * 6,
		// paddingHorizontal: theme.spacing.unit,

		borderTopColor: theme.palette.divider,
		borderTopWidth: 1,
	},
});

export interface CommiHeaderProps {
	menuItems: MenuItemType[];

	headerLogoProps: HeaderLogoProps;
	searchProps?: Partial<SearchProps>;
	cartButtonProps?: Partial<CartButtonProps>;
	userMenuProps?: Partial<UserMenuProps>;

	loading?: boolean;
	styles?: Partial<CommiHeaderStyles>;
	style?: ViewStyle;
}

export const CommiHeader = (props: CommiHeaderProps) => {
	const { headerLogoProps, cartButtonProps, searchProps, userMenuProps, loading, style } = props;
	const styles = useStyles('CommiHeader', props, defaultStyles);

	const menuItems = loading ? ([{}, {}, {}] as MenuItemType[]) : props.menuItems;

	return (
		<View style={[styles.root, style]}>
			<View style={styles.mainRow}>
				<View style={styles.mainRowLeft}>
					<View style={styles.logo}>
						<HeaderLogo {...headerLogoProps} loading={loading} />
					</View>
					{menuItems.length < 5 && <HeaderMenu items={menuItems} loading={loading} />}
				</View>
				<View style={styles.mainRowRight}>
					<Search style={{ ...styles.headerItem }} loading={loading} {...searchProps} />
					<CartButton style={{ ...styles.headerItem }} loading={loading} {...cartButtonProps} />
					<UserMenu style={{ ...styles.headerItem }} loading={loading} {...userMenuProps} />
				</View>
			</View>
			{menuItems.length >= 5 && (
				<View style={styles.menuRow} testID="commi-header-menu-row">
					<HeaderMenu items={menuItems} loading={loading} />
				</View>
			)}
		</View>
	);
};

CommiHeader.defaultProps = {
	menuItems: [],
};

CommiHeader.displayName = 'CommiHeader';
