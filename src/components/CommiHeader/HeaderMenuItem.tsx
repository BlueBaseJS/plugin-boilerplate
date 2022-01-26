import { Placeholder, PlaceholderBody1 } from '../../imports';
import React, { useState } from 'react';
import { Text, View } from '@bluebase/components';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useStyles } from '@bluebase/core';

import ExternalLink from '../ExternalLink';
import { HeaderMenuSubList } from './HeaderMenuSubList';
import { MegaMenu } from './MegaMenu';
import { MenuItemType } from './HeaderMenu';
import { Popper } from './lib';
import { or } from '../../helpers';

export interface HeaderMenuItemStyles {
	root: ViewStyle;
	hover: TextStyle;
	link: TextStyle;
	bar: ViewStyle;
	dropdown: ViewStyle;
	dropdownSimple: ViewStyle;
}

const defaultStyles = (theme: Theme): HeaderMenuItemStyles => ({
	root: {
		alignItems: 'stretch',
		justifyContent: 'center',
		paddingHorizontal: theme.spacing.unit * 2,

		cursor: 'pointer',
	} as any,

	hover: {
		color: theme.palette.primary.main,
	},

	link: {
		...theme.typography.body1,
	},

	bar: {
		backgroundColor: theme.palette.primary.main,
		borderTopEndRadius: theme.shape.borderRadius,
		borderTopStartRadius: theme.shape.borderRadius,
		bottom: 0,
		height: theme.spacing.unit / 2,
		left: theme.spacing.unit * 2,
		position: 'absolute',
		right: theme.spacing.unit * 2,
	},

	dropdown: {
		backgroundColor: theme.palette.background.card,
		borderBottomEndRadius: theme.shape.borderRadius,
		borderBottomStartRadius: theme.shape.borderRadius,
		marginHorizontal: theme.spacing.unit * 2,
		...theme.elevation(2),
	},

	dropdownSimple: {
		paddingHorizontal: theme.spacing.unit * 2,
	},
});

export interface HeaderMenuItemProps extends Partial<MenuItemType> {
	items: MenuItemType[];
	loading?: boolean;
	styles?: Partial<HeaderMenuItemStyles>;
	style?: ViewStyle;
}

export const HeaderMenuItem = (props: HeaderMenuItemProps) => {
	const { title, href, items, loading, style } = props;
	const styles = useStyles('HeaderMenuItem', props, defaultStyles);

	if (loading) {
		return (
			<View style={[styles.root, { width: 100 }, style]}>
				<Placeholder>
					<PlaceholderBody1 width={100} />
				</Placeholder>
			</View>
		);
	}

	const [isHovering, setIsHovering] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const onMouseEnterLeave = (event: any) => {
		setAnchorEl(or(!!anchorEl, (null as any), event.currentTarget));
		setIsHovering(!isHovering);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'menu-item-dropdown' : undefined;

	const TextComponent = href ? ExternalLink : Text;

	function hasGrandChildren() {
		for (const item of items) {
			if (item.items.length > 0) {
				return true;
			}
		}

		return false;
	}

	return (
		<View
			style={[styles.root, style]}
			{...({ onMouseEnter: onMouseEnterLeave, onMouseLeave: onMouseEnterLeave } as any)}
			testID="header-menu-item-root"
		>
			<View>
				<TextComponent
					testID="header-menu-item-title"
					href={href}
					style={[styles.link, isHovering && styles.hover]}
				>
					{title}
				</TextComponent>
			</View>
			{isHovering && <View style={styles.bar} testID="header-menu-item-hover-bar" />}
			{items.length > 0 && (
				<Popper id={id} open={open} anchorEl={anchorEl}>
					{hasGrandChildren() ? (
						<MegaMenu items={items} style={styles.dropdown} />
					) : (
						<HeaderMenuSubList
							items={items}
							style={{ ...styles.dropdown, ...styles.dropdownSimple }}
						/>
					)}
				</Popper>
			)}
		</View>
	);
};

HeaderMenuItem.defaultProps = {
	items: [],
};

HeaderMenuItem.displayName = 'HeaderMenuItem';
