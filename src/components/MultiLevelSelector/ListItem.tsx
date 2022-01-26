import { Body2, Icon, List, ListItemProps, View } from '@bluebase/components';
import { Placeholder, PlaceholderListItem } from '../../imports';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, applyStyles } from '@bluebase/core';

import { MultiLevelSelectorItem } from './MultiLevelSelector';
import React from 'react';

export interface MultiLevelSelectorListItemStyles {
	root: ViewStyle;
	right: ViewStyle;
	rightText: TextStyle;
}

export interface MultiLevelSelectorListItemProps extends MultiLevelSelectorItem {
	loading?: boolean;
	onPress?: ListItemProps['onPress'];
	style?: ViewStyle;
	styles?: Partial<MultiLevelSelectorListItemStyles>;
}

export const MultiLevelSelectorListItemComponent = (props: MultiLevelSelectorListItemProps) => {
	const {
		count,
		id,
		title,
		disabled,
		onPress,
		description,
		icon,
		hasChildren,
		loading,
		style,
		styles,
	} = props;

	if (loading === true) {
		return (
			<Placeholder>
				<PlaceholderListItem avatar={false} description={false} />
			</Placeholder>
		);
	}

	return (
		<List.Item
			title={title}
			description={description}
			key={id}
			disabled={disabled}
			onPress={onPress}
			style={{ ...styles!.root, style }}
			left={icon && <List.Avatar {...icon} />}
			right={
				<View style={styles!.right}>
					{count && <Body2 style={styles!.rightText}>{count}</Body2>}
					{hasChildren && <Icon name="chevron-right" style={styles!.rightText} />}
				</View>
			}
		/>
	);
};

const defaultProps: Partial<MultiLevelSelectorListItemProps> = {};

const defaultStyles = (theme: Theme): MultiLevelSelectorListItemStyles => ({
	root: {},

	right: {
		alignItems: 'center',
		flexDirection: 'row',
	},

	rightText: {
		color: theme.palette.text.secondary,
	},
});

MultiLevelSelectorListItemComponent.defaultProps = defaultProps;
MultiLevelSelectorListItemComponent.defaultStyles = defaultStyles;

export const MultiLevelSelectorListItem: React.ComponentType<MultiLevelSelectorListItemProps> = applyStyles(
	{ name: 'MultiLevelSelectorListItem' }
)(MultiLevelSelectorListItemComponent as any);
