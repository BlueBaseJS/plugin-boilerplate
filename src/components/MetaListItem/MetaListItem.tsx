import { Body1, View } from '@bluebase/components';
import { Placeholder, PlaceholderBody1 } from '../imports';
import { TextStyle, ViewStyle } from 'react-native';

import React from 'react';
import { Theme } from '@bluebase/core';

export interface MetaListItemStyles {
	root: ViewStyle;
	divider: ViewStyle;
	title: TextStyle;
	description: TextStyle;
}

export interface MetaListItemProps {
	title: React.ReactNode;
	description: React.ReactNode;
	divider?: boolean;
	loading?: boolean;
	styles?: Partial<MetaListItemStyles>;
	style?: ViewStyle;
}

/**
 * A simple list component to display meta data.
 */
export const MetaListItem = ({
	title,
	description,
	divider,
	loading,
	style,
	styles = {},
}: MetaListItemProps) => {
	if (loading) {
		return (
			<Placeholder>
				<View testID="view_id" style={[styles.root, divider && styles.divider, style]}>
					<PlaceholderBody1 width={30} />
					<PlaceholderBody1 width={25} />
				</View>
			</Placeholder>
		);
	}

	return (
		<View testID="view_id" style={[styles.root, divider && styles.divider, style]}>
			<Body1 testID="title_id" style={styles.title}>
				{title}
			</Body1>

			<Body1 testID="description_id" style={styles.description}>
				{description}
			</Body1>
		</View>
	);
};

MetaListItem.defaultStyles = (theme: Theme): MetaListItemStyles => ({
	root: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: theme.spacing.unit * 2,
	},

	divider: {
		borderBottomColor: theme.palette.divider,
		borderBottomWidth: 1,
	},

	title: {
		paddingRight: theme.spacing.unit,
	},

	description: {
		color: theme.palette.text.disabled,
	},
});
