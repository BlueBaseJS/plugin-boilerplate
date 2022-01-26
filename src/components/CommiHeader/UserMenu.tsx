import { Avatar, AvatarProps, Button, Divider, Icon, List, View } from '@bluebase/components';
import { Placeholder, PlaceholderMedia } from '../../imports';
import React, { useState } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useNavigation, useStyles } from '@bluebase/core';

import { Popper } from './lib';
import { or } from '../../helpers';

export interface UserMenuStyles {
	root: ViewStyle;
	rootHover: ViewStyle;
	dropdown: ViewStyle;
	icon: TextStyle;
}

const defaultStyles = (theme: Theme): UserMenuStyles => ({
	root: {
		borderRadius: 32,
		padding: theme.spacing.unit / 2,
	},

	rootHover: {
		backgroundColor: 'rgba(0,0,0,.1)',
	},

	dropdown: {
		backgroundColor: theme.palette.background.card,
		borderBottomEndRadius: theme.shape.borderRadius,
		borderBottomStartRadius: theme.shape.borderRadius,
		...theme.elevation(2),
	},

	icon: {
		color: theme.palette.text.secondary,
		marginRight: theme.spacing.unit,
	},
});

export interface UserMenuProps {
	loggedIn: boolean;

	loading?: boolean;

	name?: string;
	email?: string;
	avatar?: string;

	styles?: Partial<UserMenuStyles>;
	style?: ViewStyle;
}

export const UserMenu = (props: UserMenuProps) => {
	const { avatar, email, name, loggedIn, loading, style } = props;
	const styles = useStyles('UserMenu', props, defaultStyles);
	const { navigate } = useNavigation();

	if (loading) {
		return (
			<View style={[styles.root, style]}>
				<Placeholder>
					<PlaceholderMedia style={[{ height: 32, width: 32 }]} isRound />
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

	const open = isHovering;
	const id = open ? 'menu-item-dropdown' : undefined;

	const goTo = (routeName: string) => () => navigate(routeName);

	if (!loggedIn) {
		return (
			<View style={[styles.root, style]}>
				<Button title="Login" onPress={goTo('Login')} />
			</View>
		);
	}

	const avatarProps: AvatarProps = avatar
		? { type: 'image', image: { uri: avatar } }
		: { type: 'icon', icon: 'account' };

	return (
		<View
			style={[styles.root, style, isHovering && styles.rootHover]}
			{...({ onMouseEnter: onMouseEnterLeave, onMouseLeave: onMouseEnterLeave } as any)}
			testID="user-avatar-root"
		>
			<Avatar {...avatarProps} size={32} />

			<Popper id={id} open={open} anchorEl={anchorEl}>
				<View style={styles.dropdown} testID="user-avatar-dropdown">
					<List.Item title={name} description={email} left={<List.Avatar {...avatarProps} />} />
					<Divider />
					<List.Item
						title="Orders"
						left={<Icon name="shopping" style={styles.icon} />}
						onPress={goTo('Orders')}
					/>
					<List.Item
						title="Wishlist"
						left={<Icon name="heart" style={styles.icon} />}
						onPress={goTo('Wishlist')}
					/>
					<List.Item
						title="Settings"
						left={<Icon name="settings" style={styles.icon} />}
						onPress={goTo('Settings')}
					/>
					<Divider />
					<List.Item
						title="Logout"
						left={<Icon name="logout" style={styles.icon} />}
						onPress={goTo('Logout')}
					/>
				</View>
			</Popper>
		</View>
	);
};

UserMenu.defaultProps = {
	loading: false,
	loggedIn: false,
	name: 'Unknown',
};

UserMenu.displayName = 'UserMenu';
