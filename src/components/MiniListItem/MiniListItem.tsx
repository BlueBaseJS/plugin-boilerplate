import { Body2, Icon, Link, LinkProps, View } from '@bluebase/components';
import { Placeholder, PlaceholderBody2, PlaceholderMedia } from '../../imports';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, useStyles } from '@bluebase/core';

import React from 'react';

export interface MiniListItemStyles {
	root: ViewStyle;
	icon: ViewStyle;
	iconText: TextStyle;
	title: ViewStyle;
	titleText: TextStyle;
	action: ViewStyle;
	actionText: TextStyle;
}

export interface MiniListItemProps {
	icon?: string;
	title?: string;
	action?: string;
	actionLinkProps?: LinkProps;
	loading?: boolean;
	style?: ViewStyle;
	styles?: Partial<MiniListItemStyles>;
}

const defaultStyles = (theme: Theme): MiniListItemStyles => ({
	root: {
		flexDirection: 'row',
		paddingVertical: theme.spacing.unit / 2,
	},

	icon: {
		paddingRight: theme.spacing.unit,
	},

	iconText: {
		color: theme.palette.text.secondary,
	},

	title: {},

	titleText: {},

	action: {
		paddingHorizontal: theme.spacing.unit,
	},

	actionText: {
		color: theme.palette.primary.main,
		fontWeight: 'bold',
	},
});

export const MiniListItem = (props: MiniListItemProps) => {
	const { icon, title, action, actionLinkProps, loading, style } = props;
	const styles = useStyles('MiniListItem', props, defaultStyles);

	if (loading) {
		return (
			<Placeholder>
				<View style={[styles.root, style]} testID="specification-item-root">
					<View style={styles.icon} testID="specification-item-icon-container">
						<PlaceholderMedia size={16} />
					</View>
					<View
						style={[styles.title, { width: '25%' }]}
						testID="specification-item-title-container"
					>
						<PlaceholderBody2 width={100} />
					</View>
				</View>
			</Placeholder>
		);
	}

	return (
		<View style={[styles.root, style]} testID="specification-item-root">
			<View style={styles.icon} testID="specification-item-icon-container">
				<Icon style={styles.iconText} name={icon} size={16} />
			</View>
			<View style={styles.title} testID="specification-item-title-container">
				<Body2 style={styles.titleText} testID="specification-item-title">
					{title}
				</Body2>
			</View>
			<View style={styles.action} testID="specification-item-action-container">
				<Link {...actionLinkProps}>
					<Body2 style={styles.actionText} testID="specification-item-action">
						{action}
					</Body2>
				</Link>
			</View>
		</View>
	);
};

MiniListItem.defaultProps = {
	icon: 'circle-medium',
	loading: false,
};

MiniListItem.displayName = 'MiniListItem';
