import { IconButton, Text, View } from '@bluebase/components';
import { Placeholder, PlaceholderMedia } from '../../imports';
import React, { useCallback } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useNavigation, useStyles } from '@bluebase/core';

export interface CartButtonStyles {
	root: ViewStyle;
	icon: TextStyle;
	badge: ViewStyle;
	badgeText: TextStyle;
}

const defaultStyles = (theme: Theme): CartButtonStyles => ({
	root: {},

	icon: {
		color: theme.palette.text.secondary,
		padding: theme.spacing.unit,
	},

	badge: {
		backgroundColor: theme.palette.error.main,
		borderRadius: theme.spacing.unit * 2,
		minWidth: 18,

		right: -8,
		top: 0,

		paddingHorizontal: theme.spacing.unit / 2,
		paddingVertical: theme.spacing.unit / 4,

		position: 'absolute',
	},

	badgeText: {
		...theme.typography.overline,
		color: '#fff',
		textAlign: 'center',
	},
});

export interface CartButtonProps {
	count: number;
	loading?: boolean;
	styles?: Partial<CartButtonStyles>;
	style?: ViewStyle;
}

export const CartButton = (props: CartButtonProps) => {
	const { count, loading, style } = props;

	const { navigate } = useNavigation();
	const styles = useStyles('CartButton', props, defaultStyles);

	const goToCart = useCallback(() => navigate('Cart'), [navigate]);

	if (loading) {
		return (
			<View style={[styles.root, style]}>
				<Placeholder>
					<PlaceholderMedia style={[{ height: 32, width: 32 }]} isRound />
				</Placeholder>
			</View>
		);
	}

	return (
		<View style={[styles.root, style]}>
			<IconButton name="cart" color={styles.icon.color as string} onPress={goToCart} style={styles.icon} />

			{count > 0 && (
				<View style={styles.badge} testID="cart-button-badge">
					<Text style={styles.badgeText}>{count < 100 ? count : '99+'}</Text>
				</View>
			)}
		</View>
	);
};

CartButton.defaultProps = {
	count: 0,
	loading: false,
};

CartButton.displayName = 'CartButton';
